import { Rating } from "react-simple-star-rating";

import { IMG_SMALL } from "../../configs";
import { Link, useNavigate } from "react-router-dom";

import style from "./MovieCard.module.css";
import '../Components.css';

const MovieCard = ({movie}) => {

    const navigate = useNavigate();

    return(<div className={style.card}>
        {movie.backdrop_path ? <img src = {`${IMG_SMALL}/${movie.backdrop_path}`} alt={movie.title} onClick={()=>navigate('/movie/' + movie.id)}/> : <h2>Poster not found</h2>}

        <h2><Link to={'/movie/' + movie.id}>{movie.title}</Link></h2>
        <h3>{movie.release_date}</h3>
        <p>{movie.overview}</p>
        <Rating readonly={true} allowFraction={true} initialValue={movie.vote_average/2} size={20}/>
    </div>)
}

export {MovieCard}