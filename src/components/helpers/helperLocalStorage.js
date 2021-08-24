export const getLocalStorage = value => {
    return JSON.parse(localStorage.getItem(value));
};

export const setLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
};
