const cards = document.querySelectorAll(".mushroom-guide .card");

const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const noResultsMessage = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

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

  if (!document.startViewTransition()) {
    filterCards();
    return;
  }

  document.startViewTransition(filterCards);
}

function filterCards() {
  let hasVisibleCards = false;

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
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }

    if (hasVisibleCards) {
      noResultsMessage.hidden = true;
    } else {
      noResultsMessage.hidden = false;
    }
  });
}

function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();
