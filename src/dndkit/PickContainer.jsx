import React, { useEffect, useRef, useState } from "react";

import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import useResize from "../utils/useResize"
import DraggableItem from "./DraggableItem";


export default function PickContainer(props) {
    console.log('Render PickContainer props=', props);
    const { id, items, maxHeight, imageWidth, disableDnD } = props;

    const elementRef = useRef(null);
    const [position, dimensions] = useResize(elementRef);

    // let height = maxHeight / 12;
    // if (height < 74 || height > 100) {
    //     height = 74;
    // }
    // console.log('[PickContainer] height=', height);

    const containerStyle = {
        position: "relative",
        // background: "yellow",
        padding: 10,
        // margin: 10,
        border: "1px solid black",
        // height: `${height}px`,
        height: "90px"
        // flex: 1,
        // flexDirection: "row",
        // display: "flex"
    };

    const style = {
        position: "absolute",
        left: `0px`,
        top: `0px`,
    };

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={horizontalListSortingStrategy}
        >
            <div ref={elementRef} style={containerStyle}>
            <h2>Click to get a card</h2>
                {/* <div style={style}>
                    <p>X: <strong>{position.x}</strong></p>
                    <p>Y: <strong>{position.y}</strong></p>
                    <p>Dimensions: {dimensions.width}w {dimensions.height}h</p>
                </div> */}
                {items && items.length > 0 && items.map((card, index) => {
                    return (<DraggableItem key={card.id} card={card} id={card.id} xoffset={dimensions.width / 2 + index / 5} yoffset={4 + index / 5} imageWidth={imageWidth} disableDnD={disableDnD}/>)

                })}
            </div>
        </SortableContext >
    );
}
