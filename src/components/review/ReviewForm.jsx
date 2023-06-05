import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Rating} from 'react-simple-star-rating';
import Button from "../button/Button";

const ReviewForm = (props) => {
    const ratingRef = useRef(1);
    const commentRef = useRef('');
    const [review, setReview] = useState([]);

    const homeId = props.homeId;
    const userId = props.userId;

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/review/get-first/home-id=${homeId}/user-id=${userId}`
                );
                setReview(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchReview();
    }, [homeId, userId]);

    const handleRatingChange = (newRating) => {
        ratingRef.current = newRating;
    };

    const handleReview = async (e) => {
        e.preventDefault();
        const rating = ratingRef.current;
        const comment = commentRef.current;

        try {
            if (review.length === 0) {
                await axios.post('http://localhost:8080/api/review/create', {
                    homeId,
                    userId,
                    rating,
                    comment,
                });
                // Handle success, show notification, etc.
            } else {
                await axios.put(`http://localhost:8080/api/review/${review.id}`, {
                    homeId,
                    userId,
                    rating,
                    comment,
                });
                // Handle success, show notification, etc.
            }
        } catch (error) {
            console.error(error.response.data);
            // Handle error, show error message, etc.
        }
    };

    const reviewRating = review.rating;
    const reviewComment = review.comment;

    return (
        <div>
            {userId && (
                <form onSubmit={handleReview}>
                    <div>
                        <label>Rating:</label>
                        <Rating
                            initialValue={review.length === 0 ? 5 : reviewRating}
                            ratingValue={ratingRef.current}
                            size={20}
                            transition
                            fillColor="#ffc107"
                            emptyColor="#e0e0e0"
                            onClick={handleRatingChange}
                        />
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            placeholder={review.length === 0 ? '' : reviewComment}
                            cols={50}
                            rows={5}
                            style={{ resize: 'none' }}
                            ref={commentRef}
                        />
                    </div>
                    <Button name={review.length === 0 ? 'Đánh giá' : 'Chỉnh sửa'} />
                </form>
            )}
        </div>
    );
};

export default ReviewForm;