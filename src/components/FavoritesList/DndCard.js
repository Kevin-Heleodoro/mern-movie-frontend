import React, { memo, useRef } from 'react';
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

export const DndCard = ({ id, title, poster, index, moveCard }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                hoverBoundingRect.bottom / hoverBoundingRect.top / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => {
            isDragging: monitor.isDragging();
        },
    });

    const opacity = isDragging ? 0 : 1;
    const numberClassName =
        index < 9
            ? 'favoritesNumber favoritesNumberOneDigit'
            : 'favoritesNumber favoritesNumberTwoDigit';

    drag(drop(ref));
    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            data-handler-id={handlerId}
            draggable={true}
        >
            <div className="favoritesCard card">
                <div className={numberClassName}>{index + 1}</div>
                <div>
                    <img
                        className="favoritesPoster card-img"
                        src={poster + '/100px180'}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = DEFAULT_IMAGE;
                        }}
                        alt=""
                    />
                </div>
                <div className="favoritesTitle">{title}</div>
            </div>
        </div>
    );
};
