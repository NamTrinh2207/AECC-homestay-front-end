import React, {useState} from 'react';
import "../styles/Tab1.css";
import "../styles/SinglePage.css"
import {useParams} from "react-router-dom";
import CalendarFunc from "./Calendar";

function BookingCard(props) {

    const [buttonOpen, setButtonOpen] = useState(false);
    const [buttonClose, setButtonClose] = useState(true);

    const params = useParams();
    const {id} = params;

    const [transferDate, setTransferDate] = useState('')


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
    const handleDiffDate = (newData) => {
        setTransferDate(newData);
    }
    console.log("day", transferDate);
    var price = transferDate * (props.price);
    console.log("price ",price)
    return (
        <div>
            <div className='side-box-card absolute'>
                <div>
                    <span style={
                        {fontSize: `20px`}
                    }>Giá phòng: {props.price} VNĐ</span>
                    <span
                        className={"numberOfRent"}>{Math.floor(Math.random() * (999 - 100 + 1) + 100)} lượt thuê</span>
                </div>

                <div className='rev-card absolute'>
                    <span style={
                        {fontSize: '20px'}
                    }>Đánh giá: </span> {[...Array(props.rating)].map((_, index) => (
                    <i className="fa fa-star" style={{color: "orange"}} key={index}></i>))}
                </div>


            </div>

            <div className='reserve-date-button-holder'>
                <button className='reserve-date-button rounded-xl' onClick={buttonOpenHandler}>Đặt trước</button>

            </div>


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
                Tổng phải thanh toán: {price} VNĐ
            </div>
        </div>
    );
}

export default BookingCard;