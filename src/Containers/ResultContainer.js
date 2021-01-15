import React from 'react';
import styled from 'styled-components'
import Search from '../Components/Search'
import MovieContainer from '../Containers/MovieContainer';
import Banner from 'react-js-banner';

const ResultsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid blue;
    height: auto;
    justify-content: center;
    align-items: center;
`

const SearchWrapper = styled.div`
    width: 100%;
    border: 1px solid gray;
    border-radius: 6px;
    padding: 8px;
`

class ResultContainer extends React.Component {

    state = {
        movie: "",
        movieObject: null,
        page: 1,
        nominatedMovies: null,
        isMax: false,
        renderBanner: false,
        updatedMovies: [],
        tooManyResults: false
    };

    componentDidUpdate(prevProps, prevState){

        if (this.state.movie !== prevState.movie  || this.state.page !== prevState.page){
            fetch(`http://www.omdbapi.com/?s=${this.state.movie}&page=${this.state.page}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(resp => resp.json())
            .then(data => {
                if (data.Error === 'Too many results.') {
                    this.setState({ tooManyResults: true })
                } else {
                    this.setState({movieObject: data.Search, tooManyResults: false })
                }
            })
        };

        // if (this.state.page !== prevState.page) {
        //     fetch(`http://www.omdbapi.com/?s=${this.state.movie}&page=${this.state.page}&apikey=${process.env.REACT_APP_API_KEY}`)
        //     .then(resp => resp.json())
        //     .then(data => {this.setState({movieObject: data.Search}, ()=> console.log(data))
        //         }) 
        // }
    };

    changePage = (e) => {
        if (e.target.innerText === 'forward'){
            this.setState({page: this.state.page+1})
        } else {
            this.setState({page: this.state.page-1})
        }
    }

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
            <ResultsWrapper>  
            { this.state.renderBanner ? this.renderDisplayBanner() : null }
            <SearchWrapper>
                <h4>Movie Title</h4>
                <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
            </SearchWrapper>
            <MovieContainer 
                movie={this.state.movie}
                movieObject={this.state.movieObject}
                getNominatedMovies={this.getNominatedMovies}
                appClickHandler ={this.appClickHandler}
                updatedMovies={this.state.updatedMovies}
                removeClickHandler={this.removeClickHandler}
                tooManyResults={this.state.tooManyResults}
                changePage={this.changePage}
            />
            </ResultsWrapper>
        )
    };
};

export default ResultContainer
