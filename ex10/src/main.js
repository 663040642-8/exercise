const pokedex = document.getElementById("pokedex");

let offset = 0;
const limit = 151;

async function loadPokemonList(offset, limit) {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();

  const pokemonList = data.results;

  for (const pokemon of pokemonList) {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    createPokemonCard(data);
  }
}

function createPokemonCard(pokemon) {
  const primaryType = pokemon.types[0].type.name;
  let cardColor;

  switch (primaryType) {
    case 'normal':
      cardColor = 'rgb(170, 170, 153)';
      break;
    case 'fire':
      cardColor = 'rgb(255, 68, 34)';
      break;
    case 'water':
      cardColor = 'rgb(51, 153, 255)';
      break;
    case 'grass':
      cardColor = 'rgb(119, 204, 85)';
      break;
    case 'electric':
      cardColor = 'rgb(255, 204, 51)';
      break;
    case 'ice':
      cardColor = 'rgb(102, 204, 255)';
      break;
    case 'fighting':
      cardColor = ' rgb(187, 85, 68)';
      break;
    case 'poison':
      cardColor = 'rgb(170, 85, 153)';
      break;
    case 'ground':
      cardColor = ' rgb(221, 187, 85)';
      break;
    case 'flying':
      cardColor = 'rgb(136, 153, 255)';
      break;
    case 'psychic':
      cardColor = ' rgb(255, 85, 153)';
      break;
    case 'bug':
      cardColor = ' rgb(170, 187, 34)';
      break;
    case 'rock':
      cardColor = 'rgb(187, 170, 102)';
      break;
    case 'ghost':
      cardColor = ' rgb(102, 102, 187)';
      break;
    case 'dragon':
      cardColor = 'rgb(119, 102, 238)';
      break;
    case 'dark':
      cardColor = ' rgb(119, 85, 68)';
      break;
    case 'steel':
      cardColor = ' rgb(170, 170, 187)';
      break;
    case 'fairy':
      cardColor = ' rgb(238, 153, 238)';
      break;
    default:
      cardColor = '#e5e7eb';
  }

  const card = document.createElement("div");
  card.style.backgroundColor = cardColor;
  card.className = "card shadow-2xl rounded-4xl p-6";
  card.innerHTML = `
    <div class="card-info flex justify-between gap-2">
      <div>
        <h2 class="card-id text-4xl opacity-40 text-white">#${pokemon.id}</h2>
        <h3 class="card-name text-3xl text-white font-extrabold capitalize">${pokemon.name}</h3>
        <div class="card-type">
          <span class="primary-type my-2.5 px-2 rounded-full table bg-[hsla(0,0%,100%,.2)] text-base text-white font-bold capitalize">${pokemon.types[0]?.type.name}</span>
          <span class="secondary-type px-2 rounded-full table bg-[hsla(0,0%,100%,.2)] text-base text-white font-bold capitalize">${pokemon.types[1] ? `${pokemon.types[1].type.name}` : ""}</span>
        </div>
      </div>
      <div class="flex justify-end items-center max-w-1/2">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-image drop-shadow-xl max-w-full max-h-full">
      </div>
    </div>
  `;

  pokedex.appendChild(card);
}

const genRanges = {
  1: { offset: 0, limit: 151 },
  2: { offset: 151, limit: 100 },
  3: { offset: 251, limit: 135 },
  4: { offset: 386, limit: 107 },
  5: { offset: 493, limit: 156 },
  6: { offset: 649, limit: 72 },
  7: { offset: 721, limit: 88 },
  8: { offset: 809, limit: 96 },
  9: { offset: 905, limit: 120 },
};

const genSelect = document.querySelector("select");

genSelect.addEventListener("change", async (e) => {
  const selectedGen = e.target.value;
  const { offset: newOffset, limit: newLimit } = genRanges[selectedGen];

  pokedex.innerHTML = "";

  loadPokemonList(newOffset, newLimit);
});

loadPokemonList(offset, limit);
