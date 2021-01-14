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
        renderBanner: false
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

    // getNominatedMovies = (movies) => {
    //     if (movies !== undefined && movies.length >= 5) {
    //         this.setState({renderBanner: true})
    //     } else{
    //         this.setState({renderBanner: false})
    //     }
    // }

    //banner not working
    renderDisplayBanner = () => (
        <Banner showBanner={true}>
            <div>
              <h4>You've nominated all 5 movies</h4>
            </div>
        </Banner>
    )

    render() { 
        return(
            <>  
            {/* { this.state.renderBanner && this.renderDisplayBanner() } */}
            <h4>Movie Title</h4>
            <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
            <div className='row'>
            <MovieContainer 
            movie={this.state.movie}
            movieObject={this.state.movieObject}
            getNominatedMovies={this.getNominatedMovies}/>
            </div>
            </>
        
        )
    };
};

export default ResultContainer




// class ResultContainer extends React.Component {

//     state = {
//         movie: "",
//         movieObject: null,
//         updatedMovies: []
//     };

//     componentDidUpdate(prevProps, prevState){

//         if (this.state.movie !== prevState.movie){
//             fetch(`http://www.omdbapi.com/?s=${this.state.movie}&apikey=${process.env.REACT_APP_API_KEY}`)
//             .then(resp => resp.json())
//             .then(data=> this.setState({movieObject: data.Search}))
//         };
//     };

//     searchHandler=(e)=>{
//         this.setState({movie:e.target.value})
//     };

//     appClickHandler=(movie_object)=>{

//         let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true) 
//         //duplicate varibale
//         if (nominatedMovies.length >=5){
//             return null;
//         } else{

//             let newArray = [...this.state.movieObject]
//             let filteredObj = newArray.find((obj)=> obj=== movie_object)
//             filteredObj.nominated = true
//             this.setState({updatedMovies:newArray}) 
//         }

//     };

//     removeClickHandler=(movie_object)=>{
//         console.log("movie_object", movie_object)

//         let newArray = [...this.state.movieObject]
//         let filteredObj = newArray.find((obj)=> obj=== movie_object)
//         filteredObj.nominated = false
//         this.setState({updatedMovies:newArray}) 
//     };

//     displayBanner= ()=> {

//         let nominatedMovies = this.state.updatedMovies.filter(movie => movie.nominated === true)
  
//         if (nominatedMovies.length >= 5){

//           return  <Banner showBanner={true}>
//              <div>
//                <h4>You've nominated all 5 movies</h4>
//              </div>
//             </Banner>
//         };
//     };

//     renderMovie = ()=>{

//         if (this.state.movieObject !== null && this.state.movieObject !== undefined){
//             return this.state.movieObject.map((movie)=> 
//             < MovieCard movie={movie} key={movie.imdbID} 
//             appClickHandler={this.appClickHandler} 
//             updatedMovies={this.state.updatedMovies}
//             />);
//         };
//     };

//     renderNominatedMovies =()=>{
  
//        let newArray =  this.state.updatedMovies.filter(movie=> {
//             return movie.nominated === true});
                
//         let newResult = newArray.map(movie => < MovieCard movie={movie} key={movie.imdbID} 
//             removeClickHandler={this.removeClickHandler} nominated={true} />);
//         return newResult;
//     }

//     render(){ 

//         return(
//             <>
//             {this.displayBanner()}
//             <h4>Movie Title</h4>
//             <Search searchHandler={this.searchHandler} searchValue={this.state.movie}/>
//             <div className="row"> 
//             <div className="col-s-2 border col-xs-offset-4">
//             {    
//             <>
//             <h6>  Results for "{this.state.movie}"</h6>
//             {this.renderMovie()}
//             </>
//             }
//             </div>
//             <div className="col-s-2 border col-xs-offset-4">

//             <h6>
//             Nominated
//             {this.renderNominatedMovies()}
//             </h6> 
//             </div>         
//             </div> 
//             </> 
//         )
//     };
// };

// export default ResultContainer
