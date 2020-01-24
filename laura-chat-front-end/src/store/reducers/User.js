const INITIAL_STATE = {
    user : {}
}

function user (state= INITIAL_STATE,action)  {
    switch (action.type) {
        case 'ADD_USER':                                                     
            return Object.assign({}, state, {
                user: action.user
            });    
        default:
            return state;
    }
}

export default user ;