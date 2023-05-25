import React, {useEffect, useState} from 'react';
import axios from "axios";
import {DatePicker} from "antd";

function Search(props) {
    const [bedroom, setBedroom] = useState(null);
    const [bathroom, setBathroom] = useState(null);
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [loading, setLoading] = useState(true)
    const [home, setHome] = useState([]);

    const searchHomes = () => {
        axios.get('http://localhost:8080/homes/search', {
            params: {
                bedroom: bedroom,
                bathroom: bathroom,
                address: address,
                start_date: startDate,
                end_date: endDate,
                min_price: minPrice,
                max_price: maxPrice
            }
        })
            .then(response => {
                setHome(response.data);
                console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        searchHomes();
    }, []);

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div>
            <div className="container">
                <div className="search-area-inner">
                    <div className="search-contents ">
                        <form>
                            <div className="row">

                                {/*nhap dia chi*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <input className={"form-box search-fields"} type="text" placeholder="Address"
                                               value={address} onChange={(e) => setAddress(e.target.value)}/>
                                    </div>
                                </div>

                                {/*so phong ngu*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <select className="selectpicker search-fields" name="property-status"
                                                value={bedroom} onChange={(e) => setBedroom(e.target.value)}>
                                            <option value={""}>--Chọn phòng ngủ--</option>
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
                                        <select className="selectpicker search-fields" value={bathroom}
                                                onChange={(e) => setBathroom(e.target.value)}>
                                            <option>--Chọn phòng tắm--</option>
                                            <option value={"1"}>1 phòng tắm</option>
                                            <option value={"2"}>2 phòng tắm</option>
                                            <option value={"3"}>3 phòng tắm</option>
                                        </select>
                                    </div>
                                </div>

                                {/*nut tim kiem*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <button className="btn btn-block btn-4" onClick={searchHomes}>Tìm kiếm</button>
                                    </div>
                                </div>

                                {/*check in*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <DatePicker selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="yyyy/MM/dd"
                                                    className={"form-box search-fields"}
                                                    placeholder={"Chon ngay checkin"}
                                        />
                                    </div>
                                </div>
                                {/*checkout*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <DatePicker selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    dateFormat="yyy/MM/dd"
                                                    className={"form-box search-fields"}
                                                    placeholder={"Chon ngay checkout"}
                                        />
                                    </div>
                                </div>

                                {/*gia thap*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <input className={"form-box search-fields"} type="number"
                                               placeholder="Min Price" value={minPrice}
                                               onChange={(e) => setMinPrice(e.target.value)}/>
                                    </div>
                                </div>
                                {/*gia sau*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <input className={"form-box search-fields"} type="number"
                                               placeholder="Max Price" value={maxPrice}
                                               onChange={(e) => setMaxPrice(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;