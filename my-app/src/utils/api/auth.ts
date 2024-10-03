// my-app/src/utils/auth.ts
const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
};

const getToken = () => {
    return localStorage.getItem('accessToken');
};

const removeToken = () => {
    console.log('..remove token..');
    localStorage.removeItem('accessToken');
    console.log('..verify..',localStorage.getItem('accessToken'));
};

export { setToken, getToken, removeToken };