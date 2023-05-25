import React, {useEffect, useState} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';
import {differenceInDays} from 'date-fns'
import {Link} from 'react-router-dom';
import "../styles/SinglePageMiddle.css"

const CalendarFunc = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const data = daysCheck;

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate)
    }
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }


    var daysCheck = differenceInDays(endDate, startDate);
    useEffect(()=>{
        props.onDataChanged(daysCheck);
    })

    return (
        <div className='calendarHolder calendarHolder2'>

            {props.buttonopenState &&
                <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={["#FD5B61"]}
                                 onChange={handleSelect}/>}

            {props.buttonopenState &&
                <button className='close-cal rounded-xl' onClick={props.closeFunc}>Đóng lịch</button>}

            {daysCheck === 0 ? <p className={daysCheck === 0 ? "days-0" : "days-updated"}></p> :
                <p className='days-updated'>Tổng số ngày đã chọn là {daysCheck} ngày</p>}

            {daysCheck === 0 ? "" :
                <Link to={"/coming-soon"} state={{data: data}}>
                    <button className={props.buttonCloseState === false ? "checkout-btn-after" : "checkout-btn"}>Thanh toán
                    </button>
                </Link>}
        </div>)
}

export default CalendarFunc

