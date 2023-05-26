import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateNewHotel from "./components/NewHotel";
import ComingSoon from "./components/ComingSoon";
import HotelDetails from "./components/HotelDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserProfile from "./components/Login/UserProfile";
import Logout from "./components/Login/Logout";
import 'react-toastify/dist/ReactToastify.css';
import EditHotel from "./components/EditHotel";
import Recent from "./components/recent";
import MyProperty from "./components/Login/MyProperty";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage/>}></Route>
                <Route path={'/create'} element={<CreateNewHotel/>}></Route>
                <Route path={'/coming-soon'} element={<ComingSoon/>}></Route>
                <Route path={'/viewHome/:id'} element={<HotelDetails/>}></Route>
                <Route path={'/login'} element={<Login />}></Route>
                <Route path={'/logout'} element={<Logout />}></Route>
                <Route path={'/register'} element={<Register/>}></Route>
                <Route path={'/user'} element={<UserProfile/>}></Route>
                <Route path={'/edit/:id'} element={<EditHotel/>}></Route>
                <Route path={'/recent'} element={<Recent/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
