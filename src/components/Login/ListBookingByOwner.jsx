import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";


export default function ListBookingByOwner(props) {
    const userId = props.user;
    const [booking, setBooking] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const visiblePages = totalPages + 1;
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingHomeId, setDeletingHomeId] = useState(null);
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
                const response = await axios.get(`http://localhost:8080/${userId.id}/booking?page=${currentPage}`);
                const {totalPages} = response.data;
                setBooking(response.data.content);
                setTotalPages(totalPages);
            } catch (error) {
                toast.success(error);
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
        booking.length > 0 ? (
            <div>
                <div>
                    {booking.map((bookings, index) => (
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="my-properties">
                                <table className="manage-table" key={index}>
                                    <tbody className="responsive-table">
                                    <tr>
                                        <td className="listing-photoo">
                                            <img alt="my-properties" src={bookings.users.avatar}
                                                 height={125}/>
                                        </td>
                                        <td className="title-container">
                                            <h5><a href="#">Khách hàng: {bookings.users.name}</a></h5>
                                            <p><h6>SĐT: {bookings.users.phoneNumber}</h6></p>
                                            <p><h6>Tên nhà: {bookings.homes.name}</h6></p>

                                        </td>
                                        <td className="date">
                                            <h6><span style={{color:"blue"}}>check in:</span></h6>
                                            <h6><span>{bookings.checkin}</span></h6>
                                            <p><h6><span style={{color:"red"}}>check out</span></h6></p>
                                            <p><h6>{bookings.checkout}</h6></p>
                                        </td>
                                        <td className="action">
                                            <ul>
                                                <li>
                                                    {/*<Button style={{width: '90%'}}*/}
                                                    {/*        onClick={() => deleteHome(bookings.id)}><i*/}
                                                    {/*    className="fa fa-trash"></i>&nbsp;&nbsp;Xóa</Button>*/}
                                                </li>

                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

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

        ) : (
            <div className="featured-properties content-area-19">
                <div className="container">
                    <div className="main-title">
                        <h1>Danh sách trống</h1>
                    </div>
                </div>
            </div>
        )
    );
}