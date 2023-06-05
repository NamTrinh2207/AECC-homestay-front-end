import {useState} from "react";
import {Button} from "antd";
import BookingsOfCustomer from "./BookingsOfCustomer";
import CancelRequestOfCustomer from "./CancelRequestOfCustomer";
import RentalOfCustomer from "./RentalOfCustomer";

export default function ListBookingByCustomer(props) {
    const user= props.user;
    const [showCancelRequest, setShowCancelRequest] = useState(false);
    const [showCheckedCustomer, setShowCheckedCustomer] = useState(false);
    const [showUncheckedCustomer, setShowUncheckedCustomer] = useState(true);
    const [activeButton, setActiveButton] = useState('bookingNow');

    const handCancelRequest = () => {
        setShowCancelRequest(true);
        setShowCheckedCustomer(false);
        setShowUncheckedCustomer(false)
        setActiveButton('cancelRequest');
    }
    const handleCheckedCustomer = () => {
        setShowCancelRequest(false);
        setShowCheckedCustomer(true);
        setShowUncheckedCustomer(false)
        setActiveButton('rentalHistory');
    }

    const handleShowUncheckedCustomer = () => {
        setShowCancelRequest(false);
        setShowCheckedCustomer(false);
        setShowUncheckedCustomer(true);
        setActiveButton('bookingNow');

    };

    return (
        <div>
            <table>
                <tr>
                    <td>
                        <Button onClick={handleShowUncheckedCustomer}
                                className={activeButton === "bookingNow" ? 'active' : ''}>
                            Booking hiện tại
                        </Button>
                    </td>
                    <td>
                        <Button onClick={handleCheckedCustomer}
                                className={activeButton === "rentalHistory" ? 'active' : ''}>
                            Lịch sử booking
                        </Button>
                    </td>
                    <td>
                        <Button onClick={handCancelRequest}
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
                        {showUncheckedCustomer ? (
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