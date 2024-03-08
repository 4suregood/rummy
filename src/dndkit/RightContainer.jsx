import React, { useEffect, useRef, useState } from "react";

import AbsoluteItem from "./AbsoluteItem";
import useResize from "../utils/useResize"

const style = {
    position: "absolute",
    left: `50px`,
    top: `50px`,
};

export default function RightContainer(props) {
    // console.log('Render RightContainer props=', props);
    const { id, items, maxHeight, imageWidth } = props;

    const elementRef = useRef(null);
    const [position, dimensions] = useResize(elementRef);

    // console.log('position=', position);
    // console.log('dimensions=', dimensions);
    // const imageWidth = `${dimensions.width * 2.2 / 5}px`;
    // const yoffsetMultiplier = `${dimensions.height / 20}`;
    const yoffsetMultiplier = 6;

    // const heightNo = parseInt(maxHeight, 10);
    // console.log('[RightContainer] heightNo=', heightNo);
    let height = maxHeight * 0.7;
    if (height > 300) {
        height = 300;
    }
    // console.log('[RightContainer] height=', height);

    const containerStyle = {
        position: "relative",
        // background: "blue",
        padding: 10,
        // margin: 10,
        // height: `${height}px`,
        border: "1px solid black",
        // flex: 1,
        // flexDirection: "column",
        // display: "flex"
    };

    const playerStyle = {
        position: "absolute",
        left: `10px`,
        bottom: `1px`,
    };

    return (
        <div ref={elementRef} style={containerStyle}>
            {/* <div style={style}>
                <p>X: <strong>{position.x}</strong></p>
                <p>Y: <strong>{position.y}</strong></p>
                <p>Dimensions: {dimensions.width}w {dimensions.height}h</p>
            </div> */}
            {items.length > 0 && items.map((card, index) => {
                return (<AbsoluteItem key={card.id} card={card} id={card.id} xoffset={dimensions.width / 4} yoffset={10 + index * yoffsetMultiplier} width={imageWidth} />)
            })}
            <h5 style={playerStyle}>Right player</h5>
        </div>
    );
}
