export const loadState = () => {
    try {
        let persistedState = localStorage.getItem('state');
        if (persistedState === null) {
            return undefined
        }
        return JSON.parse(persistedState)
    } catch (error) {
        console.log("error while loading")
    }
}

export const saveState = (state) => {
    try {
        let persistedState = JSON.stringify(state)
        localStorage.setItem('state', persistedState)
    } catch (error) {
        console.log("Error while saving the state")
    }
}

