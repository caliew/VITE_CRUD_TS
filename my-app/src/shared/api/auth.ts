// my-app/src/utils/auth.ts
const setJWTToken = (token: string) => {
    localStorage.setItem('JWTToken', token);
};

const getJWTToken = () => {
    return localStorage.getItem('JWTToken');
};

const removeJWTToken = () => {
    localStorage.removeItem('JWTToken');
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

export { setJWTToken, getJWTToken, removeJWTToken, setAccessCode, getAccessCode, removeAccessCode };