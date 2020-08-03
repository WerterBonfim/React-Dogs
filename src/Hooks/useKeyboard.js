import { useState, useCallback, useEffect } from 'react';

const useKeyboard = ({ keyWatch, eventName }) => {


    const [keyPressed, setKeyPressed] = useState(false);

    const handleKeyboardPreesed = useCallback((event) => {

        const { key } = event;        

        if (key === keyWatch)
            setKeyPressed(true);

    }, [keyWatch]);

    useEffect(() => {
        
        window.addEventListener(eventName, handleKeyboardPreesed);

        return () => {
            window.removeEventListener(eventName, handleKeyboardPreesed);
        }

    }, [handleKeyboardPreesed, eventName]);


    return { keyPressed };
}

export default useKeyboard;
