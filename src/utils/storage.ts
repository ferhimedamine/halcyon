export const getItem = (key: string) =>
    sessionStorage.getItem(key) || localStorage.getItem(key);

export const setItem = (key: string, value: string, persist?: boolean) => {
    if (persist) {
        sessionStorage.removeItem(key);
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
        sessionStorage.setItem(key, value);
    }
};

export const removeItem = (key: string) => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
};
