import React, { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';

import './FavoritesList.css';
import { DndCard } from './DndCard';
import { ItemTypes } from './ItemTypes';

const style = {
    width: 500,
    margin: '1em',
};

const FavoritesList = ({ favoriteRankDetails }) => {
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
    }, []);

    return (
        <>
            <div className="favoritesContainer container">
                <div className="favoritesPanel">
                    Rank ME
                    {/* {
                        favoriteRanking.length > 1
                        ? 
                        'Drag to Rank'
                        : 'You have not selected any favorites yet.'} */}
                </div>

                <div className="favoritesRankOrder">
                    <div style={style}>
                        {favoriteRankDetails &&
                            favoriteRankDetails.map((card, i) => (
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
