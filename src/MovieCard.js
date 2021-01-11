import React from 'react'

function MovieCard (props){

    console.log(props, "props")

    return (
        <>
        <p>*{props.movie.Title}({props.movie.Year})</p> <button>nominate</button>
        </>
    )
}

export default MovieCard