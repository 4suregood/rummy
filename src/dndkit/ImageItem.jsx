import React from 'react';

const ImageItem = (props) => {
    // console.log('Render ImageItem props=', props);
    const { card, imageStyle, imageWidth } = props;

    let images = require.context('../images', true);

    return (
        <img key={card.id} id={card.id} style={imageStyle} src={images(card.faceUp ? card.imageSrc : card.backImageSrc)} width={imageWidth} alt={card.imageSrc} />
    );
};

export default ImageItem;