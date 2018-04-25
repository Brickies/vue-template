export const action = async () => {
    const aw = await new Promise((resolve) => {
        resolve('hello action');
    });
    return aw;
};
