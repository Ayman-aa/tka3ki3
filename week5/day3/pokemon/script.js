const pokemonImage = document.querySelector('.pokemon-image');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonHeight = document.querySelector('.pokemon-height');
const pokemonWeight = document.querySelector('.pokemon-weight');
const typesList = document.querySelector('.types-list');
const greenButton = document.querySelector('.green-button');
const dPadLeft = document.querySelector('.d-pad-left');
const dPadRight = document.querySelector('.d-pad-right');
const loadingContainer = document.querySelector('.loading-container');
const errorMessage = document.querySelector('.error-message');
const infoDisplay = document.querySelector('.info-display');
const indicatorLight = document.querySelector('.indicator-light');


let currentPokemonId = null;
const MAX_POKEMON = 898; 


const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
const errorSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
const successSound = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');


function showLoading() {
    loadingContainer.style.display = 'flex';
    errorMessage.style.display = 'none';
    indicatorLight.style.backgroundColor = '#f39c12';
    indicatorLight.style.boxShadow = '0 0 10px #f39c12';
}


function hideLoading() {
    loadingContainer.style.display = 'none';
    indicatorLight.style.backgroundColor = '#2ecc71';
    indicatorLight.style.boxShadow = '0 0 5px #2ecc71';
}


function showError() {
    errorMessage.style.display = 'block';
    hideLoading();
    indicatorLight.style.backgroundColor = '#e74c3c';
    indicatorLight.style.boxShadow = '0 0 10px #e74c3c';
    
    errorSound.play();
    
    infoDisplay.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        infoDisplay.style.animation = '';
    }, 500);
}

function clearPokemonInfo() {
    pokemonImage.src = '';
    pokemonName.textContent = '???';
    pokemonId.textContent = 'Pokémon n° ???';
    pokemonHeight.textContent = 'Height: ???';
    pokemonWeight.textContent = 'Weight: ???';
    typesList.innerHTML = '???';
}


function formatPokemonId(id) {
    return `Pokémon n° ${id.toString().padStart(3, '0')}`;
}


function addButtonPressEffect(button) {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
        clickSound.play();
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = '';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
}


function displayPokemonData(pokemon) {
    currentPokemonId = pokemon.id;

    pokemonImage.style.opacity = '0';
    setTimeout(() => {
        pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default || 
                          pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;
        pokemonImage.style.opacity = '1';
    }, 200);

    setTimeout(() => {
        infoDisplay.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            infoDisplay.style.transform = '';
        }, 300);
        
        pokemonName.textContent = pokemon.name;
        pokemonId.textContent = formatPokemonId(pokemon.id);
        
        pokemonHeight.textContent = `Height: ${pokemon.height * 10}cm`;
        pokemonWeight.textContent = `Weight: ${pokemon.weight * 100}gr`;

        const types = pokemon.types.map(type => {
            return `<span class="type-badge ${type.type.name}">${type.type.name}</span>`;
        }).join('');
        
        typesList.innerHTML = types;

        successSound.play();
    }, 300);

    hideLoading();
}


async function fetchPokemonById(id) {
    showLoading();
    clearPokemonInfo();
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        
        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        showError();
    }
}


async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;
    await fetchPokemonById(randomId);
}


async function fetchPreviousPokemon() {
    if (currentPokemonId && currentPokemonId > 1) {
        await fetchPokemonById(currentPokemonId - 1);
    } else if (currentPokemonId === 1) {
        await fetchPokemonById(MAX_POKEMON);
    } else {
        await fetchRandomPokemon();
    }
}


async function fetchNextPokemon() {
    if (currentPokemonId && currentPokemonId < MAX_POKEMON) {
        await fetchPokemonById(currentPokemonId + 1);
    } else if (currentPokemonId === MAX_POKEMON) {
        await fetchPokemonById(1);
    } else {
        await fetchRandomPokemon();
    }
}


addButtonPressEffect(greenButton);
addButtonPressEffect(dPadLeft);
addButtonPressEffect(dPadRight);


greenButton.addEventListener('click', fetchRandomPokemon);
dPadLeft.addEventListener('click', fetchPreviousPokemon);
dPadRight.addEventListener('click', fetchNextPokemon);


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        dPadLeft.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
            dPadLeft.style.transform = 'translateY(-50%)';
            fetchPreviousPokemon();
        }, 100);
    } else if (e.key === 'ArrowRight') {
        dPadRight.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
            dPadRight.style.transform = 'translateY(-50%)';
            fetchNextPokemon();
        }, 100);
    } else if (e.key === ' ' || e.key === 'Enter') {
        greenButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            greenButton.style.transform = '';
            fetchRandomPokemon();
        }, 100);
    }
});


pokemonImage.addEventListener('mouseover', () => {
    pokemonImage.style.transform = 'scale(1.1) rotate(5deg)';
    pokemonImage.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5)) brightness(1.1)';
});

pokemonImage.addEventListener('mouseout', () => {
    pokemonImage.style.transform = '';
    pokemonImage.style.filter = 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))';
});


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        fetchRandomPokemon();
    }, 500);
});


setInterval(() => {
    const smallLights = document.querySelectorAll('.small-light');
    const randomLight = smallLights[Math.floor(Math.random() * smallLights.length)];
    
    randomLight.style.opacity = '0.5';
    setTimeout(() => {
        randomLight.style.opacity = '1';
    }, 200);
}, 2000);