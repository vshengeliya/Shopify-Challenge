import React from 'react';
import Search from './Search'
import MovieCard from './MovieCard'

class SearchBar extends React.Component {

    state = {
        movie: "",
        movieObject: null
    }

    componentDidUpdate(prevProps, prevState){
        console.log("conponetDidUpdate", prevState)

        if (this.state.movie !== prevState.movie){
            fetch(`http://www.omdbapi.com/?s=${this.state.movie}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(resp => resp.json())
            .then(data=> this.setState({movieObject: data.Search}))
        }
    }

    searchHandler=(e)=>{
        this.setState({movie:e.target.value}, ()=>console.log(this.state.movie))
    }

    renderMovie = ()=>{
                if (this.state.movieObject !== null && this.state.movieObject !== undefined){

                    return this.state.movieObject.map((movie)=> < MovieCard movie={movie} key={movie.imdbID}/>)
                }
        }


    render(){

        console.log("env", process.env)


        return(
            <div>    
                
                    <p>Movie Title</p>
                    <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
                   
                    <h3>Results for "{this.state.movie}"</h3>
                    {this.renderMovie()}
                   


            </div>  
        )
    }
}

export default SearchBar
