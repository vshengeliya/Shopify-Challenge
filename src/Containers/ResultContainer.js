import React from 'react';
import Search from '../Components/Search'
import MovieCard from '../Components/MovieCard'
import "../ResultContainer.css";
import Banner from 'react-js-banner';

class ResultContainer extends React.Component {

    state = {
        movie: "",
        movieObject: null,
        updatedMovies: []
        // nominatedMovie: []
    }

    componentDidUpdate(prevProps, prevState){

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

        // let movieArray = []
        // movieArray.push(movie_object)

        // this.setState({nominatedMovie:movieArray})

        let newArray = [...this.state.movieObject]
        let filteredObj = newArray.find((obj)=> obj=== movie_object)
        filteredObj.nominated = true
        this.setState({updatedMovies:newArray}) 
    }

    removeClickHandler=(movie_object)=>{
        console.log("movie_object", movie_object)

        let newArray = [...this.state.movieObject]
        let filteredObj = newArray.find((obj)=> obj=== movie_object)
        filteredObj.nominated = false
        this.setState({updatedMovies:newArray}) 
    }

//     displayBanner= ()=> {
//         if (this.updatedMovies !==null && this.updatedMovies.length === 5){

//           return  <Banner showBanner={true}>
//   <div>
//     <h1>h1</h1>
//     <h2>h2</h2>
//     <h3>h3</h3>
//   </div>
// </Banner>

//         }
//     }

    renderMovie = ()=>{

        if (this.state.movieObject !== null && this.state.movieObject !== undefined){
            return this.state.movieObject.map((movie)=> 
            < MovieCard movie={movie} key={movie.imdbID} 
            appClickHandler={this.appClickHandler} 
            // nominatedMovie={this.state.nominatedMovie}
            />)
        }
    }

    renderNominatedMovies =()=>{
  
       let newArray =  this.state.updatedMovies.filter(movie=> {
            return movie.nominated === true})
                
        let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
            removeClickHandler={this.removeClickHandler} nominated={true} />)

        return newResult
    }

    render(){ 

    console.log("updatedMovies", this.state.updatedMovies)

        return(
            <>
            <p>Movie Title</p>
            <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
            <div className="row"> 
            <div className="col-s-2 border col-xs-offset-4">
            {/* {this.displayBanner()} */}
            {    
            <>
            <p>  Results for "{this.state.movie}"</p>
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
