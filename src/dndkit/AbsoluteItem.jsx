
import React, { useState, useEffect, useRef } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AbsoluteItem = (props) => {
    //console.log('Render AbsoluteItem props=', props);
    const { id, card, xoffset, yoffset, width } = props;
    const theme = useTheme();
    const elementRef = useRef(null);

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
    
    const style = {
        position: "absolute",
        left: `${xoffset}px`,
        top: `${yoffset}px`,
        touchAction: "none",
    };
   
    return (
        <div ref={elementRef} style={style} >
            <img key={card.id} src={images(card.faceUp ? card.imageSrc : card.backImageSrc)} width={width} alt={card.imageSrc} />
        </div >
    );
};

export default AbsoluteItem;