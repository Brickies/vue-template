export const action = async () => {
    const aw = await new Promise((resolve, reject) => {
        resolve('hello action')
    });
    return aw;
};
