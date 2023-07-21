import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';

import MovieDataService from '../../services/movies';
import FavoriteDataService from '../../services/favorites';
import './FavoritesList.css';
import { DndCard } from './DndCard';

const DEFAULT_IMAGE = require('../../img/default-poster.png');

const FavoritesList = ({ user, favorites, updateFavorites }) => {
    const [favoriteRanking, setFavoriteRanking] = useState(favorites);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        var data = {
            ids: [...favorites],
        };
        MovieDataService.collectFavorites(data)
            .then((response) => {
                setCards(response.data);
            })
            .catch((e) => console.log(e));
    }, []);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
        // updateFavorites();
    }, []);

    const renderCard = useCallback((card, index) => {
        return (
            <DndCard
                key={card._id}
                index={index}
                id={card._id}
                title={card.title}
                poster={card.poster ? card.poster : DEFAULT_IMAGE}
                moveCard={moveCard}
            />
        );
    }, []);

    return (
        <>
            <div className="favoritesContainer container">
                <div className="favoritesPanel">Drag to Rank</div>
                <div className="favoritesRankOrder">
                    {cards && cards.map((card, i) => renderCard(card, i))}
                </div>
            </div>
        </>
    );
};

export default FavoritesList;
