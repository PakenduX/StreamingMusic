function toggle(state = {}, action) {
    let nextState ;
    switch (action.type) {
        case 'TOGGLE_CONNECTION':
            nextState = { ...state, isConnected: action.value.isConnected, username: action.value.username };
            return nextState;
        default:
            return state;

    }
}

export default toggle;