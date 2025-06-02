export const myApplicationPromise = (email) => {
    return fetch(`${import.meta.env.VITE_API_URL}/applications?email=${email}`, {
        credentials: 'include',
    })
        .then(res => res.json());
};