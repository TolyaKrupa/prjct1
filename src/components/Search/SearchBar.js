import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { movieActions } from "../../redux";
import { SearchResults } from "./SearchResults";

import style from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(state => state.movieReducer);
    const query = useRef();

    const handleClick = () => {
    if (query.current) {
      query.current.value = '';
      dispatch(movieActions.deleteSearchQuery())
      }
    }

  return(<div>
    <div className={style.inputWrapper}>
      <IoSearch />
      <input onChange={(e)=>dispatch(movieActions.setSearchQuery(e.target.value))}  placeholder="Search movie..." ref={query}/>
      {query.current?.value && <RxCross2 className={style.cross} onClick={()=>handleClick()}/>}
    </div>
    {searchQuery && <SearchResults handleClick = {handleClick}/>}
  </div>)
};

export {SearchBar}