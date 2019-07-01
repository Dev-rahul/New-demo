import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {appsConfigs} from 'app/main/apps/appsConfig'

const routeConfigs = [
    ...appsConfigs
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="apps"/>
    }
];

export default routes;
