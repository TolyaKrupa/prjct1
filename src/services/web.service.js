import { axiosService } from "./axios.service";

const webService = {
    getMovies:(page = 1)=>axiosService.get('/discover/movie', {params:{page}}),

    getGenres:()=>axiosService.get('/genre/movie/list'),
    getMoviesByGenre:(genre_id, page = 1)=>axiosService.get('/discover/movie', {params: {with_genres: genre_id, page}}),

    getDetails:(id)=>axiosService.get(`/movie/${id}`),

    searchMovie:(st)=>axiosService.get(`/search/movie?query=${st}`),
    search:(query, page = 1)=>axiosService.get('/search/movie', {params: {query, page}}),

    getTrending:(time_window, page = 1)=>axiosService.get(`/trending/movie/${time_window}`, {params:{page}}),
    
    getNowPlaying:(page = 1)=>axiosService.get('/movie/now_playing', {params:{page}}),
    getPopular:(page = 1)=>axiosService.get('/movie/popular', {params:{page}}),
    getTopRated:(page = 1)=>axiosService.get('/movie/top_rated', {params:{page}}),
    getUpcoming:(page = 1)=>axiosService.get('/movie/upcoming', {params:{page}})
}

export {webService}