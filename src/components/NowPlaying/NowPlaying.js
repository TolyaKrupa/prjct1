import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";
import { PageComponent } from "../PageComponent/PageComponent";

import '../Components.css';

const NowPlaying = () => {
    const dispatch = useDispatch()
    const {nowPlaying} = useSelector(state => state.movieReducer);
    const [page, setPage] = useState();

    useEffect(() => {
        dispatch(movieActions.getNowPlaying(page))
    },[page, dispatch]);

    return(<div>
        <div className="moviesContainer">
            {nowPlaying.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
        <PageComponent total_pages={nowPlaying.total_pages} setPage={setPage}/>
    </div>)
};

export {NowPlaying}