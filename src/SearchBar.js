import React from 'react';
import Search from './Search'
import MovieCard from './MovieCard'

class SearchBar extends React.Component {

    state = {
        movie: "",
        movieObject: null
    }

    componentDidUpdate(prevProps){

        if (prevProps.movie !== this.state.movie){
            fetch(`http://www.omdbapi.com/?s=${this.state.movie}&apikey=3b5b527e`)
            .then(resp => resp.json())
            .then(data=> this.setState({movieObject: data.Search}))
        }

    }

    searchHandler=(e)=>{
        this.setState({movie:e.target.value}, ()=>console.log(this.state.movie))
    }

    renderMovie = ()=>{

        if (this.state.movieObject ===null){
            return "sorry"
        } else{
            // console.log(this.state.movieObject, "reanderMovie")

            return this.state.movieObject.map((movie)=> < MovieCard movie={movie} key={movie.imdbID}/>)
        }
    }

    render(){

        console.log("movieObj", this.state.movieObject)


        return(
            <div>    
                
                    <p>Movie Title</p>
                    <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
                    <h3>Hello</h3>
                    {/* {this.renderMovie()} */}

            </div>  
        )
    }
}

export default SearchBar
