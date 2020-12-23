const emptyFilter = null

export const setFilter = (filter) => {
    return {
        type: 'FILTER',
        data: filter
    }
}

const filterReducer = (state = emptyFilter, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data
        default:
            return state
    }
}

export default filterReducer