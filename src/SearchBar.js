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
            // .then(data => console.log(data.Search))
            .then(data=> this.setState({movieObject: data.Search}, ()=> console.log(this.state.movieObject)))
        }

    }

    searchHandler=(e)=>{
        this.setState({movie:e.target.value}, ()=>console.log(this.state.movie))
    }

    renderMovie = ()=>{
        console.log(this.state.movieObject, "reanderMovie")
        // return this.state.movieObject.map((movie)=> < MovieCard title={movie.title}/>)
    }

    render(){


        return(
            <div>
                {

                    this.state.movieObject === null? 
                    <>
                    <p>Movie Title</p>
                    <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
                    </> :
                    <>
                    <p>Movie Title</p>
                    <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
                    {this.renderMovie}
                    </>
                }
                
                
            </div>  
        )
    }
}

export default SearchBar
