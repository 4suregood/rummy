
import React, { useState, useEffect } from 'react';

import { CSS } from '@dnd-kit/utilities';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDraggable } from '@dnd-kit/core';
import ImageItem from './ImageItem';

const DraggableItem = (props) => {
    // console.log('Render DraggableItem props=', props);
    const { id, card, xoffset, yoffset, imageWidth, disableDnD } = props;
    const theme = useTheme();

    // A breakpoint is the range of predetermined screen sizes that have specific layout requirements.
    // xs (extra-small): 0px or larger
    // sm (small): 600px or larger
    // md (medium): 960px or larger
    // lg (large): 1280px or larger
    // xl (extra-large): 1920px or larger

    const sm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const lg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const xl = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    // console.log('sm md lg xl=', sm, md, lg, xl);

    let images = require.context('../images', true);

    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: card.id, disabled: disableDnD
    });

    // console.log('[DraggableItem] transition=', transition);
    // console.log('[DraggableItem] transform=', transform);

    // const style = transform ? {
    //     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    // } : undefined;

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
    };

    const imageStyle = {
        position: "absolute",
        left: `${xoffset}px`,
        top: `${yoffset}px`,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            {/* {card && <img key={card.id} style={imageStyle} src={images(card.faceUp ? card.imageSrc : card.backImageSrc)} width={imageWidth} alt={card.imageSrc} />} */}
            {card && <ImageItem id={card.id} imageStyle={imageStyle} card={card} imageWidth={imageWidth} />}
        </div >
    );
};

export default DraggableItem;