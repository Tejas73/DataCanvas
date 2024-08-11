import { useState, useEffect } from "react";

export const useDimensions = () => {
    const [vizWidth, setVizWidth] = useState(960);
    const [vizHeight, setVizHeight] = useState(500);
    const [fontSizeText, setFontSizeText] = useState(20);

    useEffect(() => {
        const handleResize = () => {
            // for small screens
            if (window.innerWidth < 450 && window.innerHeight < 1000) {
                setVizWidth(350);
                setVizHeight(300);
                setFontSizeText(12);
            }
            // for medium screens 
            else if (window.innerWidth < 1000 && window.innerHeight < 450) {
                setVizWidth(800);
                setVizHeight(350);
                setFontSizeText(16);
            }
            // for large screens 
            else {
                setVizWidth(960);
                setVizHeight(500);
                setFontSizeText(20);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);
    return { vizWidth, vizHeight, fontSizeText };
}