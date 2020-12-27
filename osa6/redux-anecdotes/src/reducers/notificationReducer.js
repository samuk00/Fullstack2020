const emptyNotification = null
let timeoutID = null

export const setNotification = (notification, time) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch({ type: 'SET_NOTIFICATION', data: notification })
        timeoutID = setTimeout(() => dispatch(removeNotification()), time * 1000)
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