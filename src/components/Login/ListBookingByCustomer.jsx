import {useState} from "react";
import {Button} from "antd";
import BookingsOfCustomer from "./BookingsOfCustomer";
import CancelRequestOfCustomer from "./CancelRequestOfCustomer";
import RentalOfCustomer from "./RentalOfCustomer";

export default function ListBookingByCustomer(props) {
    const user= props.user;
    const [showCancelRequest, setShowCancelRequest] = useState(false);
    const [showCheckedCustomer, setShowCheckedCustomer] = useState(false);
    const [bookingNow, setBookingNow] = useState(true);
    const [activeButton, setActiveButton] = useState('bookingNow');

    const handCancelRequest = () => {
        setShowCancelRequest(true);
        setShowCheckedCustomer(false);
        setBookingNow(false)
        setActiveButton('cancelRequest');
    }
    const handleCheckedCustomer = () => {
        setShowCancelRequest(false);
        setShowCheckedCustomer(true);
        setBookingNow(false)
        setActiveButton('rentalHistory');
    }

    const handleShowBookingNow = () => {
        setShowCancelRequest(false);
        setShowCheckedCustomer(false);
        setBookingNow(true);
        setActiveButton('bookingNow');
    };

    return (
        <div>
            <table>
                <tr style={{border:'1px solid black'}}>
                    <td>
                        <Button style={{border:'none'}} onClick={handleShowBookingNow}
                                className={activeButton === "bookingNow" ? 'active' : ''}>
                            Homestay đang thuê
                        </Button>
                    </td>
                    <td>
                        <Button style={{border:'none'}} onClick={handleCheckedCustomer}
                                className={activeButton === "rentalHistory" ? 'active' : ''}>
                            Lịch sử thuê
                        </Button>
                    </td>
                    <td>
                        <Button style={{border:'none'}} onClick={handCancelRequest}
                                className={activeButton === "cancelRequest" ? 'active' : ''}>
                            Đơn đã hủy
                        </Button>
                    </td>
                </tr>
            </table>
            <div>
                <div>
                    <div>
                        {showCancelRequest ? (
                            <div>
                                <CancelRequestOfCustomer user={user}/>
                            </div>
                        ) : null}
                        {showCheckedCustomer ? (
                            <div>
                                <RentalOfCustomer user={user}/>
                            </div>
                        ) : null}
                        {bookingNow ? (
                            <div>
                                <BookingsOfCustomer user={user}/>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}