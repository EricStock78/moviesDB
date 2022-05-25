import React from 'react';

export function MovieList( { movies = [], setMovies = f => f }) {
    if( movies == null || movies == undefined ) 
        return <h2>No movies available</h2>;
    
    return (
        <>
        <button onClick= { () => {
            const movieResult = movies.filter( movie => movie.name != "Terminator2");
            console.log(movieResult);
            setMovies(movieResult);
        }}>
            Click
        </button>
        
        {
            //console.log(movies)
        movies.map((movie, i) => {
            //console.log(movie);
            return <h2>{movie.name}</h2>
        
        })
        }
        </>
    );
}
