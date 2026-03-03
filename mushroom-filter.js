const cards = document.querySelectorAll(".mushroom-guide .card");

const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const currentFilters = {
  season: "all",
  edible: "all",
};

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(event) {
  const filterElementName = event.target.getAttribute("name");
  if (!filterElementName) {
    throw new Error(`No DOM element named "${filterElementName}"`);
  }
  if (!(filterElementName in currentFilters)) {
    throw new Error(`No such a filter: "${filterElementName}"`);
  }
  currentFilters[filterElementName] = event.target.value;

  filterCards();
}

function filterCards() {
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season == season;
    const matchesEdible = currentFilters.edible == edible;

    if (
      (matchesEdible || currentFilters.edible == "all") &&
      (matchesSeason || currentFilters.season == "all")
    ) {
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });
}
