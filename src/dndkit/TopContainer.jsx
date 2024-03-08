import React, { useEffect, useRef, useState } from "react";

import AbsoluteItem from "./AbsoluteItem";
import useResize from "../utils/useResize"

const containerStyle = {
    background: "yellow",
    padding: 10,
    margin: 10,
    height: 300,
    border: "1px solid black",
    // flex: 1,
    flexDirection: "row",
    display: "flex"
};

export default function TopContainer(props) {
    // console.log('Render TopContainer props=', props);
    const { id, items, maxHeight, maxWidth, imageWidth } = props;

    const elementRef = useRef(null);
    const [position, dimensions] = useResize(elementRef);
    // console.log('[TopContainer] position=', position);
    // console.log('[TopContainer] dimensions=', dimensions);
    // const imageWidth = `${dimensions.width / 12}px`;
    const xoffsetMultiplier = `${dimensions.width / 30}`;

    const containerStyle = {
        position: "relative",
        // background: "yellow",
        padding: 10,
        // margin: 10,
        height: `${maxHeight / 9}px`,
        border: "1px solid black",
        // flex: 1,
        // flexDirection: "row",
        // display: "flex"
    };

    const style = {
        position: "absolute",
        left: `-120px`,
        top: `1px`,
    };

    const playerStyle = {
        position: "absolute",
        left: `10px`,
        top: `1px`,
    };

    return (
        <div ref={elementRef} style={containerStyle}>
            {/* <div style={style}>
                <p>X: <strong>{position.x}</strong></p>
                <p>Y: <strong>{position.y}</strong></p>
                <p>Dimensions: {dimensions.width}w {dimensions.height}h</p>
            </div> */}
            {items.length > 0 && items.map((card, index) => {
                return (<AbsoluteItem key={card.id} card={card} id={card.id} yoffset={position.y} xoffset={position.x + index * xoffsetMultiplier} width={imageWidth} />)
            })}
            <h5 style={playerStyle}>Top player</h5>
        </div>
    );
}
