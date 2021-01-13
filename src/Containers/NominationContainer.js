import React from 'react';
import MovieCard from '../Components/MovieCard'
import "../ResultContainer.css";
import Banner from 'react-js-banner';

class NominationContainer extends React.Component {

    state = {
        movie: "",
        movieObject: null,
        updatedMovies: []
    };

    removeClickHandler=(movie_object)=>{
        console.log("movie_object", movie_object)

        let newArray = [...this.state.movieObject]
        let filteredObj = newArray.find((obj)=> obj=== movie_object)
        filteredObj.nominated = false
        this.setState({updatedMovies:newArray}) 
    };

    displayBanner= ()=> {

        let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true)
  
        if (nominatedMovies.length >= 5){

          return  <Banner showBanner={true}>
             <div>
               <h4>You've nominated all 5 movies</h4>
             </div>
            </Banner>
        };
    };

    renderNominatedMovies =()=>{
  
       let newArray =  this.state.updatedMovies.filter(movie=> {
            return movie.nominated === true});
                
        let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
            removeClickHandler={this.removeClickHandler} nominated={true} />);
        return newResult;
    }

    render(){ 

        return(
            <>
            <h6>
            Nominated
            {this.renderNominatedMovies()}
            </h6> 
            </> 
        )
    };
};

export default NominationContainer