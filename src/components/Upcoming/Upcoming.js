import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";
import { PageComponent } from "../PageComponent/PageComponent";

import '../Components.css';

const Upcoming = () => {
    const dispatch = useDispatch()
    const {upcoming} = useSelector(state => state.movieReducer);
    const [page, setPage] = useState();

    useEffect(() => {
        dispatch(movieActions.getUpcoming(page));
    },[page, dispatch]);

    return(<div>
        <div className="moviesContainer">
            {upcoming.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
        <PageComponent total_pages={upcoming.total_pages} setPage={setPage}/>
    </div>)
};

export {Upcoming}