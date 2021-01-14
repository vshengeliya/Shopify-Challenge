import React from 'react';
import MovieCard from '../Components/MovieCard'
import Banner from 'react-js-banner';

import "../ResultContainer.css";

class MovieContainer extends React.Component {

    state = {
        updatedMovies: []
    };

    appClickHandler=(movie_object)=>{

        let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true) 
        //duplicate varibale
        if (nominatedMovies.length >=5){
            return null;
        } else{

            let newArray = [...this.props.movieObject] //pass as propos
            let filteredObj = newArray.find((obj)=> obj=== movie_object)
            filteredObj.nominated = true
            this.setState({updatedMovies:newArray}) 
        }
    };

    renderMovie = ()=>{

        if (this.props.movieObject !== null && this.props.movieObject !== undefined){
            return this.props.movieObject.map((movie)=> 
            < MovieCard movie={movie} key={movie.imdbID} 
            appClickHandler={this.appClickHandler} 
            updatedMovies={this.state.updatedMovies}
            />);
        };
    };

    removeClickHandler=(movie_object)=>{

        let newArray = [...this.props.movieObject]
        let filteredObj = newArray.find((obj)=> obj=== movie_object)
        filteredObj.nominated = false
        this.setState({updatedMovies:newArray}) 
    };

    // displayBanner= ()=> {

    //     let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true)
  
    //     if (nominatedMovies.length >= 5){

    //       return  <Banner showBanner={true}>
    //       <div>
    //         <h4>You've nominated all 5 movies</h4>
    //       </div>
    //      </Banner>
    //     };
    // };

    helper =()=>{
        let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true)
        console.log("movieCont", nominatedMovies)
        this.props.displayBanner(nominatedMovies)
    }

    renderNominatedMovies =()=>{
  
       let newArray =  this.state.updatedMovies.filter(movie=> {
            return movie.nominated === true});
                
        let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
            removeClickHandler={this.removeClickHandler} nominated={true} />);
        return newResult;
    }

    render(){ 
        this.helper()
        
        return(
            <>
            <div className="col-s-2 border col-xs-offset-4"> 
            <h6>  Results for "{this.props.movie}"</h6>
            {this.renderMovie()}
            </div>
            <div className="col-s-2 border col-xs-offset-4"> 
            <h6>Nominations</h6>
            {this.renderNominatedMovies()} 
            </div>
            </>   
           
        )
    };
};

export default MovieContainer