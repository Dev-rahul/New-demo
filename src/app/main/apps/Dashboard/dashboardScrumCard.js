import React, {useEffect, useRef, useState} from 'react';
import {Menu, MenuItem, Hidden, Icon, IconButton, Tab, Tabs, Typography} from '@material-ui/core';
import {FuseAnimateGroup, FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import { width } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    content          : {
        '& canvas': {
            maxHeight: '100%'
        },
    },
}));

function DashboardScrumCard(props)
{
    const dispatch = useDispatch();
   
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [selectedProject, setSelectedProject] = useState({
        id    : 1,
        menuEl: null
    });


   

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function handleChangeProject(id)
    {
        setSelectedProject({
            id,
            menuEl: null
        });
    }

    function handleOpenProjectMenu(event)
    {
        setSelectedProject({
            id    : selectedProject.id,
            menuEl: event.currentTarget
        });
    }

    function handleCloseProjectMenu()
    {
        setSelectedProject({
            id    : selectedProject.id,
            menuEl: null
        });
    }

    // if ( !widgets || !projects )
    // {
    //     return null;
    // }

    return (
        <FusePageSimple
            
            
            classes={{
                content     : classes.content,
                
            }}
            
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                    
                >
                    <Tab className="text-14 font-600 normal-case" label="Queue 1"/>
                    <Tab className="text-14 font-600 normal-case" label="Queue 2"/>
                    <Tab className="text-14 font-600 normal-case" label="Queue 3"/>
                </Tabs>
            }
            content={
                <div className="p-12" >
                    {tabValue === 0 &&
                    (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                            
                        >
                            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12" >
                                <span>Queue 1 content</span>
                            </div>
                            
                        </FuseAnimateGroup>
                    )}
                    {tabValue === 1 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <span>Queue 2 content</span>
                            </div>
                            
                        </FuseAnimateGroup>
                    )}
                    {tabValue === 2 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <div className="widget flex w-full p-12">
                                <span>Queue 3 content</span>
                            </div>
                        </FuseAnimateGroup>
                    )}
                </div>
            }
            
            ref={pageLayout}
        />
    );
}

export default (DashboardScrumCard);
