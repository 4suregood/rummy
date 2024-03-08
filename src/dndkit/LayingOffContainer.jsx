import React, { useEffect, useRef, useState } from "react";

import GroupContainer from "./GroupContainer";

export default function LayingOffContainer(props) {
    console.log('Render LayingOffContainer props=', props);
    const { id, items, maxHeight, imageWidth, imageHeight } = props;


    const containerStyle = {
        // background: "red",
        padding: 10,
        border: "1px solid black",
        minHeight: `${imageHeight + 24}px`,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        display: "flex"
    };

    return (
        <div style={containerStyle}>
            {/* <h2>Laying Off Area</h2> */}
            {items.length > 0 && items.map((arr, index) => {
                return (
                    <GroupContainer
                        key={index}
                        items={arr}
                        id={`group${index}`}
                        imageWidth={imageWidth}
                    />
                )
            })}
        </div>
    );
}
