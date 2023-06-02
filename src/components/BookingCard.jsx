import React, {useState} from 'react';
import "../styles/Tab1.css";
import "../styles/SinglePage.css"
import {Link, useParams} from "react-router-dom";
import CalendarFunc from "./Calendar";
import axios from "axios";
import Swal from "sweetalert2";
import {Form, Formik} from "formik";

function BookingCard(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [buttonOpen, setButtonOpen] = useState(false);
    const [buttonClose, setButtonClose] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isValid, setValid] = useState();
    console.log("1", isValid);
    const params = useParams();
    const {id} = useParams();

    const [transferDate, setTransferDate] = useState('')
    const homeStatus = props.homeStatus;

    const buttonOpenHandler = (event) => {
        event.preventDefault();
        setButtonOpen(true)
        setButtonClose(false)
    }

    const buttonCloseHandler = (event) => {
        event.preventDefault();
        setButtonClose(false);
        setButtonOpen(false)

    }
    const handleDiffDate = (newData, startDate, endDate, transferValid) => {
        setTransferDate(newData);
        setStartDate(startDate);
        setEndDate(endDate);
        setValid(transferValid);
    }
    console.log("2", isValid)
    // lấy id người dùng và id của nhà, giá tiền của nhà.
    const price = transferDate * (props.price >=10000 ? props.price: props.price);
    if (user != null) {
        var userId = user.id;
        var homeId = props.homeId;
        return (
            <div>
                <div className='side-box-card absolute'>
                    <div>
                    <span style={
                        {fontSize: `20px`}
                    }>Giá phòng: {props.price >=10000 ? props.price.toLocaleString(): props.price} VNĐ</span>
                        <span
                            className={"numberOfRent"}>làm lại chỗ này</span>
                    </div>

                    <div className='rev-card absolute'>
                    <span style={
                        {fontSize: '20px'}
                    }>Đánh giá: </span> {[...Array(props.rating)].map((_, index) => (
                        <i className="fa fa-star" style={{color: "orange"}} key={index}></i>))}
                    </div>
                </div>
                {(transferDate === 0) ?
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
                        isPaid: false,
                        users: {
                            id: userId
                        },
                        homes: {
                            id: homeId
                        },
                        isCheckinB: false,
                        isCheckoutB: true,
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
                                { isValid === false ? "" :
                                    <button className={"checkout-btn"}>Xác nhận</button>
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
                    <span style={
                        {fontSize: `20px`}
                    }>Giá phòng: {props.price >=10000 ? props.price.toLocaleString(): props.price} VNĐ</span>
                        <span
                            className={"numberOfRent"}>{Math.floor(Math.random() * (999 - 100 + 1) + 100)} lượt thuê</span>
                    </div>

                    <div className='rev-card absolute'>
                    <span style={
                        {fontSize: '20px'}
                    }>Đánh giá: </span> {[...Array(props.rating)].map((_, index) => (
                        <i className="fa fa-star" style={{color: "orange"}} key={index}></i>))}
                    </div><br/>
                    <span style={{fontSize: `16px`}}> Mời bạn đăng nhập để có thể đặt thuê nhà này.</span>
                </div>
            </>
        )
    }



    function newBooking(data) {
        axios.post('http://localhost:8080/customer/bookings/create', data)
            .then(() => {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Đặt lịch thành công !',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch((error) => {
                console.log(error);
                console.log(data)
                Swal.fire({
                    title: 'Đã xảy ra lỗi',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

        axios.put(`http://localhost:8080/homes/after-booking/${id}`, data.homes.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            // params: {
            //     id: homeId
            // }
        })
            .then(() => {
                console.log("change")
            }).catch((err) => {
            console.error(err.message)
        })
    }

}

export default BookingCard;