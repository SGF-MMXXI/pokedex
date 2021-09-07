let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Venusaur",
      type: ["grass", "poison"],
      height: 6.7,
    },

    { name: "Charizard", type: "fire", height: 5.7 },

    { name: "Blastoise", type: " water", height: 5.3 },

    { name: "Butterfree", type: ["bug", "flying"], height: 3.7 },

    { name: "Beedrill", type: ["bug", "poison"], height: 3.3 },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function removeLast() {
    pokemonList.pop();
  }

  return {
    add: add,
    getAll: getAll,
    removeLast: removeLast,
    addListItem: addListItem,
  };
})();

//Functions for Pokedex Buttons
function addListItem(pokemon) {
  let list = document.querySelector(".pkList");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("pkButton");
  listItem.appendChild(button);
  list.appendChild(listItem);
  button.addEventListener("click", function (event) {
    showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  console.log(pokemon);
}

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
