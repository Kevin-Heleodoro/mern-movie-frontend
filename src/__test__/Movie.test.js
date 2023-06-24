/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// eslint-disable-next-line jest/no-mocks-import
import mockServer from '../__mocks__/mockServer';
import Movie from '../components/Movie';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test('renders the appropriate number of reviews', async () => {
    const TITLE_OF_MOVIE = 'The Great Train Robbery';
    const MOVIE_ID = '573a1390f29313caabcd4135';
    const REVIEW_TEXT_CLASS = 'reviewsText';
    const NUMBER_OF_REVIEWS = 2;

    const { container } = render(
        <MemoryRouter initialEntries={[`/movies/${MOVIE_ID}`]}>
            <Routes>
                <Route path="/movies/:id" element={<Movie />} />
            </Routes>
        </MemoryRouter>
    );

    await screen.findByText(TITLE_OF_MOVIE);
    const reviewCards = container.getElementsByClassName(REVIEW_TEXT_CLASS);
    // const moviePoster = container.getElementsByClassName('bigPicture');
    // screen.debug();
    expect(reviewCards.length).toBe(NUMBER_OF_REVIEWS);
});
