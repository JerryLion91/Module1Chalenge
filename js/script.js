const globalNames = ['teste1', 'teste2'];
/**
 * Fazer o download da API de acordo com a URL e guardar em um array
 * filtrar com base no input, ativado pelo botao ou 'ENTER'
 * if tiver mais de um caracter
 * montar dois paineis
 * um com usuarios filtrados
 * segudno com estatisticas
 */


/**
 * When the page loads
 */
window.addEventListener('load', () => {
  preventFormSubmit();
  activateInput();
  // renderNames();
});

/**
 * Prevent the default refresh
 */
const preventFormSubmit = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => event.preventDefault());
}
/**
 * function to get the input from html
 */
const getInput = () => document.querySelector('#inputName');
const getButton = () => document.getElementById('searchButton')

const activateInput = () => {
  let inputName = getInput();
  let searchButton = getButton();
  inputName.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      return handleSearch
    }
  });
  searchButton.addEventListener('click', handleSearch);

  function handleSearch() {
    console.log('enter pressed');
  }
  clear();
}
function clear() {
  var inputName = getInput();
  inputName.value = '';
  inputName.focus();
  globalIsEditing = false;
}