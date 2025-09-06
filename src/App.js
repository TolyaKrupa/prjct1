import {Routes, Route} from 'react-router-dom'

import { AllMovies, MoviePage, NowPlaying, Page404, Popular, SearchPage, ThemeToggle, TopRated, Trending, Upcoming} from "./components";
import { MainLayout } from './layouts/MainLayout';

function App() {
  
  return (
    <div>
      <Routes>
        <Route path='' element={<MainLayout/>}>
          <Route index element={<ThemeToggle/>}/>
          <Route path='movies' element={<AllMovies/>}>
            <Route path=':genre' element={<AllMovies/>}/>
          </Route>
          <Route path='movie/:id' element={<MoviePage/>}/>
          <Route path='trending/day' element={<Trending/>}/>
          <Route path='trending/week' element={<Trending/>}/>
          <Route path='now-playing' element={<NowPlaying/>}/>
          <Route path='popular' element={<Popular/>}/>
          <Route path='top-rated' element={<TopRated/>}/>
          <Route path='upcoming' element={<Upcoming/>}/>
          <Route path='search' element={<SearchPage/>}/>
        </Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </div>
  );
}

export default App;
