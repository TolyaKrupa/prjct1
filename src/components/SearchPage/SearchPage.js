import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";
import { PageComponent } from "../PageComponent/PageComponent";

import '../Components.css';

const SearchPage = () => {
    const dispatch = useDispatch()
    const {search, sResults} = useSelector(state => state.movieReducer);
    const [page, setPage] = useState();

    useEffect(() => {
        dispatch(movieActions.search({query: search, page}));
    },[search, page, dispatch]);

    return(<div>
        <h2 className="colorN1" style={{paddingLeft: "20px"}}>Search results for "{search}". Total {sResults.total_results} results</h2>
        <div className="moviesContainer">
            {sResults.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
        <PageComponent total_pages={sResults.total_pages} setPage={setPage}/>
    </div>)
};

export {SearchPage}