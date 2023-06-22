import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
// eslint-disable-next-line jest/no-mocks-import
import mockServer from '../__mocks__/mockServer';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test('renders top level application text', () => {
    const APP_TEXT = 'MOVIE TIME';

    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    const textElement = screen.getByText(APP_TEXT);
    expect(textElement).toBeInTheDocument();
});
