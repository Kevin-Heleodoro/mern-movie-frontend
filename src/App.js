import { useState, useEffect, useCallback } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';

import FavoriteDataService from './services/favorites';
import MoviesList from './components/MoviesList';
import FavoritesList from './components/FavoritesList';
import Movie from './components/Movie';
import Login from './components/Login';
import Logout from './components/Logout';
import AddReview from './components/AddReview';

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (movieId) => {
        setFavorites([...favorites, movieId]);
    };

    const deleteFavorite = (movieId) => {
        setFavorites(favorites.filter((f) => f !== movieId));
    };

    const retrieveFavorites = useCallback(() => {
        if (user) {
            FavoriteDataService.getAll(user.googleId)
                .then((response) => {
                    setFavorites(response.data.favorites);
                })
                .catch((e) => console.log(e));
        }
    }, [user]);

    const updateFavorites = useCallback(() => {
        if (user) {
            const data = {
                _id: user.googleId,
                favorites,
            };

            FavoriteDataService.updateFavorites(data)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((e) => console.log(e));
        }
    }, [user, favorites]);

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
        retrieveFavorites();
    }, [retrieveFavorites]);

    useEffect(() => {
        updateFavorites();
    }, [updateFavorites]);

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
                            <FavoritesList user={user} favorites={favorites} />
                        }
                    />
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
