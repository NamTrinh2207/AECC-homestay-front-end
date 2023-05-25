import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Propose(props) {
    const [homes, setHomes] = useState([]);
    const [check, setCheck] = useState(false);
    const userId = props.user;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${userId.id}/homes`);
                setHomes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [check]);

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
    return(
    <div className="related-properties hedin-mb-30">
        <h3 className="heading-3">Homestay khác của chủ nhà</h3>
        { homes.length > 0 ? (
        <div className="row">
            {homes.slice(0,3).map((home, index) => (
            <div className="col-lg-6 col-md-6">
                <div className="property-box-7">
                    <div className="property-thumbnail">
                        <Link className="property-img" to={`/viewHome/${home.id}`}>
                            <div style={{backgroundColor: getStatusColor(home.status)}}
                                 className="tag-2">{getStatusLabel(home.status)}</div>
                            <div className="price-box"><span>{home.priceByDay} VNĐ</span>/ngày</div>
                            <img height={300} src={home.image[0]} alt="property-box-7"/>
                        </Link>
                    </div>
                    <div className="detail">
                        <h1 className="title">
                            <Link style={{textDecoration: "none"}}
                                  to={`/viewHome/${home.id}`}>{home.name}</Link>
                        </h1>
                        <div className="location">
                            <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
                            {home.address}
                        </div>
                    </div>
                    <ul className="facilities-list clearfix">
                        <li>
                            <span><i className="fa fa-home"></i></span>{home.homeType.name}
                        </li>
                        <li>
                            <span><i className="fa fa-bed"></i></span> {home.bedroom}
                        </li>
                        <li>
                            <span><i className="fa fa-bath"></i></span> {home.bathroom}
                        </li>
                        <li className="float-right">
                            <span>Đánh giá</span>{[...Array(home.rating)].map((_, index) => (
                            <i className="fa fa-star" style={{color: "orange"}}></i>))}
                        </li>
                    </ul>
                    <div className="footer clearfix">
                        <div className="pull-left days">
                            <p><i className="fa fa-user"></i>{home.users.name}</p>
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
                    ))};
        </div>
        ) : (
        <div className="featured-properties content-area-19">
            <div className="container">
                <div className="main-title">
                    <h1>Chưa có đề xuất</h1>
                </div>
            </div>
        </div>
        )}
    </div>
);
}
