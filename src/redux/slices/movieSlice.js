import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { webService } from "../../services/web.service";

const initialState = {
    movies: [],

    genres:[],

    trending: [],

    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],

    searchQuery: '',
    searchResults: [],

    search: '',
    sResults: [],

    loading: false,
    error: null
};

const getAllMovies = createAsyncThunk(
    'movieSlice/getAllMovies',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await webService.getMovies(page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getGenres = createAsyncThunk(
    'movieSlice/getGenres',
    async (_, {rejectWithValue}) =>{
        try {
            const {data} = await webService.getGenres();
            return (data.genres)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getMoviesByGenre = createAsyncThunk(
    'movieSlice/getMoviesByGenre',
    async ({genre_id, page}, {rejectWithValue}) => {
        try {
            const {data} = await webService.getMoviesByGenre(genre_id, page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getTrending = createAsyncThunk(
    'movieSlice/getTrending',
    async ({time_window, page}, {rejectWithValue}) => {
        try {
            const {data} = await webService.getTrending(time_window, page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getNowPlaying = createAsyncThunk(
    'movieSlice/getNowPlaying',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await webService.getNowPlaying(page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getPopular = createAsyncThunk(
    'movieSlice/getPopular',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await webService.getPopular(page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getTopRated = createAsyncThunk(
    'movieSlice/getTopRated',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await webService.getTopRated(page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const getUpcoming = createAsyncThunk(
    'movieSlice/getUpcoming',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await webService.getUpcoming(page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const searchMovie = createAsyncThunk(
    'movieSlice/searchMovie',
    async (query, {rejectWithValue}) => {
        try {
            const {data} = await webService.searchMovie(query);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const search = createAsyncThunk(
    'movieSlice/search',
    async ({query, page}, {rejectWithValue}) => {
        try {
            const {data} = await webService.search(query, page);
            return (data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers:{
        setSearchQuery:(state, action) => {
            state.searchQuery = action.payload
        },
        deleteSearchQuery:(state, action) => {
            state.searchQuery = '';
            state.searchResults = null
        },
        setSearch:(state, action) => {
            state.search = action.payload
        }

    },
    extraReducers: builder => builder
        .addCase(getAllMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
        })
        .addCase(getAllMovies.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
        })

        .addCase(getMoviesByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
        })
        .addCase(getMoviesByGenre.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(getTrending.fulfilled, (state, action) => {
            state.trending = action.payload;
            state.loading = false;
        })
        .addCase(getTrending.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(getNowPlaying.fulfilled, (state, action) => {
            state.nowPlaying = action.payload;
            state.loading = false;
        })
        .addCase(getNowPlaying.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(getPopular.fulfilled, (state, action) => {
            state.popular = action.payload;
            state.loading = false;
        })
        .addCase(getPopular.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(getTopRated.fulfilled, (state, action) => {
            state.topRated = action.payload;
            state.loading = false;
        })
        .addCase(getTopRated.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(getUpcoming.fulfilled, (state, action) => {
            state.upcoming = action.payload;
            state.loading = false;
        })
        .addCase(getUpcoming.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(searchMovie.fulfilled, (state, action) => {
            if (action.payload.results.length > 0) {
                state.searchResults = action.payload.results;
            } else {
                state.searchResults = "No results found. Try changing your search input."
            }
        })
        .addCase(searchMovie.pending, (state, action) => {
            state.searchResults = "Searching...";
        })

        .addCase(search.fulfilled, (state, action) => {
            state.sResults = action.payload;
            state.loading = false;
        })
        .addCase(search.pending, (state, action) => {
            state.loading = true;
        })
});

const {reducer: movieReducer, actions: {setSearchQuery, deleteSearchQuery, setSearch}} = movieSlice;

const movieActions = {
    getAllMovies,

    getGenres,
    getMoviesByGenre,

    getTrending,

    getNowPlaying,
    getPopular,
    getTopRated,
    getUpcoming,

    setSearchQuery,
    deleteSearchQuery,
    searchMovie,

    setSearch,
    search
};

export {movieReducer, movieActions}