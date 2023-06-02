import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ReviewForm from "./ReviewForm";
import axios from "axios";

function ShowReview(props) {
    const [reviews, setReviews] = useState([]);
    const homeId = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/review/list`);
                console.log("rating",response)
                setReviews(response.data);
            } catch (error) {
                console.error(error.message);
                // Handle error, show error message, etc.
            }
        };

        fetchReviews();
    }, [homeId]);
    return (
        <div>
            <h2>Homestay Reviews</h2>
            {reviews.length === 0 ? (
                <p>Hiện chưa có review nào về nhà này.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
            <ReviewForm/>
        </div>
    );
}

export default ShowReview;