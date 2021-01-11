import React from 'react'

function MovieCard (props){

    console.log(props, "props")
    
    const clickHandler=()=>{

        props.appClickHandler(props.movie)
    }
    
    return (

        

            <>
            <p>*{props.movie.Title}({props.movie.Year})</p> 
            <button onClick = {clickHandler}>nominate</button>
            </>



        
        )

        
}

export default MovieCard