let pokemonRepository = (function () {
    //Pokemon List
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  
    
   //add pokemon
  function add(pokemon) {
     if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
  }
    function getAll() {
    return pokemonList;
  }

//Functions for Pokedex Buttons
function addListItem(pokemon) {
    
//Selecting pkList class
    let list = document.querySelector(".pkList");
    
//Creating List
    let listItem = document.createElement("li");
    
//Creating Button
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pkButton");
    
//Adding Click Event 
    
    button.addEventListener("click", function (event) {
    showDetails(pokemon);
    });
    
//Append Button & List
    listItem.appendChild(button);
    list.appendChild(listItem);
 
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
        }).catch(function (e) {
            hideLoadingImage();
            console.error(e);
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
            item.height = details.height;
            item.weight = details.weight;
            item.type = details.types;
        }).catch(function (e) {
      console.error(e);
    });
  }
    
//Pokemon Details
    function showDetails(pokemon){
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }
    
    let modalContainer = document.querySelector('#modal-container');

//Modal Functions
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        //clear all existing modal content
        modalContainer.innerHTML = '';

        //creating the modal
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //close modal when 'Close' button is clicked
        closeButtonElement.addEventListener('click', hideModal);

        //assigned for Modal title
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        //assigned for Modal text
        let contentElement = document.createElement('p');
        let weight = pokemon.weight;
        let pokeHeight = pokemon.height / 10; //meters
        let pokeTypes = [];
        Object.keys(pokemon.type).forEach(key => {
            
        pokeTypes.push(pokemon.type[key].type.name); //add pokemon type to pokeTypes
        });

        contentElement.innerText = 'Height: ' + pokeHeight + ' meters' + '\r\n' + 'Type: ' + pokeTypes +  '\r\n' + 'Weight:' + weight + '  meters' ;
        
        let PokeWeight =  pokemon.weight ;

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.setAttribute('alt','Front view of' + pokemon.name);
        
        

        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        //showing the modal
        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;

    //hiding modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    //hiding modal when 'Esc' button is pressed down
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList. contains('is-visible')) {
            hideModal();
        } 
    });

    //hiding modal when modal container is clicked
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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
    hideModal:hideModal 
  };
})();

pokemonRepository.loadList().then(function() {
//displays pokemon in respository on DOM
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon)
});
});