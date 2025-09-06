import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import { Header, Loader } from "../components"

const MainLayout = () => {

    const {loading} = useSelector(state => state.movieReducer);

    return(<div>
        <Header/>
        {loading && <Loader/>}
        <Outlet/>
    </div>)
}

export {MainLayout}