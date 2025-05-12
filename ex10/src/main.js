const pokedex = document.getElementById("pokedex");
const pagination = document.getElementById("pagination");
const genSelect = document.getElementById("genSelect");
const perPageSelect = document.getElementById("perPageSelect");

let currentPage = 1;
let currentGen = 1;
let perPage = parseInt(perPageSelect.value); // default: 20

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

async function loadPokemonList(gen, page, perPage) {
  const { offset, limit } = genRanges[gen];
  const start = offset + (page - 1) * perPage;
  const end = Math.min(start + perPage, offset + limit);
  const actualLimit = end - start;

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${actualLimit}`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemonList = data.results;

  const pokemonDataList = await Promise.all(
    pokemonList.map(pokemon => fetch(pokemon.url).then(res => res.json()))
  );

  pokedex.innerHTML = "";
  pokemonDataList.forEach(createPokemonCard);

  renderPagination(gen, page, perPage);
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
  card.className = "card shadow-2xl rounded-4xl p-6 cursor-pointer";
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
  card.addEventListener("click", () => showModal(pokemon));

  pokedex.appendChild(card);
}

function renderPagination(gen, page, perPage) {
  const { limit } = genRanges[gen];
  const totalPages = Math.ceil(limit / perPage);

  pagination.innerHTML = `
    <button ${page === 1 ? "disabled" : ""} id="prevPage" class="px-4 py-2 mx-1 bg-gray-300 rounded-lg cursor-pointer">Prev</button>
    <span class="mx-2 font-bold">Page ${page} / ${totalPages}</span>
    <button ${page === totalPages ? "disabled" : ""} id="nextPage" class="px-4 py-2 mx-1 bg-gray-300 rounded-lg cursor-pointer">Next</button>
  `;

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadPokemonList(currentGen, currentPage, perPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(genRanges[currentGen].limit / perPage);
    if (currentPage < totalPages) {
      currentPage++;
      loadPokemonList(currentGen, currentPage, perPage);
    }
  });
}

// Event: Change Gen
genSelect.addEventListener("change", (e) => {
  currentGen = parseInt(e.target.value);
  currentPage = 1;
  loadPokemonList(currentGen, currentPage, perPage);
});

// Event: Change Per Page
perPageSelect.addEventListener("change", (e) => {
  perPage = parseInt(e.target.value);
  currentPage = 1;
  loadPokemonList(currentGen, currentPage, perPage);
});

// Initial Load
loadPokemonList(currentGen, currentPage, perPage);

const modal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementById("closeModal");

function showModal(pokemon) {
  modalContent.innerHTML = `
    <p>#${pokemon.id}</p>
    <h2 class="text-2xl font-bold capitalize mb-2">${pokemon.name}</h2>
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="mx-auto w-40 mb-4">
    
        <!-- Tabs Section -->
    <div class="tabs flex gap-4 border-b">
      <button id="tab-abilities" class="tab-button px-4 py-2 border-b-2">About</button>
      <button id="tab-stats" class="tab-button px-4 py-2">Base Stats</button>
    </div>

        <!-- Tab Contents -->
    <div class="tab-content mt-4">
      <!-- About Tab -->
      <div id="about-content" class="tab-pane active text-left grid-cols-2 grid">
        <p class="capitalize"><strong>Type</strong></p>
        <p class="capitalize">${pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Height</strong></p>
        <p>${pokemon.height / 10} m</p>
        <p><strong>Weight</strong></p>
        <p>${pokemon.weight / 10} kg</p>
        <p class="capitalize"><strong>Abilities:</strong></p>
        <p class="capitalize">${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
      </div>

      <!-- Stats Tab -->
      <div id="stats-content" class="tab-pane hidden">
        <div class="stats-bar-container space-y-2">
          ${pokemon.stats.map(stat => `
            <div class="grid grid-cols-2">
              <span class="text-left w-64 text-sm font-semibold capitalize">${stat.stat.name}</span>
              <div class="grid grid-cols-2">
                <span class="text-sm text-left">${stat.base_stat}</span>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mx-auto">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${(stat.base_stat / 255) * 100}%"></div>
                </div>
              </div>
            </div>
              `).join("")}
            <span class="text-left w-64 text-sm font-semibold capitalize">Total: ${pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</span>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mx-auto">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${(pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0) / 1530) * 100}%"></div>
            </div>
        </div>
      </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // จัดการการคลิก Tab เพื่อสลับเนื้อหา
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // ซ่อนทุกๆ tab
      tabPanes.forEach(pane => pane.classList.add("hidden"));

      // แสดง tab ที่ถูกคลิก
      tabPanes[index].classList.remove("hidden");

      // เปลี่ยนสไตล์ของ tab ที่ถูกคลิก
      tabButtons.forEach(btn => btn.classList.remove("border-b-2", "border-gray-600"));
      button.classList.add("border-b-2", "border-gray-600");
    });
  });
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});