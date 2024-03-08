
import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImageItem from './ImageItem';

const SortableItem = (props) => {
    //console.log('Render SortableItem props=', props);
    const { id, card, imageWidth } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            {card && <ImageItem id={card.id} card={card} imageWidth={imageWidth} />}
        </div >
    );
};

export default SortableItem;