import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Field} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {differenceInDays, format} from "date-fns";


function BookingsOfCustomer(props) {
    const userId = props.user;
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const visiblePages = totalPages+1;
    const [bookings, setBookings] = useState([]);
    const [isCheckinDay, setIsCheckinDay] = useState(true);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                        {i +1}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };
    const checkinButton = async (bookingId) => {
        const response = await axios.get(`http://localhost:8080/customer/bookings/view/${bookingId}`);
        const newBooking = response.data;
        const checkIn = format(new Date(newBooking.checkin), 'dd/M/yyyy');
        const currentDate = new Date().toLocaleDateString();
        console.log("current date",currentDate);
        console.log("check in",checkIn);

        if (checkIn === currentDate){
            setIsCheckinDay(false);
            console.log(isCheckinDay);
        } else {
            console.log("khong the check-in");
        }
    };

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/customer/bookings/${userId.id}?page=${currentPage}`);
                const { totalPages } = response.data;
                setBookings(response.data.content);
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

    return (
        bookings.length > 0 ? (
            <div>
                <div>
                    {bookings.map((booking, index) => (
                        <div className="col-lg-12 col-md-12 col-sm-12" >
                            <div className="my-properties">
                                <table className="manage-table"key={index}>
                                    <tbody className="responsive-table">
                                    <tr>
                                        <td className="listing-photoo">
                                            <img alt="my-properties" src={booking.homes.image[0]}
                                                 height={100}/>
                                        </td>
                                        <td className="title-container">
                                            <h5><a href="#">{booking.homes.name}</a></h5>
                                            <h6><span>{booking.totalPrice}</span> VNĐ/Ngày</h6>
                                            <p><i
                                                className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
                                                {booking.homes.address} </p>
                                        </td>
                                        <td className="date">
                                            {booking.checkin}
                                        </td>
                                        <td className="date">
                                            {booking.checkout}
                                        </td>
                                        <td>
                                        <th><button onClick={() => checkinButton(booking.id)} disabled={!isCheckinDay} className="">Check-in</button></th>
                                        {/*<th><button onClick={() => checkinButton(booking.id)} className="">Check-in</button></th>*/}
                                        {/*<th><button onClick={() => CheckinButton(booking.id)} className="delete">Hủy phòng</button></th>*/}
                                        {/*<th><button onClick={() => CheckinButton(booking.id)} className="delete">Check-out</button></th>*/}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{border:"none", cursor:"pointer"}}
                            onClick={goToPreviousPage}
                            disabled={currentPage === 0}
                    >
                        <i style={{fontSize:25}} className="fa fa-angle-left"></i>
                    </button>
                    {/*<span>{currentPage + 1}</span> / <span>{totalPages}</span>*/}
                    {renderPagination()}
                    <button style={{border:"none", cursor:"pointer"}}
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages - 1}
                    >
                        <i style={{fontSize:25}} className="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>

        ) : (
            <div className="featured-properties content-area-19">
                <div className="container">
                    <div className="main-title">
                        <h1>Trống</h1>
                    </div>
                </div>
            </div>
        )
    );
}

export default BookingsOfCustomer;