import React, { useEffect, useState } from 'react';
import MovieDataService from '../services/movies';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();
    let location = useLocation();
    // let editing = false;
    let initialReviewState = ''; // Value will be different if editing an existing review

    const [review, setReview] = useState(initialReviewState);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (location.state) {
            setEditing(true);
            setReview(location.state.currentReview.review);
        }
    }, [location.state]);

    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };

    const saveReview = () => {
        var data = {
            review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id, // movie id from url
        };

        if (editing) {
            data = {
                review,
                user_id: user.googleId,
                review_id: location.state.currentReview._id,
                name: user.name,
            };

            MovieDataService.editReview(data)
                .then((res) => {
                    navigate('/movies/' + params.id);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            MovieDataService.createReview(data)
                .then((res) => {
                    navigate('/movies/' + params.id);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>
                        {editing ? 'Edit' : 'Create'} Review{' '}
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={review}
                        onChange={onChangeReview}
                        defaultValue={editing ? review : ''}
                    />
                </Form.Group>
                <Button variant="primary" onClick={saveReview}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default AddReview;
