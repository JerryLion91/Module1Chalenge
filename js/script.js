const globalNames = ['teste1', 'teste2'];
/**
 * Fazer o download da API de acordo com a URL
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

const activateInput = () => {
  let inputName = getInput();
  inputName.addEventListener('keyup', () => {
    
  });
}