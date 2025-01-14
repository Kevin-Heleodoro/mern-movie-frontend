import { rest } from 'msw';
import { setupServer } from 'msw/node';

const API_URL = process.env.REACT_APP_API_BASE_URL;

console.log(`Mock Server Base URL: ${API_URL}`);

const mockRatingsResponse = ['AO', 'APPROVED', 'Approved', 'G', 'GP'];
const mockMovieResponse = {
    movies: [
        {
            _id: '573a1390f29313caabcd4135',
            title: 'Blacksmith Scene',
            plot: 'Three men hammer on an anvil and pass a bottle of beer around.',
            fullplot:
                'A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.',
            rated: 'UNRATED',
        },
        {
            _id: '573a1390f29313caabcd42e8',
            title: 'The Great Train Robbery',
            plot: 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
            fullplot:
                "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
            rated: 'TV-G',
        },
    ],
    page: 0,
    filters: {},
    entries_per_page: 20,
    total_results: 2,
};
const mockOneMovieResponse = {
    _id: '573a1390f29313caabcd42e8',
    title: 'The Great Train Robbery',
    plot: 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
    fullplot:
        "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
    rated: 'TV-G',
    reviews: [
        {
            _id: '64890f87b334a6f5dc6bf8e4',
            name: 'Test User',
            user_id: '4321',
            date: '2023-06-14T01:13:07.823Z',
            review: 'It was awesome!!!!!',
            movie_id: '573a1390f29313caabcd42e8',
        },
        {
            _id: '64890f87b334a6f5dc6bf8e5',
            name: 'Test User',
            user_id: '4321',
            date: '2023-06-14T00:53:27.319Z',
            review: 'This is the worst movie!',
            movie_id: '573a1390f29313caabcd42e8',
        },
    ],
};

const mockServer = setupServer(
    rest.get(`${API_URL}/api/v1/movies/ratings`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockRatingsResponse));
    }),
    rest.get(`${API_URL}/api/v1/movies`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockMovieResponse));
    }),
    rest.get(`${API_URL}/api/v1/movies/id/:id`, (req, res, ctx) => {
        console.log(req.params.id);
        return res(ctx.status(200), ctx.json(mockOneMovieResponse));
    })
);

export default mockServer;
