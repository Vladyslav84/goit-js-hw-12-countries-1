import './styles.css';
import templateCountry from './templates/templateCountry.hbs';
import _debounce from '../node_modules/lodash.debounce';
import axios from '../node_modules/axios';
import manyContries from './templates/manyContries.hbs'

const carditem = document.querySelector('.carditem');
const input = document.querySelector('.input');

input.addEventListener('input', _debounce(() => {
    let searhContry = input.value;
    getCountry(searhContry);

}, 500));

function getCountry(countryName) {
         return axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      
        .then(function (response) {

         const objCountry = response.data[0];

        if (response.data.length === 1)
        {
         const renderPage = templateCountry(objCountry);
          createMarkUp(renderPage);
          resetCountreName();

        } else if (response.data.length > 1 && response.data.length <= 10) {
            
          const renderPage1 = manyContries(response.data);

          createMarkUp(renderPage1);

       } else if (response.data.length > 11){

        return alert('Too many matches found. Please enter a more specific query!')

        }

        }).catch(error => {
            console.log(error);
            resetRenderPage();
        })
};

const resetCountreName = () => {

    input.value = '';
};

const resetRenderPage = () => {

    if (!input.value)

        carditem.innerHTML = '';
};


function createMarkUp(markUpGrid) {

    carditem.innerHTML = markUpGrid;
};
