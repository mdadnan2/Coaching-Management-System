export const getCopy = (object) => {
    return JSON.parse(JSON.stringify(object));
}