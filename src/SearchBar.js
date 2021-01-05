import React from 'react';
import Search from './Search'

class SearchBar extends React.Component {

    state = {
        movie: "",
        movieObject: null
    }

    // componentDidMount = () => {

    //     fetch(`http://www.omdbapi.com/?t=${this.state.movie}&apikey=3b5b527e`)
    //     .then(resp => resp.json())
    //     .then(console.log)
     
    // }

    componentDidUpdate(prevProps){

        if (prevProps.movie !== this.state.movie){
            fetch(`http://www.omdbapi.com/?t=${this.state.movie}&apikey=3b5b527e`)
            .then(resp => resp.json())
            .then(data => console.log(data))
            // .then(data=> this.setState({movieObject: data}, ()=>console.log(this.state.movieObject)))
        }

    }

    searchHandler=(e)=>{
        this.setState({movie:e.target.value}, ()=>console.log(this.state.movie))
    }

    render(){

        // console.log(this.state.movieObject)

        return(
            <div>
                <h4>Search Movie</h4>
                <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
            </div>  
        )
    }
}

export default SearchBar
