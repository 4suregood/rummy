import { useState, useEffect } from "react";

const useResize = (elementRef) => {

    const [position, setPosition] = useState({ x: 10, y: 10 });
    const [dimensions, setDimensions] = useState({ width: 300, height: 300 })

    useEffect(() => {
        const handleResize = () => {
            if (elementRef && elementRef.current) {
                // console.log('[useResize] elementRef.current=', elementRef.current);
                const x = elementRef.current.offsetLeft;
                const y = elementRef.current.offsetTop;
                setPosition({ x, y });

                const { current } = elementRef
                const boundingRect = current.getBoundingClientRect()
                const { width, height } = boundingRect
                setDimensions({ width: Math.round(width), height: Math.round(height) })
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // initial call to get position of the element on mount
        return () => window.removeEventListener("resize", handleResize);
    }, [elementRef]);

    return [position, dimensions];
};

export default useResize;
