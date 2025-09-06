import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";
import { PageComponent } from "../PageComponent/PageComponent";

import '../Components.css';

const Popular = () => {
    const dispatch = useDispatch()
    const {popular} = useSelector(state => state.movieReducer);
    const [page, setPage] = useState();

    useEffect(() => {
        dispatch(movieActions.getPopular(page))
    },[page, dispatch]);

    return(<div>
        <div className="moviesContainer">
            {popular.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
        <PageComponent total_pages={popular.total_pages} setPage={setPage}/>
    </div>)
};

export {Popular}