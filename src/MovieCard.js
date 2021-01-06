import React from 'react'

function MovieCard (props){

    console.log(props, "props")

    return (
        <>
        <h1>test</h1>
        <h1>{props.title}</h1>
        </>
    )
}

export default MovieCard