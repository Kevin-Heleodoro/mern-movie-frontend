import { useState, useEffect, useCallback } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';

import FavoriteDataService from './services/favorites';
import MovieDataService from './services/movies';

import MoviesList from './components/MoviesList';
import FavoritesList from './components/FavoritesList/FavoritesList';
import Movie from './components/Movie';
import Login from './components/Login';
import Logout from './components/Logout';
import AddReview from './components/AddReview';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [favoriteRankDetails, setFavoriteRankDetails] = useState([]);
    const [saveFavorites, setSaveFavorites] = useState(false);

    const addFavorite = (movieId) => {
        setSaveFavorites(true);
        setFavorites([...favorites, movieId]);
    };

    const deleteFavorite = (movieId) => {
        setSaveFavorites(true);
        setFavorites(favorites.filter((f) => f !== movieId));
    };

    const retrieveFavorites = useCallback(() => {
        FavoriteDataService.getAll(user.googleId)
            .then((response) => {
                setFavorites(response.data.favorites);
            })
            .catch((e) => console.log(e));
    }, [user]);

    const retrieveFavoritesDetails = useCallback(() => {
        let data = {
            ids: [...favorites],
        };

        MovieDataService.collectFavorites(data)
            .then((response) => {
                setFavoriteRankDetails(response.data);
            })
            .catch((e) => console.log(e));
    }, [favorites]);

    const updateFavorites = useCallback(() => {
        const data = {
            _id: user.googleId,
            favorites,
        };

        FavoriteDataService.updateFavorites(data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => console.log(e));
    }, [user, favorites]);

    const reorderFavorites = useCallback(
        (cards) => {
            if (cards) {
                const newFavoritesOrder = cards.map((f) => f._id);
                console.log(favorites);
                console.log(newFavoritesOrder);

                setSaveFavorites(true);
                setFavorites(newFavoritesOrder);
                setFavoriteRankDetails(cards);
                // updateFavorites()
            }
        },
        [favorites, favoriteRankDetails]
    );

    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem('login'));

        if (loginData) {
            let loginExp = loginData.exp;
            let now = Date.now() / 1000;

            if (now < loginExp) {
                // Not expired
                setUser(loginData);
            } else {
                // Expired
                localStorage.setItem('login', null);
            }
        }
    }, []);

    useEffect(() => {
        if (user && saveFavorites) {
            updateFavorites();
            setSaveFavorites(false);
        }
    }, [user, favorites, saveFavorites, updateFavorites]);

    useEffect(() => {
        if (user) {
            retrieveFavorites();
        }
    }, [user, retrieveFavorites]);

    useEffect(() => {
        if (user) {
            retrieveFavoritesDetails();
        }
    }, [user, retrieveFavoritesDetails]);

    useEffect(() => {
        if (user && saveFavorites) {
            reorderFavorites();
        }
    }, [user, saveFavorites, reorderFavorites]);

    useEffect(() => {
        if (user && saveFavorites) {
            updateFavorites();
        }
    }, [user, saveFavorites, updateFavorites]);

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="App">
                <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
                    <Container className="container-fluid">
                        <Navbar.Brand href="/">
                            <img
                                src="/images/movies-logo.png"
                                alt="movies logo"
                                className="moviesLogo"
                            />
                            MOVIE TIME
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to="/movies">
                                    Movies
                                </Nav.Link>
                                {user ? (
                                    <Nav.Link as={Link} to="/favorites">
                                        Favorites
                                    </Nav.Link>
                                ) : (
                                    ''
                                )}
                            </Nav>
                        </Navbar.Collapse>
                        {user ? (
                            <Logout setUser={setUser} clientId={clientId} />
                        ) : (
                            <Login setUser={setUser} />
                        )}
                    </Container>
                </Navbar>

                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <MoviesList
                                user={user}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}
                                favorites={favorites}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/movies"
                        element={
                            <MoviesList
                                user={user}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}
                                favorites={favorites}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/movies/:id"
                        element={<Movie user={user} />}
                    />
                    <Route
                        exact
                        path="/movies/:id/review"
                        element={<AddReview user={user} />}
                    />
                    <Route
                        exact
                        path="/favorites"
                        element={
                            user ? (
                                <DndProvider backend={HTML5Backend}>
                                    <FavoritesList
                                        favoriteRankDetails={
                                            favoriteRankDetails
                                        }
                                        reorderFavorites={reorderFavorites}
                                    />
                                </DndProvider>
                            ) : (
                                <MoviesList
                                    user={user}
                                    addFavorite={addFavorite}
                                    deleteFavorite={deleteFavorite}
                                    favorites={favorites}
                                />
                            )
                        }
                    />
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
