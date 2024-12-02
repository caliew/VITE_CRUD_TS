// my-app/src/utils/auth.ts
const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
};

const getToken = () => {
    return localStorage.getItem('accessToken');
};

const removeToken = () => {
    localStorage.removeItem('accessToken');
};

const setAccessCode = (token: string) => {
    localStorage.setItem('accessCode', token);
};

const getAccessCode = () => {
    return localStorage.getItem('accessCode');
};

const removeAccessCode = () => {
    localStorage.removeItem('accessCode');
};

export { setToken, getToken, removeToken, setAccessCode, getAccessCode, removeAccessCode };