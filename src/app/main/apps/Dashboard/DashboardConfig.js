import Dashboard from './Dashboard';
import OneHrSumm from './onehrsumm';
import Settings from './settings';
import Apps from '../apps';
import {Redirect} from 'react-router-dom';

export const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        
        {
            path     : '/apps/dashboard',
            component: Dashboard
        },
        {
            path     : '/apps/one-hr-summ',
            component: OneHrSumm
        },
        {
            path     : '/apps/settings',
            component: Settings
        },
        {
            path     : '/apps',
            exact   : true,
            component: Apps
        },
    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboard',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
