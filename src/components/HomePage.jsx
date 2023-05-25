import TopHeader from "./header/TopHeader";
import MainHeader from "./header/MainHeader";
import Footer from "./footer/Footer";
import Recent from "./recent";
import ListHomestay from "./ListHomestay";
import Search from "./Search";
import React from "react";


function HomePage(props) {

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
                <div id="particles-banner-2"></div>
                <div className="search-area sa-show-2" id="search-area-4">
                    <Search/>
                </div>
                {/* Search area end */}
            </div>
            {/*List homestay*/}
            <ListHomestay/>

            {/* Featured properties end */}

            {/*Recent hear*/}
            <Recent/>
            {/*Recent hear end*/}


            {/* Footer start */}
            <Footer/>
            {/* Footer end */}

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