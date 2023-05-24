import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Field} from "formik";

function MyProperty(props) {
    const userId = props.user;
    // const [user, setUser] = useState(null);
    const [homes, setHomes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const [home,setHome]=useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${userId.id}/homes?page=${currentPage}`);
                const { totalPages } = response.data;
                setHomes(response.data.content);
                setTotalPages(totalPages);
                console.log("ban dau", response.data.content)
            } catch (error) {
                console.log(error);
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

    const deleteHome = async (homeId) => {
        try {
            await axios.delete(`http://localhost:8080/homes/${homeId}`);
            const updatedHomes = homes.filter((home) => home.id !== homeId);
            setHomes(updatedHomes);
        } catch (error) {
            console.log(error);
        }

    };
    // const handleChangeStatus = async (event, homeId) => {
    //     const selectedStatus =parseInt(event.target.value);
    //     console.log(selectedStatus)
    //     try {
    //         axios.get(`http://localhost:8080/homes/${homeId}`)
    //             .then(res=>{
    //                 const newHome=res.data;
    //                setHome({
    //                    "id": newHome.id,
    //                    "name": newHome.name,
    //                    "address": newHome.address,
    //                    "bathroom": newHome.bathroom,
    //                    "bedroom": newHome.bathroom,
    //                    "description": newHome.description,
    //                    "priceByDay": newHome.priceByDay,
    //                    "image": newHome.image,
    //                    "status": selectedStatus,
    //                    "rating": newHome.rating,
    //                    "comment": newHome.comment,
    //                    "users": newHome.users,
    //                    "homeType": newHome.homeType
    //
    //                });
    //                 console.log(home);
    //                 const updatedHomes =()=>{
    //                     try {
    //                         axios.put(`http://localhost:8080/homes/${homeId}`,home);
    //                     } catch (error) {
    //                         console.log(error);
    //                     }
    //                 };
    //                 updatedHomes();
    //
    //             })
    //     }catch (err){
    //
    //     }
    //
    //
    // };
    const handleChangeStatus = async (event, homeId) => {
        let selectedStatus = event.target.value;
        console.log(selectedStatus);
        try {
            let response = await axios.get(`http://localhost:8080/homes/${homeId}`);
            let newHome = response.data;
            console.log(newHome)
            let updateHome = {
                ...newHome,
                status: selectedStatus
            }


            await axios.put(`http://localhost:8080/homes/${homeId}`, updateHome ,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setHome(updateHome);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        homes.length > 0 ? (
            <div>
                <div>
                    {homes.map((home, index) => (
                        <div className="col-lg-12 col-md-12 col-sm-12" >
                            <div className="my-properties">
                                <table className="manage-table"key={index}>
                                    <tbody className="responsive-table">
                                    <tr>
                                        <td className="listing-photoo">
                                            <img alt="my-properties" src={home.image[0]}
                                                 className="img-fluid"/>
                                        </td>
                                        <td className="title-container">
                                            <h5><a href="#">{home.name}</a></h5>
                                            <h6><span>{home.priceByDay}</span> VNĐ/Ngày</h6>
                                            <p><i
                                                className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
                                                {home.address} </p>
                                        </td>
                                        <td className="date">
                                            7.02.2020
                                        </td>
                                        <td className="action">
                                            <ul>
                                                <li>
                                                    <a href="#"><i className="fa fa-pencil"></i> Edit</a>
                                                </li>
                                                <li>
                                                    <select className="fa"
                                                        onChange={(event) => handleChangeStatus(event, home.id)}
                                                    >   <option value={""}>--Trạng thái--</option>
                                                        <option value={1}>Phòng Trống</option>
                                                        <option value={2}>Đang bảo trì</option>
                                                        <option value={3}>Đang cho thuê</option>
                                                    </select>
                                                </li>
                                                <li>
                                                    <a onClick={() => deleteHome(home.id)} className="delete"><i
                                                        className="fa fa-remove"></i> Delete</a>
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
                <div className="pagination-container">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    <span>{currentPage + 1}</span> / <span>{totalPages}</span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            </div>

        ) : (
            <div className="featured-properties content-area-19">
                <div className="container">
                    <div className="main-title">
                        <h1>Danh sách nhà trống</h1>
                    </div>
                </div>
            </div>
        )
    );
}

export default MyProperty;