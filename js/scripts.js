//Heres the IIFE with my pokemonList array inside of it along with the add and get all functions.

let pokemonRepository = (function(){


let pokemonList = [{
        name: 'Bulbasaur',
        type:['grass', 'poison'],
        height:2.4},
    
        {name: 'Charmander',
        type: 'fire',
        height:2},             
    
        {name: 'Squirtle', 
         type:' water',
         height:1.8}
                  ];
    
     function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll() );

//A loop for the above array. This code displays the name and height of each pokemon listed along with a special message for the tallest


pokemonRepository.getAll().forEach(function (pokemon){
         if (pokemon.height > 2) {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + ' This one\'s quite large! </p>'  );
    } else {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')</p>');            
                    } });
