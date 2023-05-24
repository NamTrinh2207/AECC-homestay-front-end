import React, {useState} from 'react';
import { DatePicker} from "antd";



function Search(props) {

    const [selectedDate, setSelectedDate] = useState(null);

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
                                        <input type="text" className={"form-control search-fields"}
                                               placeholder={"nhap dia chi"}/>
                                    </div>
                                </div>

                                {/*so phong ngu*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <select className="selectpicker search-fields" name="property-status">
                                            <option>So phong ngu</option>

                                        </select>
                                    </div>
                                </div>

                                {/*so phong tam*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <select className="selectpicker search-fields" name="location">
                                            <option>So phong tam</option>
                                        </select>
                                    </div>
                                </div>

                                {/*nut tim kiem*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <button className="btn btn-block btn-4" type="submit">Tim kiem</button>
                                    </div>
                                </div>

                                {/*check in*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <DatePicker selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    dateFormat="yyyy/MM/dd"
                                                    className={"form-box search-fields"}
                                                    placeholder={"Chon ngay checkin"}
                                        />
                                    </div>
                                </div>
                                {/*checkout*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">
                                        <DatePicker selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    dateFormat="yyy/MM/dd"
                                                    className={"form-box search-fields"}
                                                    placeholder={"Chon ngay checkout"}
                                        />
                                    </div>
                                </div>

                                {/*gia thap*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">

                                    </div>
                                </div>
                                {/*gia sau*/}
                                <div className="col-6 col-lg-3 col-md-3">
                                    <div className="form-group">

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