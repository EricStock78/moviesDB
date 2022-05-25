import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



  //load the json data
  /*fetch("./movies.json")
  .then( response => response.json() ) 
  .then( setMovies )
  .then( console.log(movies))
  .catch( e => console.log(e.message) );
*/
console.log("Here !!");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);


