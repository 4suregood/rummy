import React, { useEffect, useRef, useState } from "react";


import SortableAbsItem
    from "./SortableAbsItem";
import useResize from "../utils/useResize"
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    rectSwappingStrategy,
    rectSortingStrategy,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

//<DeleteOutlinedIcon />
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function DropContainer(props) {
    // console.log('Render DropContainer props=', props);
    const { id, items, maxHeight, imageWidth, disableDnD } = props;
    // const elementRef = useRef(null);
    // const [position, dimensions] = useResize(elementRef);
    const { setNodeRef } = useDroppable({
        id, disabled: disableDnD
    });

    // let height = maxHeight / 12;
    // if (height < 84) {
    //     height = 84;
    // }
    // console.log('[DropContainer] height=', height);

    const containerStyle = {
        position: "relative",
        // background: "red",
        padding: 10,
        // margin: 10,
        border: "1px solid black",
        // height: `${height}px`,
        height: "90px"
        // flex: 1,
        // flexDirection: "row",
        // display: "flex"
    };

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        // strategy={rectSortingStrategy}
        >
            {/* <div ref={elementRef} > */}

            <div ref={setNodeRef} style={containerStyle}>
                {/* <div style={containerStyle}> */}
                <DeleteOutlinedIcon />
                <h2>Discard Area</h2>
                {items.length > 0 && items.map((card, index) => {
                    return (<SortableAbsItem
                        key={card.id}
                        card={card}
                        id={card.id}
                        // xoffset={dimensions.width / 2 + index / 2}
                        xoffset={100 + index / 2}
                        yoffset={4 + index / 2}
                        imageWidth={imageWidth} />)
                })}
            </div>
            {/* </div> */}
        </SortableContext>
    );
}
