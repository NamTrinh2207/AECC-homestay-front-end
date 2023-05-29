import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import TruncatedLink from "./truncate/TruncateLink";
import TruncatedText from "./truncate/TruncateText";
import MainHeader from "./header/MainHeader";
import TopHeader from "./header/TopHeader";
import Footer from "./footer/Footer";
import Search from "./Search";
import SearchResult from "./SearchResult";
import ListHomestay from "./ListHomestay";

function ListHomeByHomeType(props) {
    const [home, setHome] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const visiblePages = totalPages + 1;
    const { id } = useParams();
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Thực hiện các hành động khác khi chuyển trang
        // ...
    };
    const [homes, setHomes] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);

    const handleHomesReceived = (homes) => {
        setHomes(homes);
        setShowSearchResult(true)
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
        const listHomeByCategory = async () => {
            try {
                const response=await axios.get(`http://localhost:8080/homes/${id}/home-type?page=${currentPage}`);
                const {totalPages} = response.data;
                setHome(response.data.content);
                setTotalPages(totalPages);
                console.log("typy", homes)
            }catch (errr){
                console.log(errr)
            }
        }
        listHomeByCategory();
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
            {home.length > 0 ? (
                <>
                    <TopHeader/>
                    {/* Top header end */}

                    {/* main header start */}
                    <MainHeader/>
                    <div className="banner banner-bg" id="particles-banner-wrapper">
                        <div id="particles-banner-2"></div>
                        <div className="search-area sa-show-2" id="search-area-4">
                            <Search onHomesReceived={handleHomesReceived}/>
                        </div>
                        {/* Search area end */}
                    </div>
                    {/*List homestay*/}
                    <div>
                        {showSearchResult ? (
                            <SearchResult searchResult={homes} />
                        ) : (
                            <></>
                        )}
                    </div>
                <div className="featured-properties content-area-19">
                    <div className="container">
                        <div className="main-title">
                                    <h1>Danh sách {home[0].homeType.name}</h1>
                        </div>
                        <div className="row wow fadeInUp delay-04s">
                            {home.map(home1 => (
                                <div className="col-lg-4 col-md-6 col-sm-12 filtr-item"
                                     data-category="3, 2">
                                    <div className="property-box-7">
                                        <div className="property-thumbnail">
                                            <Link className="property-img" to={`/viewHome/${home1.id}`}>
                                                <div style={{backgroundColor: getStatusColor(home.status)}}
                                                     className="tag-2">{getStatusLabel(home1.status)}</div>
                                                <div className="price-box"><span>{home1.priceByDay} VNĐ</span>/ngày</div>
                                                <img height={250} src={home1.image[0]} alt="property-box-7"/>
                                            </Link>
                                        </div>
                                        <div className="detail">
                                            <h1 className="title">
                                                <TruncatedLink url={`/viewHome/${home1.id}`} text={home1.name} maxLength={28}></TruncatedLink>
                                            </h1>
                                            <div className="location">
                                                <TruncatedText text={home1.address} maxLength={35}></TruncatedText>
                                            </div>
                                        </div>
                                        <ul className="facilities-list clearfix">
                                            <li>
                                                <span><i className="fa fa-home"></i></span>{home1.homeType.name}
                                            </li>
                                            <li>
                                                <span><i className="fa fa-bed"></i></span> {home1.bedroom}
                                            </li>
                                            <li>
                                                <span><i className="fa fa-bath"></i></span> {home1.bathroom}
                                            </li>
                                            <li className="float-right">
                                                <span>Đánh giá</span>{[...Array(home1.rating)].map((_, index) => (
                                                <i className="fa fa-star" style={{color: "orange"}}></i>))}
                                            </li>
                                        </ul>
                                        <div className="footer clearfix">
                                            <div className="pull-left days">
                                                <p><i className="fa fa-user"></i>{home1.users.name}</p>
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
                            </button>&nbsp;
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
                    <Footer/>
                </>
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

export default ListHomeByHomeType;