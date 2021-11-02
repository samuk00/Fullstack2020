const emptyNotification = null

export const setNotification = (notification) => {
    return dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', data: notification })
        setTimeout(() => {
            dispatch(removeNotification())
        }, 3000)
    }
}

const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const notificationReducer = (state = emptyNotification, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return emptyNotification
        default:
            return state
    }

}

export default notificationReducer