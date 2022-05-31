const loading = (state = false, action) => {
    switch(action.type) {
        case 'isLoaded':
            return !state
    }
}

export default loading