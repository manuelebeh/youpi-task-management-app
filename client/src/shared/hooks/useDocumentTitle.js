import {useEffect, useRef} from 'react';

// Hooks pour définir le titre de la page
export default function useDocumentTitle(title, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = `${title} - Youpi Task Management`;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [prevailOnUnmount]);

    return null;
}