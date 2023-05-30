import React, {useEffect, useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

function Search(props) {
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [address, setAddress] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState([]);

    useEffect(() => {
        fetchHomes();
        const interval = setInterval(() => {
            fetchHomes();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const fetchHomes = () => {
        axios.get('http://localhost:8080/homes/search')
            .then(response => {
                setSearch(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleSearch = () => {
        const filteredHomes = search.filter(home => {
            return (
                (bedrooms === '' || home.bedroom == bedrooms) &&
                (bathrooms === '' || home.bathroom == bathrooms) &&
                (address === '' || home.address.toLowerCase().trim().includes(address.toLowerCase().trim())) &&
                (checkIn === '' || home.checkin <= checkIn || home.checkin >= checkIn) &&
                (checkOut === '' || home.checkout >= checkOut) &&
                (minPrice === '' || home.priceByDay >= minPrice) &&
                (maxPrice === '' || home.priceByDay <= maxPrice)
            );
        });
        Swal.fire({
            title: 'Đang tìm kiếm...',
            text: `Tìm thấy ${filteredHomes.length} ngôi nhà phù hợp với tiêu chí của bạn.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            props.onHomesReceived(filteredHomes);
        });
    };


    return (
        <div>
            <div className="container">
                <div className="search-area-inner">
                    <div className="search-contents ">
                        <div className="row">
                            {/*nhap dia chi*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="selectpicker search-fields"
                                        value={address} placeholder={"Địa chỉ..."}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/*so phong ngu*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <select className="selectpicker search-fields"
                                            value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                                        <option value={""}>Số phòng ngủ</option>
                                        <option value={"1"}>1 phòng ngủ</option>
                                        <option value={"2"}>2 phòng ngủ</option>
                                        <option value={"3"}>3 phòng ngủ</option>
                                        <option value={"4"}>4 phòng ngủ</option>
                                        <option value={"5"}>5 phòng ngủ</option>
                                        <option value={"6"}>6 phòng ngủ</option>
                                        <option value={"7"}>7 phòng ngủ</option>
                                        <option value={"8"}>8 phòng ngủ</option>
                                        <option value={"9"}>9 phòng ngủ</option>
                                        <option value={"10"}>10 phòng ngủ</option>
                                    </select>
                                </div>
                            </div>

                            {/*so phong tam*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <select className="selectpicker search-fields" value={bathrooms}
                                            onChange={(e) => setBathrooms(e.target.value)}>
                                        <option value={""}>Số phòng tắm</option>
                                        <option value={"1"}>1 phòng tắm</option>
                                        <option value={"2"}>2 phòng tắm</option>
                                        <option value={"3"}>3 phòng tắm</option>
                                    </select>
                                </div>
                            </div>

                            {/*nut tim kiem*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <button className="btn btn-block btn-4" onClick={handleSearch}>Tìm kiếm</button>
                                </div>
                            </div>

                            {/*check in*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <input
                                        type="date"
                                        value={checkIn}
                                        id="checkInInput"
                                        className="form-box search-fields form-control"
                                        onChange={(e) => setCheckIn(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/*checkout*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <input
                                        type="date" className="form-box search-fields form-control"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/*gia thap*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <input className={"form-box search-fields"} type="number"
                                           placeholder="Giá thấp nhất" value={minPrice}
                                           onChange={(e) => setMinPrice(e.target.value)}/>
                                </div>
                            </div>
                            {/*gia sau*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <input className={"form-box search-fields"} type="number"
                                           placeholder="Giá cao nhất" value={maxPrice}
                                           onChange={(e) => setMaxPrice(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;