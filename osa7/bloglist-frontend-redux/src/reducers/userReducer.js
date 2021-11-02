export const setUser = (userData) => {
    return {
        type: 'SET_USER',
        data: userData
    }
}

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data
        default:
            return state
    }
}

export default userReducer