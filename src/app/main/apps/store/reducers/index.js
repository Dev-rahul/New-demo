import {combineReducers} from 'redux';
import socket from './socket.reducer';

const reducer = combineReducers({
    socket
});

export default reducer;
