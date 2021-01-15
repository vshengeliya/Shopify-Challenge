import React from 'react';
import MovieCard from '../Components/MovieCard'
import "../ResultContainer.css";

function MovieContainer (props) {

    const renderMovie = ()=>{

        if (props.movieObject !== null && props.movieObject !== undefined){
            return props.movieObject.map((movie)=> 
            < MovieCard movie={movie} key={movie.imdbID} 
            appClickHandler={props.appClickHandler} 
            updatedMovies={props.updatedMovies}
            />);
        };
    };

    const renderNominatedMovies = ()=>{
  
       let newArray = props.updatedMovies.filter(movie=> {
            return movie.nominated === true});
                
        let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
            removeClickHandler={props.removeClickHandler} nominated={true} />);
        return newResult;
    } 

        return(
            <>
            <div className="col-s-2 border col-xs-offset-4"> 
            <h6>  Results for "{props.movie}"</h6>
            {renderMovie()}
            </div>
            <div className="col-s-2 border col-xs-offset-4"> 
            <h6>Nominations</h6>
            {renderNominatedMovies()} 
            </div>
            </>   
           
        )
};

export default MovieContainer