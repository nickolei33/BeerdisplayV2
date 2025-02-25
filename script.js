document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "https://nico-c.info/api/beers";
  const menuBoard = document.getElementById("menu-board");
  let lastFetchTime = 0;
  let beersData = [];

  // Fonction pour déterminer le nombre de colonnes optimal
  const getOptimalColumnCount = (beerCount) => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1400 || beerCount > 40) return 4;
    if (screenWidth >= 992 || beerCount > 24) return 3;
    return 2;
  };

  // Fonction pour créer les colonnes
  const createColumns = (columnCount) => {
    menuBoard.innerHTML = "";

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement("div");
      column.classList.add("beer-column");
      column.id = `column-${i}`;
      menuBoard.appendChild(column);
    }
  };

  // Fonction pour distribuer les bières dans les colonnes
  const distributeBeers = (beers, columnCount) => {
    const columns = Array.from({ length: columnCount }, (_, i) =>
      document.getElementById(`column-${i}`)
    );

    // Vider les colonnes
    columns.forEach((column) => (column.innerHTML = ""));

    // Ajouter les classes selon le nombre de bières
    if (beers.length <= 15) {
      menuBoard.classList.add("few-items");
      menuBoard.classList.remove("many-items");
    } else if (beers.length >= 35) {
      menuBoard.classList.add("many-items");
      menuBoard.classList.remove("few-items");
    } else {
      menuBoard.classList.remove("few-items", "many-items");
    }

    // Distribuer les bières dans les colonnes
    const itemsPerColumn = Math.ceil(beers.length / columnCount);

    beers.forEach((beer, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn);
      const column = columns[columnIndex];

      const beerEntry = createBeerEntry(beer);
      column.appendChild(beerEntry);
    });
  };

  // Fonction pour créer l'entrée d'une bière
  const createBeerEntry = (beer) => {
    const beerEntry = document.createElement("div");
    beerEntry.classList.add("beer-entry");

    const domain = "https://nico-c.info";
    const breweryLogoUrl = `${domain}${beer.brewery.logo_url}`;

    beerEntry.innerHTML = `
      <div class="brewery-logo-container">
        <img src="${breweryLogoUrl}" alt="Logo de ${beer.brewery.name}">
      </div>
      <div class="beer-details">
        <div class="beer-name">
          ${beer.name}
        </div>
        <div class="brewery-name">${beer.brewery.name}</div>
        <div class="beer-type-info">${beer.type || "Bière spéciale"} | ${
      beer.alcohol_percentage || "N/A"
    }%</div>
      </div>
      <div class="beer-price-info">
        <div class="price-tag">🍷 ${beer.price_12_5cl}€</div>
        <div class="price-tag">🍺 ${beer.price_25cl}€</div>
      </div>
    `;

    return beerEntry;
  };

  // Fonction pour récupérer les bières
  const fetchBeers = async (force = false) => {
    const now = Date.now();
    // Ne rafraîchir que toutes les 30 secondes, sauf si forcé
    if (!force && now - lastFetchTime < 30000) return;

    try {
      const response = await fetch(apiURL);
      const beers = await response.json();
      lastFetchTime = now;

      // Traiter uniquement les bières disponibles
      const availableBeers = beers.filter((beer) => beer.availability === "1");
      beersData = availableBeers;

      // Déterminer le nombre optimal de colonnes
      const columnCount = getOptimalColumnCount(availableBeers.length);

      // Créer les colonnes
      createColumns(columnCount);

      // Distribuer les bières
      distributeBeers(availableBeers, columnCount);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);

      // Afficher un message d'erreur
      if (menuBoard.innerHTML === "") {
        menuBoard.innerHTML = `
          <div style="color: #F9D780; text-align: center; width: 100%; padding: 20px;">
            <h2>Impossible de charger les bières</h2>
            <p>Veuillez vérifier votre connexion ou contacter l'organisateur.</p>
            <button style="margin-top: 20px; padding: 10px 20px; background: #5A3C1E; color: #F9D780; border: none; cursor: pointer;" onclick="window.location.reload()">Réessayer</button>
          </div>
        `;
      }
    }
  };

  // Gérer le redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    if (beersData.length > 0) {
      const columnCount = getOptimalColumnCount(beersData.length);
      createColumns(columnCount);
      distributeBeers(beersData, columnCount);
    }
  });

  // Charger les bières initialement
  fetchBeers(true);

  // Rafraîchir les données toutes les 30 secondes
  setInterval(() => fetchBeers(), 30000);
});
