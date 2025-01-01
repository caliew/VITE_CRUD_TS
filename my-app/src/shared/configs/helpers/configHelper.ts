const getEnvValue = (key:string) => {
    const result = import.meta.env[key];
    if (result) {
        return result;
    }
    throw new Error(`Unable to obtain value from ['${key}'] from the environment variable.`);
}
const isTrue = (key:string) => getEnvValue(key) === "true";

export { getEnvValue, isTrue };