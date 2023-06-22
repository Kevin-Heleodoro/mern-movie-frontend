import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { useParams } from 'react-router-dom';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';

import './Movie.css';

const DEFAULT_IMAGE = require('../img/default-poster.png');

const Movie = (props) => {
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
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br />
                        {movie.reviews.map((review, index) => {
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>
                                            {review.name +
                                                ' reviewed on ' +
                                                new Date(
                                                    review.date
                                                ).toLocaleDateString() +
                                                ':'}
                                        </h5>
                                        <p className="review">
                                            {review.review}
                                        </p>
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
