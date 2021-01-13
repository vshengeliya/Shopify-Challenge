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
        button = <button type="button" className="btn btn-secondary btn-xs" onClick = {removeClickHandler}>remove</button>
    } else if(props.movie.nominated){
        button =  <button type="button" className="btn btn-primary btn-xs" disabled onClick = {clickHandler}>nominated</button>
    } else{
        button =  <button type="button" className="btn btn-primary btn-xs" onClick = {clickHandler}>nominate</button>
    }

    return (

        <>
        <div>*{props.movie.Title}({props.movie.Year})</div> 
        {button}
        </>
        
        )
}

export default MovieCard