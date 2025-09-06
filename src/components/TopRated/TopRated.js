import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";
import { PageComponent } from "../PageComponent/PageComponent";

import '../Components.css';

const TopRated = () => {
    const dispatch = useDispatch()
    const {topRated} = useSelector(state => state.movieReducer);
    const [page, setPage] = useState();

    useEffect(() => {
        dispatch(movieActions.getTopRated(page))
    },[page, dispatch]);

    return(<div>
        <div className="moviesContainer">
            {topRated.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
        <PageComponent total_pages={topRated.total_pages} setPage={setPage}/>
    </div>)
};

export {TopRated}