import { useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import clsx from "clsx";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";

import style from "./AllMovies.module.css";
import '../Components.css';
import '../PageComponent/Page.css';

const AllMovies = () => {
    const {genre} = useParams();
    const dispatch = useDispatch();
    const {movies, genres} = useSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams({page:'1'});
    const page = +query.get('page') || 1;

    const prevPage = () => {
        if (page > 1) {
            setQuery({page: String(page - 1)})
        }
    };
    const nextPage = () => {
        if (page < movies.total_pages) {
            setQuery({page: String(page + 1)})
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    const chosenGenre = useMemo(() => {
        return genres.find(g => g.name.toLowerCase() === genre);
    }, [genres, genre]);

    useEffect(() => {
        if (chosenGenre?.id) {
            dispatch(movieActions.getMoviesByGenre({
                genre_id: chosenGenre.id,
                page
            }))
        } else {
            dispatch(movieActions.getAllMovies(page))
        }
    },[chosenGenre, page, dispatch]);

    return(<div>
        <div className={clsx(style.genres, 'colorW2', 'backGrColW2')}>
            {genres.map(genre => <NavLink to={`/movies/${genre.name.toLowerCase()}`} key={genre.id}>{genre.name}</NavLink>)}
        </div>

        <div className="moviesContainer">
            {movies.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>

        {movies.total_pages > 1 && <div className="pageBtn_wrapper">
            <button className="pageBtn colorW1 backGrColW1" disabled={page === 1} onClick={prevPage}><GrLinkPrevious /> prev</button>
            <h2 className="colorN1">page: {page}</h2>
            <button className="pageBtn colorW1 backGrColW1" disabled={page === movies.total_pages} onClick={nextPage}>next <GrLinkNext/></button>
        </div>}
    </div>)
};

export {AllMovies}