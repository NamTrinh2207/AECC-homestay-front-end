import React, {useState} from 'react';
import axios from "axios";
import {DatePicker} from "antd";
import Swal from 'sweetalert2';

function Search(props) {
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const searchHomes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/homes/search', {
                params: {
                    bedroom: bedroom,
                    bathroom: bathroom,
                    address: address,
                    start_date: startDate,
                    end_date: endDate,
                    min_price: minPrice,
                    max_price: maxPrice
                }
            }).then(() => {
                let timerInterval
                Swal.fire({
                    title: 'Đang tìm kiếm',
                    html: 'Vui lòng đợi <b></b> s.',
                    timer: 500,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
                props.onHomesReceived(response.data)
            })
        } catch (error) {
            console.error(error);
        }
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
                                        value={address} placeholder={"Địa chỉ..."}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
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