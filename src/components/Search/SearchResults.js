import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { movieActions } from "../../redux";

import style from './SearchResults.module.css';
import '../Components.css';

const SearchResults = ({handleClick}) => {
    const dispatch = useDispatch()
    const {searchResults, searchQuery} = useSelector(state => state.movieReducer);

    useEffect(() => {
        dispatch(movieActions.searchMovie(searchQuery))
    },[searchQuery, dispatch]);

    return(<div className={`${style.container} colorW2 backGrColW2`}>
        {(Array.isArray(searchResults) && searchResults.length>0) ?
        <div>
        {searchResults.slice(0,5)?.map(movie => 
            <div className={style.results} key={movie.id}>
                <Link to={'/movie/' + movie.id} onClick={handleClick}>
                <span className={style.title}>{movie.title}</span> ({movie.original_title}, {movie.release_date?.slice(0,4)}) {Math.floor(movie.vote_average * 10) / 10}
                </Link>
            </div>)}
            {searchResults.length > 5 && <Link to={'/search'} className={clsx(style.src, style.title)} onClick={() => {dispatch(movieActions.setSearch(searchQuery)); handleClick()}}>Show all results</Link>}
        </div>
        : <h3>{searchResults}</h3>}
    </div>)
};

export {SearchResults}