import React, {useEffect, useState} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';
import {differenceInDays, format, parseISO} from 'date-fns'
import "../styles/SinglePageMiddle.css"
import axios from "axios";
import {useParams} from "react-router-dom";

const CalendarFunc = (props) => {
    const {id} = useParams();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [bookingCheckin, setBookingCheckin] = useState([]);
    const [bookingCheckout, setBookingCheckout] = useState([]);
    const [booking, setBooking] = useState([])
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const getBooking = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/bookings/home/${id}`);
                setBooking(res.data)
                setBookingCheckin(res.data.map(booking => booking.checkin)); // Lưu các giá trị checkin vào mảng checkinDate
                setBookingCheckout(res.data.map(booking => booking.checkout)); // Lưu các giá trị checkin vào mảng checkinDate
            } catch (error) {
                console.log(error.message);
            }
        };
        getBooking();
    }, [id, check]);

    let disabledDates = bookingCheckin.slice(0, bookingCheckout.length)
        .map((checkin, index) => (
            {startDate: checkin, endDate: bookingCheckout[index]})
        );

    if (disabledDates.length === 0) {
        disabledDates = [{startDate: new Date(), endDate: new Date()}]
    }
    console.log("should be disable date ", disabledDates)
    const handleSelect = (ranges) => {
        const selectedStartDate = (ranges.selection.startDate);
        const selectedEndDate = (ranges.selection.endDate);

        // gắn cờ cho 2 biến để so sánh, chuyển date => string
        const startDate = (format(selectedStartDate, 'yyyy-MM-dd'));
        const endDate = (format(selectedEndDate, 'yyyy-MM-dd'));

        const flag = {startDate, endDate};
        setCheck(!check);
        // Kiểm tra tính trùng lặp

        (disabledDates.map((date) => {
                if (date.startDate.toString() === flag.startDate || date.endDate.toString() === flag.endDate) {
                    alert("Ngày bạn vừa chọn đã có người booking trong khoảng thời gian từ " + date.startDate +
                        " đến " + date.endDate + ". Mời chọn lại ngày khác");

                } else {
                    setStartDate(selectedStartDate);
                    setEndDate(selectedEndDate);
                }
            })
        )
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }

    var daysCheck = (differenceInDays(endDate, startDate));


    useEffect(() => {
        props.onDataChanged(daysCheck, startDate, endDate);
    })

    return (
        <div className='calendarHolder calendarHolder2'>
            {props.buttonopenState &&
                <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#FD5B61"]}
                    onChange={handleSelect}
                />}
            {props.buttonopenState &&
                <button className='close-cal rounded-xl' onClick={props.closeFunc}>Đóng lịch</button>}

            {daysCheck === 0 ? <p className={daysCheck === 0 ? "days-0" : "days-updated"}></p> :
                <p className='days-updated'>Tổng số ngày đã chọn là {daysCheck} ngày</p>}
        </div>)

}

export default CalendarFunc

