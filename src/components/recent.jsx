import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Recent() {
    const [mostRent, setMostRent] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:8080/homes/findBooking").then((response) => {
            console.log(response.data)
            setMostRent(response.data)
            setLoading(false)
        }).catch((er) => {
            console.log(er)
        })
    }, [])
    if (loading) {
        return <div>Loading...</div>
    }
    // return (
    //     <div>
    //         {/* Recent Properties start */}
    //         {(mostRent !== null) ? (
    //             <div className="recent-properties content-area-2">
    //                 <div className="container">
    //                     <div className="main-title">
    //                         <h1>Top 5 Homestays</h1>
    //                         <p>Hãy đến với chúng tôi để được thấy những gì toẹt vời nhất!!!</p>
    //                     </div>
    //                     <div className="row">
    //                         {mostRent.map((item, index) => (
    //                             <div className="col-lg-3 col-md-6 col-sm-12 wow fadeInLeft delay-04s">
    //
    //                                 <div className="property-box-8">
    //
    //                                     <div className="photo-thumbnail" key={index}>
    //                                         <div className="photo">
    //                                             <img height={300} src={item.images} alt="property-box-8"
    //                                                  className="img-fluid"/>
    //                                             <a href="">
    //                                                 <span className="blog-one__plus"></span>
    //                                             </a>
    //                                         </div>
    //                                         <div className="tag-for">For Rent</div>
    //                                         <div className="price-ratings-box">
    //                                             <p className="price">
    //                                                 {item.priceByDay}đ
    //                                             </p>
    //                                             <div className="ratings">
    //                                                 <span></span>{[...Array(item.rating)].map((_, index) => (
    //                                                 <i className="fa fa-star" style={{color: "orange"}}></i>))}
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                     <div className="detail">
    //                                         <div className="heading">
    //                                             <h3>
    //                                                 <a href="">{item.name}</a><span>{item.bookingCount} lượt thuê</span>
    //                                                 <p><i className="fa fa-user"></i>{item.username}</p>
    //                                             </h3>
    //                                             <div className="location">
    //                                                 <a href="">
    //                                                     <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
    //                                                     {item.address}
    //                                                 </a>
    //                                             </div>
    //                                         </div>
    //                                         <div className="properties-listing">
    //
    //                                             <span>{item.homeType}</span>
    //                                             <div>
    //                                                 <span><i className="fa fa-bed"></i>{item.bedroom}</span>
    //                                                 <span><i className="fa fa-bath"></i>{item.bathroom}</span>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //
    //                             </div>
    //                         )
    //                     )}
    //                     </div>
    //                 </div>
    //             </div>
    //         ) : (
    //             <div className="featured-properties content-area-19">
    //                 <div className="container">
    //                     <div className="main-title">
    //                         <h1>Danh sách nhà trống</h1>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
    //         {/* Recent Properties end */}
    //
    //     </div>
    // )


    return (
        <div>
            {(mostRent !== null) ? (
                <div className="recent-properties content-area-2">
                    <div className="container">
                        <div className="main-title">
                            <h1>Top 5 Homestays</h1>
                            <h1>Hãy đến với chúng tôi để thuê được nhiều nhà nhất!!!</h1>
                        </div>
                        <div className="row">
                            {mostRent.map((item, index) => (
                                <div className="col-lg-3 col-md-6 col-sm-12 wow fadeInLeft delay-04s">
                                    <div className="property-box-8">
                                        <div className="photo-thumbnail">
                                            <div className="photo">
                                                <img height={300} src={item.images} alt="property-box-8"
                                                     className="img-fluid"/>
                                                <a href="">
                                                    <span className="blog-one__plus"></span>
                                                </a>
                                            </div>
                                            <div className="tag-for">For Rent</div>
                                            <div className="price-ratings-box">
                                                <p className="price">
                                                    {item.priceByDay}đ
                                                </p>
                                                <div className="ratings">
                                                    <span></span>{[...Array(item.rating)].map((_, index) => (
                                                    <i className="fa fa-star" style={{color: "orange"}}></i>))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="detail">
                                            <div className="heading">
                                                <h3>
                                                    <a href="">{item.name}</a>
                                                </h3>
                                                <div className="location">
                                                    <a href="">
                                                        <i className="flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
                                                        {item.address}
                                                    </a>
                                                </div>
                                                <div className="location">
                                                    <a href="">
                                                        <i className="fa fa-home"></i>
                                                        {item.homeType}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="properties-listing">
                                                <span>{item.bedroom} Beds</span>
                                                <span>{item.bathroom} Baths</span>
                                                <span>{item.bookingCount} lượt thuê</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
            )}
        </div>
    )
}
