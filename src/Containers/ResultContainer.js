import React from 'react';
import Search from '../Components/Search'
import "../ResultContainer.css";
import MovieContainer from '../Containers/MovieContainer';
import Banner from 'react-js-banner';

class ResultContainer extends React.Component {

    state = {
        movie: "",
        movieObject: null,
        nominatedMovies: null,
        isMax: false,
        renderBanner: false,
        updatedMovies: []
    };

    componentDidUpdate(prevProps, prevState){

        if (this.state.movie !== prevState.movie){
            fetch(`http://www.omdbapi.com/?s=${this.state.movie}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(resp => resp.json())
            .then(data=> this.setState({movieObject: data.Search}))
        };
    };

    searchHandler=(e)=>{
        this.setState({movie:e.target.value})
    };

    appClickHandler=(movie_object)=>{

        let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true) 
        if (nominatedMovies.length > 4){
            console.log("nominated", nominatedMovies.length)
            this.setState({renderBanner: true});
            return null;
        } else{

            let newArray = [...this.state.movieObject]
            let filteredObj = newArray.find((obj)=> obj=== movie_object)
            filteredObj.nominated = true
            this.setState({updatedMovies:newArray}) 
        }
    };

    removeClickHandler=(movie_object)=>{

        let newArray = [...this.state.movieObject]
        let filteredObj = newArray.find((obj)=> obj=== movie_object)
        filteredObj.nominated = false
        this.setState({updatedMovies:newArray}) 
        this.setState({renderBanner: false})
    };

    renderDisplayBanner = () => (
        <Banner showBanner={true}>
            <div>
              <h4>You've nominated all 5 movies, to change the selection, please remove a movie</h4>
            </div>
        </Banner>
    )

    render() { 
        return(
            <>  
            { this.state.renderBanner ? this.renderDisplayBanner() : null }
            <h4>Movie Title</h4>
            <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
            <div className='row'>
            <MovieContainer 
            movie={this.state.movie}
            movieObject={this.state.movieObject}
            getNominatedMovies={this.getNominatedMovies}
            appClickHandler ={this.appClickHandler}
            updatedMovies={this.state.updatedMovies}
            removeClickHandler={this.removeClickHandler}/>
            </div>
            </>
        )
    };
};

export default ResultContainer
