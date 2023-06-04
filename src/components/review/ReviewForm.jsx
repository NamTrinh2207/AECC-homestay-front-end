import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Rating} from 'react-simple-star-rating';

const ReviewForm = (props) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const homeId = props.homeId;
    const userId = props.userId;

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
    };

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
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            cols={50}
                            rows={5}
                            style={{resize: 'none'}}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                ''
            )}
        </div>
    );
};

export default ReviewForm;
