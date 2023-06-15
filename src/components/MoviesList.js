import React, { useState, useEffect, useCallback } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './MoviesList.css';

const MoviesList = (props) => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const [ratings, setRatings] = useState(['All Ratings']);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState('');

    const retrieveRatings = useCallback(() => {
        MovieDataService.getRatings()
            .then((response) => {
                setRatings(['All Ratings'].concat(response.data));
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const retrieveMovies = useCallback(() => {
        setCurrentSearchMode('');
        MovieDataService.getAll(currentPage)
            .then((response) => {
                setMovies(response.data.movies);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch((e) => console.log(e));
    }, [currentPage]);

    const find = useCallback(
        (query, by) => {
            MovieDataService.find(query, by, currentPage)
                .then((response) => {
                    setMovies(response.data.movies);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        [currentPage]
    );

    const findByTitle = useCallback(() => {
        setCurrentSearchMode('findByTitle');
        find(searchTitle, 'title');
    }, [find, searchTitle]);

    const findByRating = useCallback(() => {
        setCurrentSearchMode('findByRating');
        if (searchRating === 'All Ratings') {
            retrieveMovies();
        } else {
            find(searchRating, 'rated');
        }
    }, [find, searchRating, retrieveMovies]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === 'findByTitle') {
            findByTitle();
        } else if (currentSearchMode === 'findByRating') {
            findByRating();
        } else {
            retrieveMovies();
        }
    }, [currentSearchMode, findByTitle, findByRating, retrieveMovies]);

    useEffect(() => {
        retrieveRatings();
    }, [retrieveRatings]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchRating = (e) => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    };

    return <div className="App">Placeholder text for MoviesList</div>;
};

export default MoviesList;
