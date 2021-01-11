import React from 'react';
import Search from '../Components/Search'
import MovieCard from '../Components/MovieCard'
import "../ResultContainer.css";

class ResultContainer extends React.Component {

    state = {
        movie: "",
        movieObject: null,
        updatedMovies: []
    }

    componentDidUpdate(prevProps, prevState){
        // console.log("conponetDidUpdate", prevState)

        if (this.state.movie !== prevState.movie){
            fetch(`http://www.omdbapi.com/?s=${this.state.movie}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(resp => resp.json())
            .then(data=> this.setState({movieObject: data.Search}))
        }
    }

    searchHandler=(e)=>{
        this.setState({movie:e.target.value}, ()=>console.log(this.state.movie))
    }

    appClickHandler=(movie_object)=>{
        
        this.setState({disabledButton: true})
        let newArray = [...this.state.movieObject]
        let filteredObj = newArray.find((obj)=> obj=== movie_object)
        filteredObj.nominated = true
        this.setState({updatedMovies:newArray}) 
        }

    renderMovie = ()=>{

                if (this.state.movieObject !== null && this.state.movieObject !== undefined){

                    return this.state.movieObject.map((movie)=> 
                    < MovieCard movie={movie} key={movie.imdbID} 
                    appClickHandler={this.appClickHandler}
                    />)
                }
        }

    renderNominatedMovies =()=>{
  
        
       let newArray =  this.state.updatedMovies.filter(movie=> {
            return movie.nominated === true})

            console.log('newArray', newArray)
                
        let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
                    appClickHandler={this.appClickHandler}
                    />)

        return newResult
    }

    render(){

       console.log("nominatedMovies", this.state.updatedMovies ) 

        return(
            <>
                    <p>Movie Title</p>
                    <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
                    <div className="row"> 
                    <div className="col-s-2 border col-xs-offset-4">
                    {    
                    <>
                    <p> <br/> Results for "{this.state.movie}"</p>
                    {this.renderMovie()}
                    </>
                    }
                    </div>
                  <div className="col-s-2 border col-xs-offset-4">
                      
        
                    <p>
                        Nominated
                        {this.renderNominatedMovies()}
                    </p>
                      
                      </div>   
                

                   
            </div> 
            </> 
        )
    }
}

export default ResultContainer
