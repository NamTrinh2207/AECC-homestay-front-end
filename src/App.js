import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Pages404 from "./components/pages-404";
import CreateNewHotel from "./components/NewHotel";
import ComingSoon from "./components/ComingSoon";
import HotelDetails from "./components/HotelDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserProfile from "./components/Login/UserProfile";
import Logout from "./components/Login/Logout";
import 'react-toastify/dist/ReactToastify.css';
import TestSearch from "./components/TestSearch";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage/>}></Route>
                <Route path={'/404'} element={<Pages404/>}></Route>
                <Route path={'/create'} element={<CreateNewHotel/>}></Route>
                <Route path={'/coming-soon'} element={<ComingSoon/>}></Route>
                <Route path={'/viewHome/:id'} element={<HotelDetails/>}></Route>
                <Route path={'/login'} element={<Login />}></Route>
                <Route path={'/logout'} element={<Logout />}></Route>
                <Route path={'/register'} element={<Register/>}></Route>
                <Route path={'/user'} element={<UserProfile/>}></Route>
                <Route path={'/search'} element={<TestSearch/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
