import React from 'react';
import styled from 'styled-components'
import MovieCard from '../Components/MovieCard'
import "../ResultContainer.css";

const MovieWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Movies = styled.div`
    border: 1px solid gray;
    border-radius: 6px;
    padding: 8px;
    width: 45%;
    height: 50vh;
    overflow: scroll;
`

const Nominations = styled.div`
    border: 1px solid gray;
    border-radius: 6px;
    padding: 8px;
    width: 45%;
    height: 50vh;
    overflow: scroll;
`

function MovieContainer (props) {

    const renderMovie = () => {

        if (props.movieObject !== null && props.movieObject !== undefined){
            return props.movieObject.map((movie)=> 
            < MovieCard movie={movie} key={movie.imdbID} 
            appClickHandler={props.appClickHandler} 
            updatedMovies={props.updatedMovies}
            />);
        };
    };

    const renderNominatedMovies = () => {
  
       let newArray = props.updatedMovies.filter(movie=> {
            return movie.nominated === true});
                
        let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
            removeClickHandler={props.removeClickHandler} nominated={true} />);
        return newResult;
    } 


        return(
            <MovieWrapper>
                <Movies> 
                    {<h6>{props.tooManyResults ? 'Too many results - please refine search...' : `Results for "${props.movie}"`}</h6>}
                    <button type="button" className="btn btn-light btn-sm" onClick={props.changePage}>back</button>
                    <button type="button" className="btn btn-light btn-sm" onClick={props.changePage}>forward</button>
                    {renderMovie()}
                </Movies>
                <Nominations> 
                    <h6>Nominations</h6>
                    {renderNominatedMovies()} 
                </Nominations>
            </MovieWrapper>    
        )
};

export default MovieContainer