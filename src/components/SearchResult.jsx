import React from 'react';
import {Link} from "react-router-dom";

function SearchResult(props) {
    const {searchResult} = props;
    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return 'green';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'transparent';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 1:
                return 'Phòng trống';
            case 2:
                return 'Đang bảo trì';
            case 3:
                return 'Đang cho thuê';
            default:
                return 'Unknown';
        }
    };
    return (
        <div>
            <div className="featured-properties content-area-19">
                <div className="container">
                    <div className="main-title">
                        <h1>Kết quả tìm kiếm</h1>
                    </div>
                    <div className="row wow fadeInUp delay-02s">
                        {searchResult.map(search => (
                            <div className="col-lg-4 col-md-6 col-sm-12 filtr-item" data-category="3, 2">
                                <div className="property-box-7">
                                    <div>
                                        <Link className="property-img" to={`/viewHome/${search[0]}`}>
                                            <div style={{backgroundColor: getStatusColor(search[7])}}
                                                 className="tag-2">{getStatusLabel(search[7])}</div>
                                            <div className="price-box"><span>{search[5]} VNĐ</span>/ngày</div>
                                            <img height={300} src={search[10]} alt="property-box-7"/>
                                        </Link>
                                    </div>
                                    <div className="detail">
                                        <h1 className="title">
                                            <Link style={{textDecoration: "none"}}
                                                  to={`/viewHome/${search[0]}`}>{search[4]}</Link>
                                        </h1>
                                        <div className="location">
                                            <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
                                            {search[1]}
                                        </div>
                                    </div>

                                    <ul className="facilities-list clearfix">
                                        <li>
                                            <span><i className="fa fa-home"></i></span>{search[12]}
                                        </li>
                                        <li>
                                            <span><i className="fa fa-bed"></i></span> {search[3]}
                                        </li>
                                        <li>
                                            <span><i className="fa fa-bath"></i></span> {search[2]}
                                        </li>
                                        <li className="float-right">
                                            <span>Đánh giá</span>{[...Array(search[6])].map((_, index) => (
                                            <i className="fa fa-star" style={{color: "orange"}}></i>))}
                                        </li>
                                    </ul>
                                    <div className="footer clearfix">
                                        <div className="pull-left days">
                                            <p><i className="fa fa-user"></i>{search[11]}</p>
                                        </div>
                                        <ul className="pull-right">
                                            <li><a href="#"><i
                                                className="flaticon-heart-shape-outline"></i></a></li>
                                            <li><a href="#"><i className="flaticon-calendar"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;