export const loadState = () => {
    try {
        const serializedConnection = localStorage.getItem('user');
        console.log({LOAD_STATE:JSON.parse(serializedConnection)})
        if(serializedConnection === null) {
            return undefined;
        }
        return JSON.parse(serializedConnection)
    } catch (error) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        console.log(state)
        const serializedConnection = JSON.stringify(state);
        localStorage.setItem('user',serializedConnection)
    } catch (error) {

    }
}