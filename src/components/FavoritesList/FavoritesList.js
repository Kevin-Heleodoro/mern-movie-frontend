import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';

import './FavoritesList.css';
import { DndCard } from './DndCard';

const style = {
    width: 500,
    margin: '1em',
};

const FavoritesList = ({ favoriteRankDetails, reorderFavorites }) => {
    const [cards, setCards] = useState(favoriteRankDetails);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
        reorderFavorites(cards);
    }, []);

    // useEffect(() => {
    //     reorderFavorites(cards);
    // }, [cards]);

    return (
        <>
            <div className="favoritesContainer container">
                <div className="favoritesPanel">
                    {cards.length > 1
                        ? 'Drag to Rank'
                        : 'You have not selected any favorites yet.'}
                </div>

                <div className="favoritesRankOrder">
                    <div style={style}>
                        {cards &&
                            cards.map((card, i) => (
                                <DndCard
                                    key={card._id}
                                    id={card._id}
                                    title={card.title}
                                    poster={card.poster}
                                    index={i}
                                    moveCard={moveCard}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritesList;
