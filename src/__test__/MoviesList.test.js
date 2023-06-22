import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// eslint-disable-next-line jest/no-mocks-import
import mockServer from '../__mocks__/mockServer';
import MoviesList from '../components/MoviesList';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test('renders the appropriate number of movie cards', async () => {
    const TITLE_OF_MOVIE = 'Blacksmith Scene';
    const MOVIE_CARD_CLASS = 'moviesListCard';
    const NUMBER_OF_MOVIES = 2;

    const { container } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>
    );

    await screen.findByText(TITLE_OF_MOVIE);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const movieCards = container.getElementsByClassName(MOVIE_CARD_CLASS);

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    expect(movieCards.length).toBe(NUMBER_OF_MOVIES);
});
