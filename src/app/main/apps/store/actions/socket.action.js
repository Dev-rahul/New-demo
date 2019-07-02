export const UPDATE_AGENT = '[APPS] UPDATE_AGENT';
export const UPDATE_QUEUE = '[APPS] UPDATE_QUEUE';
export function updateAgentList(agentList)
{
    return {
        type   : UPDATE_AGENT,
        payload: agentList
    }
}
export function updateQueueList(queueList)
{
    return {
        type   : UPDATE_QUEUE,
        payload: queueList
    }
}