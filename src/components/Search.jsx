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

    function convertVietnamese(text) {
        const mapChars = {
            'á': 'a',
            'à': 'a',
            'ả': 'a',
            'ã': 'a',
            'ạ': 'a',
            'â': 'a',
            'ấ': 'a',
            'ầ': 'a',
            'ẩ': 'a',
            'ẫ': 'a',
            'ậ': 'a',
            'ă': 'a',
            'ắ': 'a',
            'ằ': 'a',
            'ẳ': 'a',
            'ẵ': 'a',
            'ặ': 'a',
            'đ': 'd',
            'é': 'e',
            'è': 'e',
            'ẻ': 'e',
            'ẽ': 'e',
            'ẹ': 'e',
            'ê': 'e',
            'ế': 'e',
            'ề': 'e',
            'ể': 'e',
            'ễ': 'e',
            'ệ': 'e',
            'í': 'i',
            'ì': 'i',
            'ỉ': 'i',
            'ĩ': 'i',
            'ị': 'i',
            'ó': 'o',
            'ò': 'o',
            'ỏ': 'o',
            'õ': 'o',
            'ọ': 'o',
            'ô': 'o',
            'ố': 'o',
            'ồ': 'o',
            'ổ': 'o',
            'ỗ': 'o',
            'ộ': 'o',
            'ơ': 'o',
            'ớ': 'o',
            'ờ': 'o',
            'ở': 'o',
            'ỡ': 'o',
            'ợ': 'o',
            'ú': 'u',
            'ù': 'u',
            'ủ': 'u',
            'ũ': 'u',
            'ụ': 'u',
            'ư': 'u',
            'ứ': 'u',
            'ừ': 'u',
            'ử': 'u',
            'ữ': 'u',
            'ự': 'u',
            'ý': 'y',
            'ỳ': 'y',
            'ỷ': 'y',
            'ỹ': 'y',
            'ỵ': 'y'
        };

        return text.replace(/[áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g, function (matched) {
            return mapChars[matched];
        }).replace(/[^a-zA-Z0-9 ]/g, '');
    }

    const handleSearch = () => {
        const filteredHomes = search.filter(home => {
            return (
                (bedrooms === '' || home.bedroom == bedrooms) &&
                (bathrooms === '' || home.bathroom == bathrooms) &&
                (address === '' || convertVietnamese(home.address).toLowerCase().trim().includes(address.toLowerCase().trim())) &&
                (checkIn === '' || home.checkin <= checkIn || home.checkin >= checkIn) &&
                (checkOut === '' || home.checkout >= checkOut) &&
                (minPrice === '' || home.priceByDay >= minPrice) &&
                (maxPrice === '' || home.priceByDay <= maxPrice)
            );
        });
        if (filteredHomes.length !== 0) {
            Swal.fire({
                title: 'Đang tìm kiếm...',
                text: `Tìm thấy ${filteredHomes.length} ngôi nhà phù hợp với tiêu chí của bạn.`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                props.onHomesReceived(filteredHomes);
            });
        } else {
            Swal.fire({
                title: 'Đang tìm kiếm...',
                text: `Không tìm thấy ngôi nhà nào phù hợp với tiêu chí của bạn`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
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
                                    <label htmlFor="">Địa chỉ:</label>
                                    <input
                                        type="text"
                                        className="selectpicker search-fields"
                                        value={address} placeholder={" Nhập địa chỉ..."}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/*so phong ngu*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="">Phòng ngủ:</label>
                                    <select className="selectpicker search-fields"
                                            value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                                        <option value={""}>Chọn số phòng ngủ</option>
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
                                    <label htmlFor="">Phòng tắm:</label>
                                    <select className="selectpicker search-fields" value={bathrooms}
                                            onChange={(e) => setBathrooms(e.target.value)}>
                                        <option value={""}>Chọn số phòng tắm</option>
                                        <option value={"1"}>1 phòng tắm</option>
                                        <option value={"2"}>2 phòng tắm</option>
                                        <option value={"3"}>3 phòng tắm</option>
                                    </select>
                                </div>
                            </div>

                            {/*nut tim kiem*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <button style={{marginTop:32}} className="btn btn-block btn-4" onClick={handleSearch}>Tìm kiếm</button>
                                </div>
                            </div>

                            {/*check in*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="checkInInput">Ngày đặt:</label>
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
                                    <label htmlFor="checkoutInput">Ngày trả:</label>
                                    <input
                                        id={"checkoutInput"}
                                        type="date" className="form-box search-fields form-control"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/*gia thap*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="">Giá thấp nhất:</label>
                                    <input className={"form-box search-fields"} type="number"
                                           placeholder="  Giá thấp nhất" value={minPrice}
                                           onChange={(e) => setMinPrice(e.target.value)}/>
                                </div>
                            </div>
                            {/*gia sau*/}
                            <div className="col-6 col-lg-3 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="">Giá cao nhất:</label>
                                    <input className={"form-box search-fields"} type="number"
                                           placeholder="  Giá cao nhất" value={maxPrice}
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