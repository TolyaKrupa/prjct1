import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import clsx from "clsx";

import { SearchBar } from "../Search/SearchBar";
import { movieActions } from "../../redux";

import style from './Header.module.css';
import '../Components.css'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const isMoviesPath = location.pathname.startsWith('/movies');
    const isTrendingPath = location.pathname.startsWith('/trending');

    useEffect(() => {
        dispatch(movieActions.getGenres())
    }, [dispatch])

    return(<div className={clsx(style.container, 'colorW1', 'backGrColW1')}>

        <button className={clsx(style.btn, location.pathname === '/' && style.active)} onClick={()=>navigate('/')}>Home</button>

        <button className={clsx(style.btn, isMoviesPath && style.active)} onClick={()=>navigate('movies')}>All movies</button>

        <button className={clsx(style.btn, isTrendingPath && style.active)} onClick={()=>navigate('/trending/day')}>Trending</button>

        <button className={clsx(style.btn, location.pathname === '/now-playing' && style.active)} onClick={()=>navigate('now-playing')}>Now playing</button>

        <button className={clsx(style.btn, location.pathname === '/popular' && style.active)} onClick={()=>navigate('popular')}>Popular</button>

        <button className={clsx(style.btn, location.pathname === '/top-rated' && style.active)} onClick={()=>navigate('top-rated')}>Top rated</button>

        <button className={clsx(style.btn, location.pathname === '/upcoming' && style.active)} onClick={()=>navigate('upcoming')}>Upcoming</button>

        <div className={style.search}><SearchBar/></div>
</div>)};

export {Header}