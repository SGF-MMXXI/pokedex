let pokemonRepository = (function () {
    //Pokemon List
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  
    
    function getAll() {
    return pokemonList;
    }
    
   //add pokemon
   function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Incorrect Pokemon entry.');
    }
  }
   

//Functions for Pokedex Buttons
function addListItem(pokemon) {
    
//Selecting pkList class
    let list = document.querySelector('.pkList');
    
//Creating List
    let listItem = document.createElement('li');
     listItem.classList.add('group-list-item');
    
//Creating Button
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pkButton', 'btn', 'btn-primary');
    
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    
    
//Append Button & List
    listItem.appendChild(button);
    list.appendChild(listItem);
    
    //Adding Click Event 
    
    button.addEventListener('click', function () {
    showDetails(pokemon);
    });
 
}
// Loading Image Function
    function showLoadingImage() {
        let loading = document.querySelector('#loading');
        window.addEventListener('load',function(){
            loading.style.visibility = 'visible';
        });
    }

//Hide Loading Image
    function hideLoadingImage() {
        let loading = document.querySelector('#loading');
        setTimeout(function(){
            loading.style.visibility = 'hidden';
        }, 100);
    }
    
//Fetching Pokemon From The API
    function loadList() {
        showLoadingImage();
        return fetch(apiUrl).then(function (response){
            return response.json();
            }).then(function (json) {
            hideLoadingImage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                    height: item.height,
                };
                add(pokemon);
            });
        })
   }

//Loading Details of Pokemon From API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
        return response.json();
        }).then(function (details) {
            
// Added Details
            item.imageUrl = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })

  }
    
//Pokemon Details
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            showModal(pokemon);
    });
  }
    
    function showModal(pokemon) {   
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');    
        
        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr('src', pokemon.imageUrl);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr('src', pokemon.imageUrlBack);
        let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
        let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
        let typesElement = $('<p>' + 'Types : ' + pokemon.types.join(', ') + '</p>');
        let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities.join(', ') + '</p>');

// display all details of the pokemon inside the modal
        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
  }

    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingImage: showLoadingImage,
    hideLoadingImage: hideLoadingImage,
    showModal: showModal,
  };
})();

    pokemonRepository.loadList().then(function() {
        
//displays pokemon in respository on DOM
        pokemonRepository.getAll().forEach(function(pokemon) {
            pokemonRepository.addListItem(pokemon)
});
});