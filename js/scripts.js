//Heres an array of objects listing pokemon and some attributes

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

//A loop for the above array. This code displays the name and height of each pokemon listed along with a special message for the tallest

for(var i = 0; i <pokemonList.length; i++){
    if (pokemonList[i].height > 2) {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' This one\'s quite large! </p>'  );
    } else {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');
  }
};
  
                  

   
    
