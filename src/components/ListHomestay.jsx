import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import TruncatedLink from "./truncate/TruncateLink";
import TruncatedText from "./truncate/TruncateText";

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
                setHomes(response.data.content);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [check, currentPage]);

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
    return (
        <div>
            {homes.length > 0 ? (
                <div className="featured-properties content-area-19">
                    <div className="container">
                        <div className="main-title">
                            <h1>Danh sách homestay</h1>
                        </div>
                        <div className="row wow fadeInUp delay-04s">
                            {homes.map(home => (
                                <div className="col-lg-4 col-md-6 col-sm-12 filtr-item"
                                     data-category="3, 2">
                                    <div className="property-box-7">
                                        <div className="property-thumbnail">
                                            <Link className="property-img" to={`/viewHome/${home.id}`}>
                                                <div style={{backgroundColor: getStatusColor(home.status)}}
                                                     className="tag-2">{getStatusLabel(home.status)}</div>
                                                <div className="price-box"><span>{home.priceByDay} VNĐ</span>/ngày</div>
                                                <img height={250} src={home.image[0]} alt="property-box-7"/>
                                            </Link>
                                        </div>
                                        <div className="detail">
                                            <h1 className="title">
                                                <TruncatedLink url={`/viewHome/${home.id}`} text={home.name} maxLength={28}></TruncatedLink>
                                            </h1>
                                            <div className="location">
                                                <TruncatedText text={home.address} maxLength={35}></TruncatedText>
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
                            <h1>Danh sách trống</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListHomestay;