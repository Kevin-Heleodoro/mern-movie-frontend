import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';

import MovieDataService from '../../services/movies';
import FavoriteDataService from '../../services/favorites';
import './FavoritesList.css';
import { DndCard } from './DndCard';

const FavoritesList = ({ user, favorites }) => {
    // Implement calls to the backend to gather movie title and poster from api.

    // const [cards, setCards] = useState(favorites);

    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            text: '???',
        },
        {
            id: 7,
            text: 'PROFIT',
        },
    ]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
    }, []);

    const renderCard = useCallback((card, index) => {
        console.table({ card, index });

        return (
            <DndCard
                key={index}
                index={index}
                id={card.movieId}
                moveCard={moveCard}
            />
        );
    }, []);

    return (
        <>
            <div className="favoritesContainer container">
                <div className="favoritesPanel">Drag to Rank</div>
                <div className="favoritesRankOrder">
                    {cards.map((card, i) => renderCard(card, i))}
                </div>
            </div>
        </>
    );
};

export default FavoritesList;
