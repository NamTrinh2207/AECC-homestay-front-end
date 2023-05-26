import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Field} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import EditHotel from "../EditHotel";

function MyProperty(props) {
    const userId = props.user;
    const [homes, setHomes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [check, setCheck] = useState(false);
    const visiblePages = totalPages+1;

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
                        {i +1}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    useEffect(() =>{
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

    const getStatusLabel = (status) => {
        switch (status) {
            case 1:
                return 'Phòng trống';
            case 2:
                return 'Đang bảo trì';
            case 3:
                return 'Đang cho thuê';
            default:
                return 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return 'green';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'transparent';
        }
    };


    const deleteHome = async (homeId) => {
        const confirmed = window.confirm('Bạn chắc chắn muốn xóa?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/homes/${homeId}`);
                const updatedHomes = homes.filter((home) => home.id !== homeId);
                setHomes(updatedHomes);
            } catch (error) {
                console.log(error);
            }
        }
    };


    const handleChangeStatus = async (event, homeId) => {
        const selectedStatus = parseInt(event.target.value);

        console.log(selectedStatus);
        try {
            let response = await axios.get(`http://localhost:8080/homes/${homeId}`);
            let newHome = response.data;
            let updateHome = {
                ...newHome,
                status: selectedStatus
            };
            await axios.put(`http://localhost:8080/homes/${homeId}`, updateHome ,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                alert("đổi trạng thái thành công");
                window.location.reload()
            });
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
                                                 height={100}/>
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
                                                {home.status===3?(
                                                    <>
                                                        <li>
                                                            <select className="fa"  style={{border:"none", backgroundColor:"#fff"}}
                                                                    onChange={(event) => handleChangeStatus(event, home.id)}
                                                            >   <option value={""} >{getStatusLabel(home.status)}</option>
                                                                <option value={1} >Phòng trống</option>
                                                                <option value={2}>Đang bảo trì</option>
                                                                <option value={3}>Đang cho thuê</option>
                                                            </select>
                                                        </li>
                                                    </>
                                                ):(

                                                    <>
                                                        <li >

                                                            <Link  to={`/edit/${home.id}`}><i className="fa fa-pencil" ></i> Sửa</Link>
                                                        </li>
                                                        <li>
                                                            <select className="fa"  style={{border:"none", backgroundColor:"#fff"}}
                                                                    onChange={(event) => handleChangeStatus(event, home.id)}
                                                            >   <option value={""} >{getStatusLabel(home.status)}</option>
                                                                <option value={1} >Phòng trống</option>
                                                                <option value={2}>Đang bảo trì</option>
                                                                <option value={3}>Đang cho thuê</option>
                                                            </select>
                                                        </li>
                                                        <li >
                                                            <a onClick={() => deleteHome(home.id)} className="delete"><i
                                                                className="fa fa-remove"></i> Delete</a>
                                                        </li>
                                                    </>
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
                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{border:"none", cursor:"pointer"}}
                            onClick={goToPreviousPage}
                            disabled={currentPage === 0}
                    >
                        <i style={{fontSize:25}} className="fa fa-angle-left"></i>
                    </button>
                    {/*<span>{currentPage + 1}</span> / <span>{totalPages}</span>*/}
                    {renderPagination()}
                    <button style={{border:"none", cursor:"pointer"}}
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages - 1}
                    >
                        <i style={{fontSize:25}} className="fa fa-angle-right"></i>
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