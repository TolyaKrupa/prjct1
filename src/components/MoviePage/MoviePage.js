import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import clsx from "clsx";

import { IMG_BIG } from "../../configs";
import { webService } from "../../services/web.service";

import style from "./MoviePage.module.css";
import "../Components.css"

const MoviePage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        webService.getDetails(id).then(({data}) => setMovie(data))
    }, [id])
    return(<div className={clsx(style.wrapper, 'colorN1')}>
        <div className={style.poster}>{movie.backdrop_path ? <img src = {`${IMG_BIG}/${movie.backdrop_path}`} alt={movie.title}/> : <h2>Poster not found</h2>}</div>

        <div className={style.details}>
            <h2>{movie.title}</h2><h3>Runtime: {movie.runtime}m.</h3>
            {movie.tagline && <h3>Slogan: "{movie.tagline}"</h3>}
            <h3>Release: {movie.release_date}</h3>
            <h3>Country: {movie.origin_country}</h3>
            <h3>Status: {movie.status}</h3>
            <h3>Genres:</h3><ul>{movie.genres?.map(genre => <li>{genre.name} </li>)}</ul>
        </div>

        <p className={style.overview}><b>What is the "{movie.title}" about:</b> {movie.overview}</p>

        <div className={style.rating}>
            <Rating readonly={true} allowFraction={true} initialValue={movie.vote_average/2} size={20}/>
            <p>{movie.vote_average} ({movie.vote_count})</p>
        </div>
    </div>)
};

export { MoviePage };

