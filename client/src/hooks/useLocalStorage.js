import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const persistedStateSerialized = localStorage.getItem(key);

        if (persistedStateSerialized) {
            const persistedState = JSON.parse(persistedStateSerialized);
            return persistedState;
        }

        return initialValue;
    });

    const setLocalStorageState = (value) => {
        // let resultState = state;
        setState(value);

        let serializedValue

        // if (typeof value === 'function') {
        //     resultState = value(state)
        // }

        localStorage.setItem(key, JSON.stringify(value));
    };

    return [state, setLocalStorageState];
};