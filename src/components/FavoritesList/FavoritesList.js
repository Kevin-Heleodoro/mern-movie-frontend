import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';

import MovieDataService from '../../services/movies';
import FavoriteDataService from '../../services/favorites';
import './FavoritesList.css';
import { DndCard } from './DndCard';

const DEFAULT_IMAGE = require('../../img/default-poster.png');

const FavoritesList = ({ user, favorites, updateFavorites }) => {
    const [favoriteRanking, setFavoriteRanking] = useState(favorites);
    const [cards, setCards] = useState(favorites);

    // useEffect(() => {
    //     var data = {
    //         ids: [...favorites],
    //     };
    //     MovieDataService.collectFavorites(data)
    //         .then((response) => {
    //             console.log(response.data);
    //             setFavoriteRanking(response.data);
    //         })
    //         .catch((e) => console.log(e));
    // }, []);

    const findCard = useCallback(
        (id) => {
            const card = cards.filter((c) => `${c.id}` === id)[0];
            return {
                card,
                index: cards.indexOf(card),
            };
        },
        [cards]
    );

    const moveCard = useCallback(
        (id, hoverIndex) => {
            const { card, index } = findCard(id);
            setFavoriteRanking(
                update(cards, {
                    $splice: [
                        [index, 1],
                        [hoverIndex, 0, card],
                    ],
                })
            );
        },
        [findCard, favoriteRanking, setFavoriteRanking]
    );

    const renderCard = useCallback((card, index) => {
        return (
            <DndCard
                key={card.id}
                index={index}
                id={`${card.id}`}
                title={card.title}
                poster={card.poster}
                moveCard={moveCard}
                findCard={findCard}
            />
        );
    }, []);

    return (
        <>
            <div className="favoritesContainer container">
                <div className="favoritesPanel">Drag to Rank</div>
                <div className="favoritesRankOrder">
                    {favoriteRanking &&
                        favoriteRanking.map((card, i) => renderCard(card, i))}
                </div>
            </div>
        </>
    );
};

export default FavoritesList;
