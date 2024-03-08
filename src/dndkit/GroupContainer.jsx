import React from "react";

import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";


export default function GroupContainer(props) {
    console.log('Render GroupContainer props=', props);
    const { id, items, imageWidth } = props;

    const { setNodeRef } = useDroppable({
        id
    });

    const containerStyle = {
        background: "grey",
        padding: 10,
        border: "1px solid black",
        flex: 0.2,
        flexDirection: "row",
        display: "flex"
    };

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={horizontalListSortingStrategy}
        >
            <div ref={setNodeRef} style={containerStyle}>
                {items.length > 0 && items.map((card, index) => {
                    return (<SortableItem key={card.id} card={card} id={card.id} imageWidth={imageWidth} />)
                })}
            </div>
        </SortableContext>
    );
}
