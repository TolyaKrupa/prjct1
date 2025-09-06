import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

import { movieActions } from "../../redux";
import { MovieCard } from "../MovieCard/MovieCard";

import style from "./Trending.module.css";
import '../Components.css';
import '../PageComponent/Page.css';

const Trending = () => {
    const dispatch = useDispatch();
    const {trending} = useSelector(state => state.movieReducer);
    const navigate = useNavigate();
    
    const location = useLocation();
    const parts = location.pathname.split('/');
    const time_window = parts[2];

    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState();
    useEffect(() => {
        setSelected(time_window)
    }, [time_window])

    const [query, setQuery] = useSearchParams({page:'1'});
    const page = +query.get('page') || 1;

    const prevPage = () => {
        if (page > 1) {
            setQuery({page: String(page - 1)})
        }
    };
    const nextPage = () => {
        if (page < trending.total_pages) {
            setQuery({page: String(page + 1)})
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    useEffect(() => {
        dispatch(movieActions.getTrending({time_window, page: page}))
    },[time_window, page, dispatch]);

    return(<div>
        <div className={clsx(style.custom_select, 'colorW1', 'backGrColW2')}>
            <div className={style.select} onClick={() => setIsOpen(!isOpen)}>
                {selected}
            </div>
            <IoIosArrowDown className={clsx(style.arrow, isOpen && style.rotate)}/>
            {isOpen && (
                <div className={style.options}>
                    <div className={style.option} onClick={() => { navigate('/trending/day'); setIsOpen(false); }}>day</div>
                    <div className={style.option} onClick={() => { navigate('/trending/week'); setIsOpen(false); }}>week</div>
                </div>
        )}
        </div>

        <div className="moviesContainer">
            {trending.results?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>

        {trending.total_pages > 1 && <div className="pageBtn_wrapper">
            <button className="pageBtn colorW1 backGrColW1" disabled={page === 1} onClick={prevPage}><GrLinkPrevious /> prev</button>
            <h2 className="colorN1">page: {page}</h2>
            <button className="pageBtn colorW1 backGrColW1" disabled={page === trending.total_pages} onClick={nextPage}>next <GrLinkNext/></button>
        </div>}
    </div>)
};

export {Trending}