import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { MovieList } from './Movies';


var movies = null;

function App({secret: sc}) {
  
  const [movies, setMovies] = useState(null);
  //let movies = {};

  useEffect( () => {
    const fetchData = async () => {
      await fetch("/login",{
        method:'post',
        credentials: 'include'
      });
      const result = await fetch("/api/data");
      const body = await result.json();
      setMovies(body);
    }
    fetchData();
  }, []);


/*
    fetch("/api/data")
    .then( response => response.json() ) 
    .then( setMovies )
    .then( console.log(movies))
    .catch( e => console.log(e.message) );
  }, [])*/


  
  /*useEffect( () => {
    //load the json data
    fetch("/api/data")
    .then( response => response.json() ) 
    .then( setMovies )
    .then( console.log(movies))
    .catch( e => console.log(e.message) );
  }, [])*/

  return (
    <>
      <MovieList movies={movies} setMovies={setMovies}/>
    </>
  )
}

export default App;
