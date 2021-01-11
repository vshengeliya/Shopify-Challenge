import React from 'react'

function Search(props){

    return(
        <div>
            <form>
                <input placeholder="search movie" value={props.searchValue} onChange={props.searchHandler}/>
            </form>
        </div>
    )
}

export default Search