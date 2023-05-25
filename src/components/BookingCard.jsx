import React, {useState} from 'react';
import {FaStar} from "react-icons/fa";
import "../styles/Tab1.css";
import "../styles/SinglePage.css"
import {useParams} from "react-router-dom";
import CalendarFunc from "./Calendar";

function BookingCard(props) {

    const [buttonOpen, setButtonOpen] = useState(false);
    const [buttonClose, setButtonClose] = useState(true);

    const params = useParams();
    const {id} = params;

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

    return (
        <div>
            <div className='side-box-card absolute'>
                <p className='single-page-price font-semibold text-2xl'> Giá tiền </p>

                <p className='rev-card absolute'>đánh giá</p>
                <p className='rev2-card font-semibold'>
                    <p>lượt thuê</p>
                </p>

            </div>

            <div className='reserve-date-button-holder'>
                <button className='reserve-date-button rounded-xl' onClick={buttonOpenHandler}>Đặt trước</button>

            </div>


            <div className="s">
                <CalendarFunc placesId={id}  buttonopenState={buttonOpen}
                              buttonCloseState={buttonClose} closeFunc={buttonCloseHandler}/>
            </div>

            <div className='line-total text-gray-300'>_____________________________________________________</div>

            <div className='price-total-text absolute font-semibold text-xl uppercase'>Total</div>

            <p className='price-total absolute font-semibold text-xl'>Calculated At Checkout</p>
        </div>
    );
}

export default BookingCard;