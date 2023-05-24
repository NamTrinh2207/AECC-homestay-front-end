import React, {useEffect, useState} from 'react';
import TopHeader from "./header/TopHeader";
import Footer from "./footer/Footer";
import {useParams} from "react-router-dom";
import axios from "axios";

function HotelDetails(props) {
    const {id} = useParams();
    const [home, setHome] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:8080/homes/${id}`)
            .then((response) => {
                setHome(response.data)
            })
            .catch(() => {
                alert("Không tìm thấy homestay")
            })
    }, [])

    const slideshowProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
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
        <>
            {/* Top header start */}
            <TopHeader/>
            {/* Top header end */}

            {/* main header start */}
            <header className="main-header sticky-header" id="main-header-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-light rounded">
                                <a className="navbar-brand logo" href="/">
                                    <img src="assets/img/logos/black-logo.png" alt="logo"/>
                                </a>
                                <button className="navbar-toggler" type="button" id="drawer">
                                    <span className="fa fa-bars"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbar">
                                    <ul className="navbar-nav justify-content-end ml-auto">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Index
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li><a className="dropdown-item" href="/">Index 1</a></li>
                                                <li><a className="dropdown-item" href="index-2.html">Index 2</a></li>
                                                <li><a className="dropdown-item" href="index-3.html">Index 3</a></li>
                                                <li><a className="dropdown-item" href="index-4.html">Index 4</a></li>
                                                <li><a className="dropdown-item" href="index-5.html">Index 5</a></li>
                                                <li><a className="dropdown-item" href="index-6.html">Index 6</a></li>
                                                <li><a className="dropdown-item" href="index-7.html">Index 7</a></li>
                                                <li><a className="dropdown-item" href="index-8.html">Index 8 (Map)</a></li>
                                                <li><a className="dropdown-item" href="index-9.html">Index 9 (Video)</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown active">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Properties
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">List
                                                    Layout</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="properties-list-rightside.html">Right
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="properties-list-leftside.html">Left
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item"
                                                               href="properties-list-fullwidth.html">Fullwidth</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Grid
                                                    Layout</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="properties-grid-rightside.html">Right
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="properties-grid-leftside.html">Left
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item"
                                                               href="properties-grid-fullwidth.html">Fullwidth</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Map
                                                    View</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="properties-map-rightside-list.html">Map
                                                            List Right Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="properties-map-leftside-list.html">Map
                                                            List Left Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="properties-map-rightside-grid.html">Map
                                                            Grid Right Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="properties-map-leftside-grid.html">Map
                                                            Grid Left Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="properties-map-full.html">Map
                                                            FullWidth</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Property
                                                    Detail</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="properties-details.html">Property Detail
                                                            1</a></li>
                                                        <li><a className="dropdown-item" href="properties-details-2.html">Property
                                                            Detail 2</a></li>
                                                        <li><a className="dropdown-item" href="properties-details-3.html">Property
                                                            Detail 3</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink7"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Pages
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">My
                                                    Account</a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <a className="dropdown-item" href="user-profile.html">User profile</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="my-properties.html">My Properties</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="favorited-properties.html">Favorited
                                                                Properties</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="submit-property.html">Submit Property</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle"
                                                                                href="#">About</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="about.html">About Us</a></li>
                                                        <li><a className="dropdown-item" href="about-me.html">About Me</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Services</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="services.html">Services 1</a></li>
                                                        <li><a className="dropdown-item" href="services-2.html">Services 2</a></li>
                                                        <li><a className="dropdown-item" href="services-details.html">Services
                                                            Details</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Pricing
                                                    Tables</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="pricing-tables-1.html">Pricing Tables
                                                            1</a></li>
                                                        <li><a className="dropdown-item" href="pricing-tables-2.html">Pricing Tables
                                                            2</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Gallery</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="gallery-1.html">Gallery 1</a></li>
                                                        <li><a className="dropdown-item" href="gallery-2.html">Gallery 2</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle"
                                                                                href="#">Faq</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="faq-1.html">Faq 1</a></li>
                                                        <li><a className="dropdown-item" href="faq-2.html">Faq 2</a></li>
                                                    </ul>
                                                </li>

                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Typography</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="typography.html">Typography 1</a></li>
                                                        <li><a className="dropdown-item" href="typography-2.html">Typography 2</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">404
                                                    Error</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="pages-404.html">404 Error 1</a></li>
                                                        <li><a className="dropdown-item" href="pages-404-2.html">404 Error 2</a></li>
                                                    </ul>
                                                </li>

                                                <li><a className="dropdown-item" href="properties-comparison.html">Properties
                                                    Comparison</a></li>
                                                <li><a className="dropdown-item" href="search-brand.html">Search Brand</a></li>
                                                <li><a className="dropdown-item" href="elements.html">Elements</a></li>
                                                <li><a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
                                                <li><a className="dropdown-item" href="login.html">Login/Register</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink6"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Agents
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Agent
                                                    List</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="agent-list.html">Agent List 1</a></li>
                                                        <li><a className="dropdown-item" href="agent-list-2.html">Agent List 2</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Agent
                                                    Grid</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="agent-grid.html">Agent Grid 1</a></li>
                                                        <li><a className="dropdown-item" href="agent-grid-2.html">Agent Grid 2</a></li>
                                                        <li><a className="dropdown-item" href="agent-grid-3.html">Agent Grid 3</a></li>
                                                    </ul>
                                                </li>
                                                <li><a className="dropdown-item" href="agent-detail.html">Agent Detail</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink5"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Blog
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Columns</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="blog-columns-2col.html">2 Columns</a>
                                                        </li>
                                                        <li><a className="dropdown-item" href="blog-columns-3col.html">3 Columns</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">classNameic</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="blog-classNameic-sidebar-right.html">Right
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="blog-classNameic-sidebar-left.html">Left
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item"
                                                               href="blog-classNameic-fullwidth.html">FullWidth</a></li>
                                                    </ul>
                                                </li>
                                                <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Blog
                                                    Details</a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="blog-single-sidebar-right.html">Right
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="blog-single-sidebar-left.html">Left
                                                            Sidebar</a></li>
                                                        <li><a className="dropdown-item" href="blog-single-fullwidth.html">Fullwidth</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown4" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Shop
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown3">
                                                <a className="dropdown-item" href="shop-list.html">Shop List</a>
                                                <a className="dropdown-item" href="shop-cart.html">Shop Cart</a>
                                                <a className="dropdown-item" href="shop-checkout.html">Shop Checkout</a>
                                                <a className="dropdown-item" href="shop-single.html">Shop Details</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Contact
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown3">
                                                <a className="dropdown-item" href="contact-1.html">Contact 1</a>
                                                <a className="dropdown-item" href="contact-2.html">Contact 2</a>
                                                <a className="dropdown-item" href="contact-3.html">Contact 3</a>
                                            </div>
                                        </li>
                                        <li className="nav-item sb2">
                                            <a href="submit-property.html" className="submit-btn">
                                                Submit Property
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* main header end */}

            {/* Sidenav start */}
            <nav id="sidebar" className="nav-sidebar">
                {/* Close btn*/}
                <div id="dismiss">
                    <i className="fa fa-close"></i>
                </div>
                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <img src="assets/img/logos/black-logo.png" alt="sidebarlogo"/>
                    </div>
                    <div className="sidebar-navigation">
                        <h3 className="heading">Pages</h3>
                        <ul className="menu-list">
                            <li><a href="#" className="pt0">Index <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li><a href="/">Index 1</a></li>
                                    <li><a href="index-2.html">Index 2</a></li>
                                    <li><a href="index-3.html">Index 3</a></li>
                                    <li><a href="index-4.html">Index 4</a></li>
                                    <li><a href="index-5.html">Index 5</a></li>
                                    <li><a href="index-6.html">Index 6</a></li>
                                    <li><a href="index-7.html">Index 7</a></li>
                                    <li><a href="index-8.html">Index 8</a></li>
                                    <li><a href="index-9.html">Index 9</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="active">Properties <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">List Layout <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-list-rightside.html">Right Sidebar</a></li>
                                            <li><a href="properties-list-leftside.html">Left Sidebar</a></li>
                                            <li><a href="properties-list-fullwidth.html">Fullwidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Grid Layout <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-grid-rightside.html">Right Sidebar</a></li>
                                            <li><a href="properties-grid-leftside.html">Left Sidebar</a></li>
                                            <li><a href="properties-grid-fullwidth.html">Fullwidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Map View <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-map-rightside-list.html">Map List Right Sidebar</a></li>
                                            <li><a href="properties-map-leftside-list.html">Map List Left Sidebar</a></li>
                                            <li><a href="properties-map-rightside-grid.html">Map Grid Right Sidebar</a></li>
                                            <li><a href="properties-map-leftside-grid.html">Map Grid Left Sidebar</a></li>
                                            <li><a href="properties-map-full.html">Map FullWidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Property Detail <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="properties-details.html">Property Detail 1</a></li>
                                            <li><a href="properties-details-2.html">Property Detail 2</a></li>
                                            <li><a href="properties-details-3.html">Property Detail 3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Pages <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">My Account <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="user-profile.html">User profile</a></li>
                                            <li><a href="my-properties.html">My Properties</a></li>
                                            <li><a href="favorited-properties.html">Favorited Properties</a></li>
                                            <li><a href="submit-property.html">Submit Property</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">About <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="about.html">About Us</a></li>
                                            <li><a href="about-me.html">About Me</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Services <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="services.html">Services 1</a></li>
                                            <li><a href="services-2.html">Services 2</a></li>
                                            <li><a href="services-details.html">Services Details</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Pricing Tables <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="pricing-tables-1.html">Pricing Tables 1</a></li>
                                            <li><a href="pricing-tables-2.html">Pricing Tables 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Gallery <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="gallery-1.html">Gallery 1</a></li>
                                            <li><a href="gallery-2.html">Gallery 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Faq <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="faq-1.html">Faq 1</a></li>
                                            <li><a href="faq-2.html">Faq 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Typography <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="typography.html">Typography 1</a></li>
                                            <li><a href="typography-2.html">Typography 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">404 Error <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="pages-404.html">404 Error 1</a></li>
                                            <li><a href="pages-404-2.html">404 Error 2</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="properties-comparison.html">Properties Comparison</a></li>
                                    <li><a href="search-brand.html">Search Brand</a></li>
                                    <li><a href="elements.html">Elements</a></li>
                                    <li><a href="coming-soon.html">Coming Soon</a></li>
                                    <li><a href="login.html">Login/Register</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"> Agents <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">Agent List <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="agent-list.html">Agent List 1</a></li>
                                            <li><a href="agent-list-2.html">Agent List 2</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Agent Grid <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="agent-grid.html">Agent Grid 1</a></li>
                                            <li><a href="agent-grid-2.html">Agent Grid 2</a></li>
                                            <li><a href="agent-grid-3.html">Agent Grid 3</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="agent-detail.html">Agent Detail</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Blog <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li>
                                        <a href="#">Columns<em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="blog-columns-2col.html">2 Columns</a></li>
                                            <li><a href="blog-columns-3col.html">3 Columns</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">classNameic <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="blog-classNameic-sidebar-right.html">Right Sidebar</a></li>
                                            <li><a href="blog-classNameic-sidebar-left.html">Left Sidebar</a></li>
                                            <li><a href="blog-classNameic-fullwidth.html">FullWidth</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Blog Details <em className="fa fa-chevron-down"></em></a>
                                        <ul>
                                            <li><a href="blog-single-sidebar-right.html">Right Sidebar</a></li>
                                            <li><a href="blog-single-sidebar-left.html">Left Sidebar</a></li>
                                            <li><a href="blog-single-fullwidth.html">Fullwidth</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="#">Shop <em className="fa fa-chevron-down"></em></a>
                                <ul>

                                    <li><a className="dropdown-item" href="shop-list.html">Shop List</a></li>
                                    <li><a className="dropdown-item" href="shop-cart.html">Shop Cart</a></li>
                                    <li><a className="dropdown-item" href="shop-checkout.html">Shop Checkout</a></li>
                                    <li><a className="dropdown-item" href="shop-single.html">Shop Details</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Contact <em className="fa fa-chevron-down"></em></a>
                                <ul>
                                    <li><a className="dropdown-item" href="contact-1.html">Contact 1</a></li>
                                    <li><a className="dropdown-item" href="contact-2.html">Contact 2</a></li>
                                    <li><a className="dropdown-item" href="contact-3.html">Contact 3</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="submit-property.html">Submit Property</a>
                            </li>
                        </ul>
                    </div>
                    <div className="get-in-touch">
                        <h3 className="heading">Get in Touch</h3>
                        <div className="media">
                            <i className="fa fa-phone"></i>
                            <div className="media-body">
                                <a href="tel:0477-0477-8556-552">0477 8556 552</a>
                            </div>
                        </div>
                        <div className="media">
                            <i className="fa fa-envelope"></i>
                            <div className="media-body">
                                <a href="#">info@themevessel.com</a>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <i className="fa fa-fax"></i>
                            <div className="media-body">
                                <a href="#">info@themevessel.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="get-social">
                        <h3 className="heading">Get Social</h3>
                        <a href="#" className="facebook-bg">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="twitter-bg">
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#" className="google-bg">
                            <i className="fa fa-google"></i>
                        </a>
                        <a href="#" className="linkedin-bg">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </nav>
            {/* Sidenav end */}

            {/* Sub banner start */}
            <div className="sub-banner">
                <div className="container">
                    <div className="breadcrumb-area">
                        <h1>Property Detail</h1>
                        <ul className="breadcrumbs">
                            <li><a href="/">Home</a></li>
                            <li className="active">Property Detail</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Sub banner end */}

            {/* Properties details page start */}
            <div className="properties-details-page content-area-2" key={home?.id}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="propertiesDetailsSlider" className="carousel properties-details-sliders slide mb-60">
                                <div className="heading-properties-2">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="informeson">
                                                <h1>{home?.name}<span>{home?.priceByDay} VNĐ/Ngày</span></h1>
                                                <div>
                                                    <div className="float-left">
                                                        <ul className="clearfix">
                                                            <li><i className="flaticon-bed"></i> Phòng ngủ: {home?.bedroom}</li>
                                                            <li><i className="flaticon-bath"></i> Phòng tắm: {home?.bathroom}</li>
                                                            <li>
                                                                <i className="flaticon-square-layouting-with-black-square-in-east-area"></i>
                                                                Phân khúc: {home?.homeType.name}
                                                            </li>
                                                            <li><i className="flaticon-balcony-and-door"></i> Trạng thái: {getStatusLabel(home?.status)}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="float-right">
                                                        <p><span>Đánh giá: </span>{[...Array(home?.rating)].map((_, index) => (
                                                            <i className="fa fa-star" style={{color:"orange"}} ></i>))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* main slider carousel items */}
                                <div style={{overflow: "clip", position: "relative"}}>
                                    {home?.image.map((image, index) => (
                                        <div
                                            style={{width:"100vh"}}
                                            key={index}
                                            className={`item carousel-item ${index === 0 ? 'active' : ''}`}
                                            data-slide-number={index}
                                        >
                                            <img  style={{height:"600px"}} src={image} className="img-fluid" alt="properties-photo" />
                                        </div>
                                    ))}
                                </div>
                                {/* main slider carousel nav controls */}
                                <ul className="carousel-indicators sp-2 smail-properties list-inline nav nav-justified ">
                                    {home?.image.map((image, index) => (
                                        <li key={index} className={`list-inline-item ${index === 0 ? 'active' : ''}`}>
                                            <a
                                                id={`carousel-selector-${index}`}
                                                className={index === 0 ? 'selected' : ''}
                                                data-slide-to={index}
                                                data-target="#propertiesDetailsSlider"
                                            >
                                                <img style={{height:"150px"}} src={image} className="img-fluid" alt="properties-photo-smale" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12 slider">
                            {/* Search area start */}
                            <div className="widget-2 search-area advanced-search as-2">
                                <h5 className="sidebar-title">Advanced Search</h5>
                                <div className="search-area-inner">
                                    <div className="search-contents ">
                                        <form method="GET">
                                            <div className="form-group">
                                                <select className="selectpicker search-fields" name="area">
                                                    <option>Area From</option>
                                                    <option>1500</option>
                                                    <option>1200</option>
                                                    <option>900</option>
                                                    <option>600</option>
                                                    <option>300</option>
                                                    <option>100</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select className="selectpicker search-fields" name="Status">
                                                    <option>Property Status</option>
                                                    <option>For Sale</option>
                                                    <option>For Rent</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select className="selectpicker search-fields" name="Location">
                                                    <option>Location</option>
                                                    <option>United Kingdom</option>
                                                    <option>American Samoa</option>
                                                    <option>Belgium</option>
                                                    <option>Canada</option>
                                                    <option>Delaware</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select className="selectpicker search-fields" name="types">
                                                    <option>Property Types</option>
                                                    <option>Residential</option>
                                                    <option>Commercial</option>
                                                    <option>Land</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select className="selectpicker search-fields" name="bedrooms">
                                                    <option>Bedrooms</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                </select>
                                            </div>
                                            <div className="form-group mb-30">
                                                <select className="selectpicker search-fields" name="bedrooms">
                                                    <option>Bathrooms</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div>
                                            <div className="form-group clearfix">
                                                <label>Area</label>
                                                <div className="range-slider">
                                                    <div data-min="0" data-max="150000" data-unit="Sq ft" data-min-name="min_price"
                                                         data-max-name="max_price" className="range-slider-ui ui-slider"
                                                         aria-disabled="false"></div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <label>Price</label>
                                                <div className="range-slider">
                                                    <div data-min="0" data-max="150000" data-unit="USD" data-min-name="min_price"
                                                         data-max-name="max_price" className="range-slider-ui ui-slider"
                                                         aria-disabled="false"></div>
                                                    <div className="clearfix"></div>
                                                </div>
                                            </div>
                                            <button className="btn btn-4 btn-block">Search</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Property description start */}
                            <div className="property-description mb-60">
                                <h3 className="heading-3">Mô tả</h3>
                                <p>{home?.description}</p>
                            </div>
                            {/* Property details start */}
                            <div className="property-details mb-45">
                                <h3 className="heading-3">Thông tin chi tiết</h3>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <strong>Tên:</strong>{home?.name}
                                            </li>
                                            <li>
                                                <strong>Phân khúc:</strong>{home?.homeType.name}
                                            </li>
                                            <li>
                                                <strong>Giá thuê:</strong>{home?.priceByDay} VNĐ/Ngày
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <strong>Trạng thái:</strong>{getStatusLabel(home?.status)}
                                            </li>
                                            <li>
                                                <strong>Địa chỉ:</strong>{home?.address}
                                            </li>
                                            <li>
                                                <strong>Chủ nhà:</strong>{home?.users.name}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <strong>Liên lạc:</strong>{home?.users.phoneNumber}
                                            </li>
                                            <li>
                                                <strong>Email:</strong>{home?.users.email}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Amenities box start */}
                            <div className="amenities-box af mb-45">
                                <h3 className="heading-3">Tình trạng</h3>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li><span><i className="flaticon-draw-check-mark"></i> {home?.bedroom} Phòng ngủ</span></li>
                                            <li><span><i className="flaticon-draw-check-mark"></i> {home?.bathroom} Phòng tắm</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li><span><i className="flaticon-draw-check-mark"></i> 1 Garage</span></li>
                                            <li><span><i className="flaticon-draw-check-mark"></i> {home?.bedroom} Ban công</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Features opions start */}
                            <div className="features-opions af mb-45">
                                <h3 className="heading-3">Tiện ích bổ sung</h3>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Điều hòa
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Wifi
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Bể bơi
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Giường đôi
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Ban công
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Điện thoại
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Bảo vệ
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Khu vực đậu xe
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                TV
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Rạp chiếu phim mini
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <ul>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Chuông cửa
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Hòm thư
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Phòng tập Gym
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Bếp điện
                                            </li>
                                            <li>
                                                <i className="flaticon-draw-check-mark"></i>
                                                Không gian riêng tư
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Related properties start */}
                            <div className="related-properties hedin-mb-30">
                                <h3 className="heading-3">Related Properties</h3>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="property-box-7">
                                            <div className="property-thumbnail">
                                                <a href="properties-details.html" className="property-img">
                                                    <div className="tag-2">For Sale</div>
                                                    <div className="price-box"><span>$850.00</span> Per night</div>
                                                    <img src="assets/img/property/img-4.jpg" alt="property-box-7" className="img-fluid"/>
                                                </a>
                                            </div>
                                            <div className="detail">
                                                <h1 className="title">
                                                    <a href="properties-details.html">Real Luxury Villa</a>
                                                </h1>
                                                <div className="location">
                                                    <a href="properties-details.html">
                                                        <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>123
                                                        Kathal St. Tampa City,
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="facilities-list clearfix">
                                                <li>
                                                    <span>Area</span>3600 Sqft
                                                </li>
                                                <li>
                                                    <span>Beds</span> 3
                                                </li>
                                                <li>
                                                    <span>Baths</span> 2
                                                </li>
                                                <li>
                                                    <span>Garage</span> 1
                                                </li>
                                            </ul>
                                            <div className="footer clearfix">
                                                <div className="pull-left days">
                                                    <p><i className="fa fa-user"></i> Jhon Doe</p>
                                                </div>
                                                <ul className="pull-right">
                                                    <li><a href="#"><i className="flaticon-heart-shape-outline"></i></a></li>
                                                    <li><a href="#"><i className="flaticon-calendar"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="property-box-7">
                                            <div className="property-thumbnail">
                                                <a href="properties-details.html" className="property-img">
                                                    <div className="tag-2">For Rent</div>
                                                    <div className="price-box"><span>$850.00</span> Per night</div>
                                                    <img src="assets/img/property/img-5.jpg" alt="property-box-7" className="img-fluid"/>
                                                </a>
                                            </div>
                                            <div className="detail">
                                                <h1 className="title">
                                                    <a href="properties-details.html">Beautiful Single Home</a>
                                                </h1>
                                                <div className="location">
                                                    <a href="properties-details.html">
                                                        <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>123
                                                        Kathal St. Tampa City,
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="facilities-list clearfix">
                                                <li>
                                                    <span>Area</span>3600 Sqft
                                                </li>
                                                <li>
                                                    <span>Beds</span> 3
                                                </li>
                                                <li>
                                                    <span>Baths</span> 2
                                                </li>
                                                <li>
                                                    <span>Garage</span> 1
                                                </li>
                                            </ul>
                                            <div className="footer clearfix">
                                                <div className="pull-left days">
                                                    <p><i className="fa fa-user"></i> Jhon Doe</p>
                                                </div>
                                                <ul className="pull-right">
                                                    <li><a href="#"><i className="flaticon-heart-shape-outline"></i></a></li>
                                                    <li><a href="#"><i className="flaticon-calendar"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="sidebar mbl">
                                <div className="widget categories">
                                    <h1>chỗ này là đặt phòng, chọn ngày, giá tiền</h1>
                                </div>
                                {/* Recent posts start */}
                                <div className="widget recent-posts">
                                    <h5 className="sidebar-title">Recent Properties</h5>
                                    <div className="media mb-4">
                                        <a href="properties-details.html">
                                            <img src="assets/img/sub-property/sub-property.jpg" alt="sub-property"/>
                                        </a>
                                        <div className="media-body align-self-center">
                                            <h5>
                                                <a href="properties-details.html">Beautiful Single Home</a>
                                            </h5>
                                            <p>Feb 27, 2020 | $1045,000</p>
                                        </div>
                                    </div>
                                    <div className="media mb-4">
                                        <a href="properties-details.html">
                                            <img src="assets/img/sub-property/sub-property-2.jpg" alt="sub-property"/>
                                        </a>
                                        <div className="media-body align-self-center">
                                            <h5>
                                                <a href="properties-details.html">Sweet Family Home</a>
                                            </h5>
                                            <p>Mar 14, 2020 | $944,000</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <a href="properties-details.html">
                                            <img src="assets/img/sub-property/sub-property-3.jpg" alt="sub-property"/>
                                        </a>
                                        <div className="media-body align-self-center">
                                            <h5>
                                                <a href="properties-details.html">Real Luxury Villa</a>
                                            </h5>
                                            <p>Apr 14, 2020 | $1420,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Properties details page start */}

            {/* Footer start */}
            <Footer/>
            {/* Footer end */}

            {/* Property Video Modal */}
            <div className="modal property-modal fade" id="propertyModal" tabindex="-1" role="dialog"
                 aria-labelledby="propertyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="propertyModalLabel">
                                Find Your Dream Properties
                            </h5>
                            <p>
                                <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i> 123 Kathal St. Tampa City,
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
                                                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                                                    <iframe className="modalIframe" src="https://www.youtube.com/embed/V7IrnC9MISU"
                                                            allowfullscreen></iframe>
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/img/img-8.jpg" alt="Test ALT"/>
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/img/img-9.jpg" alt="Test ALT"/>
                                                </div>
                                            </div>
                                            <a className="control control-prev" href="#modalCarousel" role="button" data-slide="prev">
                                                <i className="fa fa-angle-left"></i>
                                            </a>
                                            <a className="control control-next" href="#modalCarousel" role="button" data-slide="next">
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
                                                <li><i className="flaticon-green-park-city-space"></i> Private space</li>
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
                                        <a href="properties-details.html" className="btn btn-show btn-theme">Show Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelDetails;