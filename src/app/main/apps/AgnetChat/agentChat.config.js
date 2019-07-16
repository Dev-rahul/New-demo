import React from 'react';

export const AgentChatConfig = {
    settings: {
        layout: {
            config: {
                
            }
        }
    },
    routes  : [
        {
            path     : '/apps/agentchat',
            component: React.lazy(() => import('./agentchat'))
        },
        {
            path     : '/apps/chatHistory',
            component: React.lazy(() => import('./agentChatHistory'))
        },
        {
            path     : '/apps/chatLog',
            component:  React.lazy(() => import('./agentChatLog.js'))
        }
    ]
};
