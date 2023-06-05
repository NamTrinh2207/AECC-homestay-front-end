import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Rating} from 'react-simple-star-rating';
import Button from "../button/Button";

const ReviewForm = (props) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [review, setReview] = useState([])
    const homeId = props.homeId;
    const userId = props.userId;
    const wasComment = props.wasComment;

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/review/get-first/home-id=${homeId}/user-id=${userId}`);
                console.log("review 1", res)
                setReview(res.data)
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchReview();
    }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (wasComment === 0) {
            try {
                const response = await axios.post('http://localhost:8080/api/review/create', {
                    homeId,
                    userId,
                    rating,
                    comment,
                });
                console.log(response.data);
                // Handle success, show notification, etc.
            } catch (error) {
                console.error(error.response.data);
                // Handle error, show error message, etc.
            }
        }
    };
    console.log("review 2", review)
    return (
        <div>
            {userId !== undefined || userId !== 0 || userId !== null ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Rating:</label>
                        <Rating
                            initialValue={5}
                            ratingValue={rating}
                            size={20}
                            transition
                            fillColor="#ffc107"
                            emptyColor="#e0e0e0"
                            onClick={handleRatingChange}
                        />
                    </div>
                    <div className={"disable-textarea"}>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            cols={50}
                            rows={5}
                            style={{resize: 'none'}}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <Button name={"Đánh giá"}/>
                </form>
            ) : (
                ''
            )}
        </div>
    );
};

export default ReviewForm;
