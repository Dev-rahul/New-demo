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
        }
    ]
};
