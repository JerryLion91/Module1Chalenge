/**
 * Global Variables
 */
let tabResults = null;
let tabStatistics = null;

let inputName = null;
let searchButton = null;
let resultsTitle = null;
let allNames = [];
/**
 * When the page loads
 */
window.addEventListener('load', () => {
  requestInformation();
  preventFormSubmit();
  activateInput();
});
/**
 * ( ) Aguarde input fica desabilitado
 * (x) Obter os dados da API
 * (x) Carregar os dados em um array 
 * (x) Permitir filtragem por meio do input com interacao do usuario
 * (x) Podera filrar se digitar apenas 1 caracter, ai habilita buscar
 * (x) Tanto 'ENTER' como o botao buscar devem ativar o filtro
 * ( ) Listar os nomes filtrados na direita: Foto, Nome e idade
 * ( ) Calcular algumas estatisticas
 * ( ) Mostrar qnt sexo masculino
 * ( ) Mostrar qnt sexo feminino
 * ( ) Soma das idades
 * ( ) Media das idades
 */
function requestInformation() {
  async function APIrequest(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    console.log(json);
    allNames = json.results.map(user => {
      const {gender, name, picture, dob} = user
      return {
        name: `${name.first} ${name.last}`, 
        gender,
        picture: picture.thumbnail,
        age: dob.age
      }
    });
    console.log(allNames);
  }
  APIrequest();
  inputName = document.querySelector('#inputName');
  tabResults = document.querySelector('#tabResults');
  tabStatistics = document.querySelector('#tabStatistics');
  resultsTitle = document.querySelector('#resultsTitle')
  searchButton = document.getElementById('searchButton');
}
/**
 * Prevent the default refresh
 */
function preventFormSubmit() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => event.preventDefault());
}

function activateInput() {
  inputName.addEventListener('keyup', (event) => {
    if (inputName.value === '') {
      searchButton.disabled = true;
      return
    } else {
      searchButton.disabled = false;
    }
    if (event.key === 'Enter') {
      return handleSearch;
    }
  });
  searchButton.addEventListener('click', handleSearch);
  clear();
}


function handleSearch() {
  resultsArr = allNames.filter(user => user.name.toLowerCase().includes(inputName.value.toLowerCase()));
  renderNames();
  renderSummary();
}


function clear() {
  inputName.value = '';
  inputName.focus();
  globalIsEditing = false;
  resultsTitle.textContent = 'Nenhum usuário filtrado';
}

function renderNames() {
  let msg;
  if (resultsArr.length === 1) {
    msg = `1 usuário encontrado`
  } else {
    msg = `${resultsArr.length} usuários encontrados`
  }
  resultsTitle.textContent = msg;
  let resultsHTML = '<div>';
  resultsArr.forEach(user => {
    const {name, picture, age} = user;
    const userHTML = `
    <div class='person'>
      <div>
        <img src="${picture}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${age} anos</li>
        </ul>
      </div>
    </div>
    `;
    resultsHTML += userHTML;
  });
  
  resultsHTML += '</div>';
  tabResults.innerHTML = resultsHTML;
}

function renderSummary() {
  let statistcsHTML = '<div>';
  const maleCount = resultsArr.filter(user => user.gender === 'male').length;
  const famaleCount = resultsArr.filter(user => user.gender === 'female').length;
  const agesSum = resultsArr.reduce((acc, cur) => {
    return acc + cur.age
  },0);
  const averageAge = agesSum/resultsArr.length;

  statistcsHTML += `
  Sexo Masculino: <b>${maleCount}</b> <br />
  Sexo Feminino: <b>${famaleCount}</b> <br />
  Soma das idades: <b>${agesSum}</b> <br />
  Media das idades: <b>${averageAge}</b> <br />
  `


  statistcsHTML += '</div>';
  tabStatistics.innerHTML = statistcsHTML;
}