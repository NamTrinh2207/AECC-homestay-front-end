import React, {useEffect, useState} from 'react';
import "../styles/Tab1.css";
import "../styles/SinglePage.css"
import {Link, useParams} from "react-router-dom";
import CalendarFunc from "./Calendar";
import axios from "axios";
import Swal from "sweetalert2";
import {Form, Formik} from "formik";
import io from "socket.io-client";
import './booking.css'

const socket = io.connect("http://localhost:3001");

function BookingCard(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [buttonOpen, setButtonOpen] = useState(false);
    const [buttonClose, setButtonClose] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isValid, setValid] = useState();
    const {id} = useParams();
    const [transferDate, setTransferDate] = useState('')
    const homeStatus = props.homeStatus;
    const [room, setRoom] = useState('1');
    const currentDate = new Date();
    const [customerId, setCustomerId] = useState("");
    const [count, setCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const Send = async () => {
        try {
            if (user != null) { // Kiểm tra cả user và room
                const updatedMessage = {
                    text: "thuê",
                    name: user.name,
                    avatar: user.avatar,
                    uId: user.id,
                    time: currentDate
                };

                socket.emit("send_message", {message: updatedMessage, room});

                // Gửi thành công
            }
        } catch (error) {
            // Xử lý lỗi nếu có
        }
    };
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/customer/bookings/count/${id}`
                );
                setCount(res.data);
            } catch (error) {
                console.error(error.message);
                // Handle error, show error message, etc.
            }
        };
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/review/get-review/${id}`
                );
                setReviews(response.data);
            } catch (error) {
                console.error(error.message);
                // Handle error, show error message, etc.
            }
        };

        setTimeout(() => {
            fetchCount();
            fetchReviews();
        }, 1000);
    },[])

    const buttonOpenHandler = (event) => {
        event.preventDefault();
        setButtonOpen(true)
        setButtonClose(false)
    }
    const buttonCloseHandler = (event) => {
        event.preventDefault();
        setButtonClose(false);
        setButtonOpen(false)

    };
    const handleDiffDate = (newData, startDate, endDate, transferValid) => {
        setTransferDate(newData);
        setStartDate(startDate);
        setEndDate(endDate);
        setValid(transferValid);
    };
    const avgRating = props.avgRating;
    // lấy id người dùng và id của nhà, giá tiền của nhà.
    const price = transferDate * props.price;
    if (user != null) {
        var userId = user.id;
        var homeId = props.homeId;
        return (
            <div>
                <div className='side-box-card absolute'>
                    <div>
                        <span
                            style={
                                {fontSize: `20px`}
                            }>Giá phòng: {props.price >= 10000 ? props.price.toLocaleString() : props.price} VNĐ
                        </span>
                        <span
                            className={"numberOfRent"}>{count} lượt thuê
                        </span>
                    </div>

                    {
                        <div className='rev-card absolute'>
                            {reviews.length !== 0 ? <div>
                                <span style={{fontSize: '20px'}}>
                                Đánh giá: {[...Array(avgRating)].map((_, index) => (
                                    <i className="fa fa-star" style={{color: "orange"}} key={index}></i>))}
                                </span>
                                </div> :
                                <div>
                                    <span><i className="fa fa-star" style={{color: "orange"}}></i>Mới</span>
                                </div>}
                        </div>
                    }
                </div>
                {transferDate === 0 ?
                    <div className='reserve-date-button-holder'>
                        <button className={'reserve-date-button rounded-xl'}
                                onClick={buttonOpenHandler}>Chọn ngày
                        </button>
                    </div> :
                    <div className='reserve-date-button-holder'>
                        <button className={'reserve-date-button rounded-xl'}
                                onClick={buttonOpenHandler}>Chọn lại ngày
                        </button>
                    </div>
                }

                <div className="s">
                    <CalendarFunc placesId={id}
                                  buttonopenState={buttonOpen}
                                  buttonCloseState={buttonClose}
                                  closeFunc={buttonCloseHandler}
                                  onDataChanged={handleDiffDate}
                    />
                </div>

                <div className='line-total text-gray-300'>________________________________________________</div>

                <div className='price-total-text absolute font-semibold text-xl uppercase'>
                    Tổng phải thanh toán: {price.toLocaleString()} VNĐ
                </div>
                <Formik
                    initialValues={{
                        checkin: startDate,
                        checkout: endDate,
                        totalPrice: price,
                        paid: false,
                        users: {
                            id: userId
                        },
                        homes: {
                            id: homeId
                        },
                        statusB: true,
                        checkinB: false,
                        checkoutB: false,
                    }}
                    onSubmit={(values) => {
                        newBooking(values)
                    }}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <>
                            <Form onSubmit={formik.handleSubmit}>
                                <input type="hidden" name={"checkin"}/>
                                <input type="hidden" name={"checkout"}/>
                                <input type="hidden" name={"totalPrice"}/>
                                <input type="hidden" name={"isPaid"}/>
                                <input type="hidden" name={"users.id"}/>
                                <input type="hidden" name={"homes.id"}/>
                                {isValid === false ? "" :
                                    <button type={"submit"} className={"checkout-btn"}>Xác nhận</button>
                                }
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        );
    } else {
        return (
            <>
                <div className='side-box-card absolute'>
                    <div>
                        <span
                            style={
                                {fontSize: `20px`}
                            }>Giá phòng: {props.price >= 10000 ? props.price.toLocaleString() : props.price} VNĐ
                        </span>
                        <span
                            className={"numberOfRent"}>{count} lượt thuê
                        </span>
                    </div>

                    {
                        <div className='rev-card absolute'>
                            {reviews.length !== null ? <div>
                                <span style={{fontSize: '20px'}}>
                                Đánh giá: {[...Array(avgRating)].map((_, index) => (
                                    <i className="fa fa-star" style={{color: "orange"}} key={index}></i>))}
                                </span>
                                </div> :
                                <div>
                                    <span><i className="fa fa-star" style={{color: "orange"}}></i>Mới</span>
                                </div>}
                        </div>
                    }
                    <br/>
                    <span style={{fontSize: `16px`}}> Mời bạn đăng nhập để có thể đặt thuê nhà này.</span>
                </div>
            </>
        )
    }

    function newBooking(data) {
        axios.post('http://localhost:8080/customer/bookings/create', data)
            .then(() => {
                Send();
                Swal.fire({
                    title: 'Thành công',
                    text: 'Đặt lịch thành công !',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = ("/")
                });
            })
            .catch((error) => {
                console.log(error);
                console.log(" data nay la ", data)

                Swal.fire({
                    title: 'Đã xảy ra lỗi',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

}

export default BookingCard;