import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {Button} from "antd";
import Swal from "sweetalert2";


export default function ListBookingByOwner(props) {
    const userId = props.user;
    const [booking, setBooking] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const [isPaidFilter, setIsPaidFilter] = useState(false);
    const visiblePages = totalPages + 1;
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/${userId.id}/booking?page=${currentPage}&isPaid=${isPaidFilter}`);
            const {totalPages} = response.data;
            setBooking(response.data.content);
            setTotalPages(totalPages);
        } catch (error) {
            toast.success(error);
        }
    };
    useEffect(() => {
        setCurrentPage(0); // Reset trang về trang đầu tiên khi thay đổi bộ lọc
    }, [isPaidFilter]);

    useEffect(() => {
        fetchData();
    }, [check, currentPage, isPaidFilter]);

    const deleteBooking = async (bookingId, checkinDate) => {

        const timeDiff = new Date(checkinDate) - new Date();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        if (timeDiff <= oneDayInMs) {
            await Swal.fire({
                title: 'Không thể hủy !',
                text: 'Không thể hủy đặt phòng vì thời gian checkin của khách còn ít hơn 1 ngày',
                icon: 'warning'
            });
            return;
        }

        const confirmed = await Swal.fire({
            title: 'Bạn chắc chắn muốn hủy đơn?',
            text: 'Sẽ không được hoàn tác nếu bạn xác nhận hủy',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Hủy',
            cancelButtonText: 'Thoát'
        }).then((result) => result.isConfirmed);

        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8080/bookings/delete/${bookingId}`);
                await Swal.fire(
                    'Đã hủy!',
                    'Đơn đặt phòng đã được hủy thành công',
                    'success',
                );
                await fetchData();
            } catch (error) {
                await Swal.fire({
                    title: 'Đã xảy ra sự cố',
                    text: "Không thể hủy vì đang có người thuê !",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

    const goToPreviousPage = () => {
        setCheck(!check);
        setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };


    return (
        <div>
            <div>
                <Button onClick={() => setIsPaidFilter(false)}>Khách hàng đặt phòng</Button>
                <Button onClick={() => setIsPaidFilter(true)}>Xem lại lịch sử</Button>
            </div>
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
                                    <td>
                                        <h6><span style={{color: "blue"}}>check in:</span> {bookings.checkin}</h6>
                                        <p><h6><span style={{color: "red"}}>check out:</span> {bookings.checkout}
                                        </h6></p>
                                        <p><h6><span>Tổng tiền:</span> {bookings.totalPrice}</h6></p>
                                    </td>
                                    <td className="action">
                                        <ul>
                                            {isPaidFilter === false && (
                                                <li>
                                                    <Button style={{width: '100%'}}
                                                            onClick={() => deleteBooking(bookings.id, bookings.checkin)}>
                                                        <i className="fa fa-trash"></i>&nbsp;&nbsp;Hủy đơn
                                                    </Button>
                                                </li>
                                            )}
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
                &nbsp;
                {renderPagination()}
                <button style={{border: "none", cursor: "pointer"}}
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages - 1}
                >
                    <i style={{fontSize: 25}} className="fa fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
}

