import React, { useEffect, useRef, useState } from "react";

import AbsoluteItem from "./AbsoluteItem";
import useResize from "../utils/useResize"
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

export default function AbsGroupContainer(props) {
    console.log('Render AbsGroupContainer props=', props);
    //<AbsGroupContainer key={index} items={arr} id={`group${index}`} xoffset={4 + index*2} yoffset={4 + index*2} width={imageWidth} />
    const { id, items, xoffset, yoffset, maxHeight, imageWidth, parentIndex } = props;
    const elementRef = useRef(null);
    const [position, dimensions] = useResize(elementRef);
    const { setNodeRef } = useDroppable({
        id
    });
    let height = (324 / 223) * parseInt(imageWidth, 10);
    // let height = maxHeight * 0.7;
    // if (height < 160 || height > 300) {
    //     height = 120;
    // }
    console.log('[AbsGroupContainer] height=', height);

    let width = parseInt(imageWidth) + 10 * items.length;
    // console.log('[AbsGroupContainer] width=', width);

    const containerStyle = {
        position: "relative",
        background: "grey",
        padding: 10,
        margin: 3,
        border: "1px solid black",
        // height: "300px",
        // height: `${maxHeight / 9}px`,
        height: `${height}px`,
        width: `${width}px` // "200px"
        // flex: 1,
        // flexDirection: "row",
        // display: "flex"
    };
    // console.log('[AbsGroupContainer] parentIndex=', parentIndex);

    const style = {
        position: "absolute",
        left: `${xoffset}px`,
        top: `${yoffset}px`,
    };

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={horizontalListSortingStrategy}
        >
            <div ref={elementRef} style={style}>
                <div ref={setNodeRef} style={containerStyle}>
                    <h5 style={style}>Laying Off Group</h5>
                    {items.length > 0 && items.map((card, index) => {
                        return (<AbsoluteItem key={card.id} card={card} id={card.id} xoffset={10 + index * 10} yoffset={10} width={imageWidth} />)
                    })}
                </div>
            </div>
            {/* <div>
                <p>X: <strong>{position.x}</strong></p>
                <p>Y: <strong>{position.y}</strong></p>
                <p>Dimensions: {dimensions.width}w {dimensions.height}h</p>
            </div> */}
        </SortableContext>
    );
}
