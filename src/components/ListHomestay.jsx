import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function ListHomestay(props) {
    const [homes, setHomes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const visiblePages = totalPages + 1;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Thực hiện các hành động khác khi chuyển trang
        // ...
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const halfVisiblePages = Math.floor(visiblePages / 2);
        let startPage = currentPage - halfVisiblePages;
        if (startPage < 0) startPage = 0;
        let endPage = startPage + visiblePages - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - visiblePages + 1;
            if (startPage < 0) startPage = 0;
        }

        for (let i = startPage; i < endPage; i++) {
            const pageItemStyle = {
                marginRight: '5px', // Khoảng cách giữa các số trang
                display: 'inline-block', // Hiển thị trên cùng một dòng
                cursor: 'pointer', // Con trỏ chuột thành dạng tay
                fontWeight: currentPage === i ? 'bold' : 'normal', // Trang hiện tại được đậm
            };
            const pageLinkStyle = {
                cursor: "pointer",
                padding: '5px 10px', // Kích thước nút số trang
                backgroundColor: currentPage === i ? '#ccc' : 'transparent', // Màu nền của trang hiện tại
            };
            pageNumbers.push(
                <li key={i} style={pageItemStyle}>
                    <button
                        className="page-link"
                        style={pageLinkStyle}
                        onClick={() => handlePageChange(i)}
                    >
                        {i + 1}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/homes?page=${currentPage}`);
                const {totalPages} = response.data;
                console.log(response)
                setHomes(response.data);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [check, currentPage]);

    console.log("home", homes)

    const goToPreviousPage = () => {
        setCheck(!check);
        setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };


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
    if (homes === undefined) {
        return (
            <div className="featured-properties content-area-19">
                <div className="container">
                    <div className="main-title">
                        <h1>Danh sách nhà trống</h1>
                    </div>
                </div>
            </div>)
    } else {
        return (
            <div>
                {homes.length > 0 ? (
                    <div className="featured-properties content-area-19">
                        <div className="container">
                            <div className="main-title">
                                <h1>Danh sách nhà</h1>
                            </div>
                            <div className="row wow fadeInUp delay-02s">
                                {homes.map(home => (
                                    <div className="col-lg-4 col-md-6 col-sm-12 filtr-item" data-category="3, 2">
                                        <div className="property-box-7">
                                            <div>
                                                <Link className="property-img" to={`/viewHome/${home.id}`}>
                                                    <div style={{backgroundColor: getStatusColor(home.status)}}
                                                         className="tag-2">{getStatusLabel(home.status)}</div>
                                                    <div className="price-box"><span>{home.priceByDay} VNĐ</span>/ngày
                                                    </div>
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
                                ))}
                            </div>

                            <div className="pagination-container"
                                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <button style={{border: "none", cursor: "pointer"}}
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 0}
                                >
                                    <i style={{fontSize: 25}} className="fa fa-angle-left"></i>
                                </button>
                                {/*<span>{currentPage + 1}</span> / <span>{totalPages}</span>*/}
                                {renderPagination()}
                                <button style={{border: "none", cursor: "pointer"}}
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages - 1}
                                >
                                    <i style={{fontSize: 25}} className="fa fa-angle-right"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="featured-properties content-area-19">
                        <div className="container">
                            <div className="main-title">
                                <h1>Danh sách nhà trống</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ListHomestay;