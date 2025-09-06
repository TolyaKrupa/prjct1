import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import './Page.css';
import '../Components.css';

const PageComponent = ({total_pages, setPage}) => {

    const [query, setQuery] = useSearchParams({page:'1'});
    const currentPage = +query.get("page") || 1;
    
    useEffect(() => {
        setPage(currentPage);
    }, [currentPage, setPage]);

    const prevPage = () => {
        if (currentPage > 1) {
            setQuery({page: String(currentPage - 1)})
        }
    };
    const nextPage = () => {
        if (currentPage < total_pages) {
            setQuery({page: String(currentPage + 1)})
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return(total_pages > 1 && <div className="pageBtn_wrapper">
        <button className="pageBtn colorW1 backGrColW1" disabled={currentPage === 1} onClick={prevPage}><GrLinkPrevious /> prev</button>
        <h2 className="colorN1">page: {currentPage}</h2>
        <button className="pageBtn colorW1 backGrColW1" disabled={currentPage === total_pages} onClick={nextPage}>next <GrLinkNext/></button>
    </div>)
};

export {PageComponent}