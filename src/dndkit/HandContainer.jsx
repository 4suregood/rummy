import React from "react";

import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";


const containerStyle = {
    // background: "red",
    padding: 10,
    // margin: 10,
    border: "1px solid black",
    // flex: 1,
    flexDirection: "row",
    display: "flex"
};

export default function HandContainer(props) {
    console.log('Render HandContainer props=', props);
    const { id, items, imageWidth } = props;

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={horizontalListSortingStrategy}
        >
            <div style={containerStyle}>
                {items.length > 0 && items.map((card, index) => {
                    return (<SortableItem key={card.id} card={card} id={card.id} imageWidth={imageWidth} />)
                })}
            </div>
        </SortableContext>
    );
}
