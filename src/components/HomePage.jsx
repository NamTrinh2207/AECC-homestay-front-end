import React, {useEffect, useState} from 'react';
import TopHeader from "./header/TopHeader";
import MainHeader from "./header/MainHeader";
import Footer from "./footer/Footer";
import axios from "axios";
import {Link} from "react-router-dom";
import Recent from "./recent";


function HomePage(props) {
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
                console.log("ban dau", response.data.content)
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
            {/*Top header start*/}
            <TopHeader/>
            {/* Top header end */}

            {/* main header start */}
            <MainHeader/>
            {/* main header end */}

            {/* Banner start */}
            <div className="banner banner-bg" id="particles-banner-wrapper">
                <div className="search-area sa-show-2" id="search-area-4">
                </div>
                {/* Search area end */}
            </div>
            {/* banner end */}
            <div className="search-area sa-show" id="search-area-1">

            </div>
            {/* Featured properties start */}

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

            {/* Featured properties end */}

            {/*Recent hear*/}
            <Recent/>
            {/*Recent hear end*/}


            {/* Footer start */}
            <Footer/>
            {/* Footer end */}

            {/* Full Page Search */}
            <div id="full-page-search">
                <button type="button" className="close">×</button>
                <form action="#" className="search">
                    <input type="search" value="" placeholder="type keyword(s) here"/>
                    <button type="button" className="btn btn-sm btn-color">Search</button>
                </form>
            </div>

            {/* Property Video Modal */}
            <div className="modal property-modal fade" id="propertyModal" tabIndex="-1" role="dialog"
                 aria-labelledby="propertyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="propertyModalLabel">
                                Find Your Dream Properties
                            </h5>
                            <p>
                                <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i> 123 Kathal
                                St. Tampa City,
                            </p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6 modal-left">
                                    <div className="modal-left-content">
                                        <div id="modalCarousel" className="carousel slide" data-ride="carousel">
                                            <div className="carousel-inner" role="listbox">
                                                <div className="carousel-item active">
                                                    <iframe className="modalIframe"
                                                            src="https://www.youtube.com/embed/V7IrnC9MISU"
                                                            allowFullScreen></iframe>
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/img/img-8.jpg" alt="Test ALT"/>
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/img/img-9.jpg" alt="Test ALT"/>
                                                </div>
                                            </div>
                                            <a className="control control-prev" href="#modalCarousel" role="button"
                                               data-slide="prev">
                                                <i className="fa fa-angle-left"></i>
                                            </a>
                                            <a className="control control-next" href="#modalCarousel" role="button"
                                               data-slide="next">
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 modal-right">
                                    <div className="modal-right-content">
                                        <section>
                                            <h3>Features</h3>
                                            <ul className="bullets">
                                                <li><i className="flaticon-bed"></i> Double Bed</li>
                                                <li><i className="flaticon-swimmer"></i> Swimming Pool</li>
                                                <li><i className="flaticon-bath"></i> 2 Bathroom</li>
                                                <li><i className="flaticon-car-repair"></i> Garage</li>
                                                <li><i className="flaticon-parking"></i> Parking</li>
                                                <li><i className="flaticon-theatre-masks"></i> Home Theater</li>
                                                <li><i className="flaticon-old-typical-phone"></i> Telephone</li>
                                                <li><i className="flaticon-green-park-city-space"></i> Private space
                                                </li>
                                            </ul>
                                        </section>
                                        <section>
                                            <h3>Overview</h3>
                                            <ul className="bullets bullets2">
                                                <li> Area</li>
                                                <li>Condition</li>
                                                <li>2 Year</li>
                                                <li>Price</li>
                                                <li>2500 Sq Ft:3400</li>
                                                <li>New</li>
                                                <li>2018</li>
                                                <li>$178,000</li>
                                            </ul>
                                        </section>
                                        <div className="ratings-2">
                                            <span className="ratings-box">4.5/5</span>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o"></i>
                                            <span>( 7 Reviews )</span>
                                        </div>
                                        <a href="properties-details.html" className="btn btn-show btn-theme">Show
                                            Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Off-canvas sidebar */}
            <div className="off-canvas-sidebar">
                <div className="off-canvas-sidebar-wrapper">
                    <div className="off-canvas-header">
                        <a className="close-offcanvas" href="#"><span className="fa fa-times"></span></a>
                    </div>
                    <div className="off-canvas-content">
                        <aside className="canvas-widget">
                            <div className="logo-sitebar text-center">
                                <img src="assets/img/logos/black.png" alt="logo"/>
                            </div>
                        </aside>
                        <aside className="canvas-widget">
                            <ul className="menu">
                                <li className="menu-item menu-item-has-children"><a href="/">Home</a></li>
                                <li className="menu-item"><a href="properties-grid-leftside.html">Properties List</a>
                                </li>
                                <li className="menu-item"><a href="properties-details.html">Property Detail</a></li>
                                <li className="menu-item"><a href="blog-single-sidebar-right.html">Blog</a></li>
                                <li className="menu-item"><a href="about.html">About US</a></li>
                                <li className="menu-item"><a href="contact-3.html">Contact US</a></li>
                            </ul>
                        </aside>
                        <aside className="canvas-widget">
                            <ul className="social-icons">
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fa fa-vk"></i></a></li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;