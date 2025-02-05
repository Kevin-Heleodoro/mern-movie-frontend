import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link, useParams } from 'react-router-dom';
import { Card, Container, Image, Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';

import './Movie.css';

const DEFAULT_IMAGE = require('../img/default-poster.png');

const Movie = ({ user }) => {
    let params = useParams();
    const [movie, setMovie] = useState({
        id: null,
        title: '',
        rated: '',
        reviews: [],
    });

    useEffect(() => {
        const getMovie = (id) => {
            MovieDataService.getOne(id).then((response) => {
                setMovie(response.data);
            });
        };

        getMovie(params.id);
    }, [params.id]);

    const handleDelete = (review, index) => {
        var data = {
            review_id: review._id,
            user_id: user.googleId,
        };

        MovieDataService.deleteReview(data);

        setMovie((prevState) => {
            prevState.reviews.splice(index, 1);
            return {
                ...prevState,
            };
        });
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="poster">
                            <Image
                                className="bigPicture"
                                src={movie.poster + '/100px250'}
                                onError={(e) => {
                                    e.target.src = DEFAULT_IMAGE;
                                }}
                                fluid
                            />
                        </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {user && (
                                    <Link
                                        to={'/movies/' + params.id + '/review'}
                                    >
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br />
                        {movie.reviews.map((review, index) => {
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>
                                            {review.name + ' reviewed on '}{' '}
                                            {moment(review.date).format(
                                                'Do MMMM YYYY'
                                            )}
                                        </h5>
                                        <p className="review">
                                            {review.review}
                                        </p>
                                        {user &&
                                            user.googleId ===
                                                review.user_id && (
                                                <Row>
                                                    <Col>
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    '/movies/' +
                                                                    params.id +
                                                                    '/review/',
                                                            }}
                                                            state={{
                                                                currentReview:
                                                                    review,
                                                            }}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            variant="link"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    review,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;
