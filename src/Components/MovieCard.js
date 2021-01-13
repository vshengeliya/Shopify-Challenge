import React from 'react';


function MovieCard (props){
    
    const clickHandler=()=>{

        props.appClickHandler(props.movie)
    }

    const removeClickHandler=()=>{

        props.removeClickHandler(props.movie)
    }

    let button;
    if (props.movie.nominated && props.nominated){
        button = <button onClick = {removeClickHandler}>remove</button>
    } else{
        button =  <button onClick = {clickHandler}>nominate</button>
    }

   
    
    return (

        <>
        <p>*{props.movie.Title}({props.movie.Year})</p> 
        {button}
        </>
        
        )
}

export default MovieCard