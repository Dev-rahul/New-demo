import * as Actions from '../actions';
import _ from '@lodash';
const initialState = {
    agentList       : [],
    queueList       : []
};
const socketReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.UPDATE_AGENT:
        {
         //   console.log("in reducer agent", action.payload, state.agentList);
            let tempAgentList = [...state.agentList];
            if(tempAgentList.length> 0) {
                action.payload.map(currAgent => {
                    let index = 0;
                    tempAgentList.map(agent => {
                        if(agent.extension === currAgent.extension) {
                            //  queue.current_calls = currQueue.current_calls;
                            tempAgentList.splice(index, 1, currAgent);
                        }
                        index = index+ 1;
                    })
                })
            } else {
                tempAgentList = [...action.payload]
            }
            
            return {
                ...state,
                agentList: [...tempAgentList]
            };
        }
        case Actions.UPDATE_QUEUE:
        {
           // console.log("in reducer queue", action.payload, state.queueList)
            let tempQueList = [...state.queueList];
            if(tempQueList.length > 0) {
                action.payload.map(currQueue => {
                    let index = 0;
                    tempQueList.map(queue => {
                        if(queue.extension === currQueue.extension) {
                            //  queue.current_calls = currQueue.current_calls;
                            tempQueList.splice(index, 1, currQueue);
                        }
                        index = index+ 1;
                    })
                })
            } else {
                tempQueList = [...action.payload] 
            }
            
            return {
                ...state,
                queueList: [...tempQueList]
            };
        }
        default:
       // console.log("in default")
            return state;
    }
}
export default socketReducer;