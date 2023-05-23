import React, {useEffect, useState} from 'react';
import axios from "axios";

function MyProperty(props) {
    const userId = props.user;
    const [user, setUser] = useState(null);
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:8080/${userId.id}`);
                setUser(userResponse.data);

                const homesResponse = await axios.get(`http://localhost:8080/${userId.id}/homes`);
                setHomes(homesResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        homes.length > 0 ? (
            homes.map(home => (
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="my-properties">
                        <table className="manage-table">
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
                                            <a href="#"><i className="fa  fa-eye-slash"></i> Hide</a>
                                        </li>
                                        <li>
                                            <a href="#" className="delete"><i
                                                className="fa fa-remove"></i> Delete</a>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    {/*<div className="pagination-box text-center">*/}
                    {/*    <nav aria-label="Page navigation example">*/}
                    {/*        <ul className="pagination">*/}
                    {/*            <li className="page-item"><a className="page-link" href="#"><span*/}
                    {/*                aria-hidden="true">«</span></a></li>*/}
                    {/*            <li className="page-item"><a className="page-link active" href="#">1</a></li>*/}
                    {/*            <li className="page-item"><a className="page-link" href="#">2</a></li>*/}
                    {/*            <li className="page-item"><a className="page-link" href="#">3</a></li>*/}
                    {/*            <li className="page-item"><a className="page-link" href="#"><span*/}
                    {/*                aria-hidden="true">»</span></a></li>*/}
                    {/*        </ul>*/}
                    {/*    </nav>*/}
                    {/*</div>*/}
                </div>
            ))
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