import React, { useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import Card from 'react-bootstrap/Card';

import './FavoritesList.css';

const style = {
    padding: '10px',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const DEFAULT_IMAGE = require('../../img/default-poster.png');

export const DndCard = memo(function ({
    id,
    title,
    poster,
    index,
    moveCard,
    findCard,
}) {
    const originalRank = findCard(id).index;
    const ref = useRef(null);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            hover({ id: dragId }) {
                if (dragId !== id) {
                    const { index: overIndex } = findCard(id);
                    moveCard(dragId, overIndex);
                }
            },
        }),
        [findCard, moveCard]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: { id, originalRank },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { id: dropId, originalIndex } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    moveCard(dropId, originalIndex);
                }
            },
        }),
        [id, originalRank, moveCard]
    );

    const opacity = isDragging ? 0 : 1;
    const numberClassName =
        index < 9
            ? 'favoritesNumber favoritesNumberOneDigit'
            : 'favoritesNumber favoritesNumberTwoDigit';

    return (
        <div ref={(n) => drag(drop(n))} style={{ ...style, opacity }}>
            <Card className="favoritesCard" ref={ref} style={{ ...opacity }}>
                <div className={numberClassName}>{index + 1}</div>
                <div>
                    <Card.Img
                        className="favoritesPoster"
                        src={poster + '/100px180'}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = DEFAULT_IMAGE;
                        }}
                    />
                </div>
                <div className="favoritesTitle">{title}</div>
            </Card>
        </div>
    );
});
