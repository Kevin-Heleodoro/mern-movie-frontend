import React, { useState } from 'react';
import MovieDataService from '../services/movies';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();

    let editing = false;
    let initialReviewState = ''; // Value will be different if editing an existing review

    const [review, setReview] = useState(initialReviewState);

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
            // TODO: Editing a review
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
                        defaultValue={editing ? null : ''}
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
