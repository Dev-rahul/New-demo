import React, {useEffect, useRef, useState} from 'react';
import {Menu, MenuItem, Hidden, Icon, IconButton,Card, CardContent, Tab, Tabs, Typography} from '@material-ui/core';
import {FuseAnimateGroup, FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import { width } from '@material-ui/system';
import {darken} from '@material-ui/core/styles/colorManipulator';
import ScrumBoardCard from './scrumboardCard';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fullscreen from 'react-fullscreen-crossbrowser';




const useStyles = makeStyles(theme => ({
    content          : {
        '& canvas': {
            maxHeight: '100%'
        },
    },
    list: {
        backgroundColor         : darken(theme.palette.background.default, theme.palette.type === 'light' ? 0.02 : .4),
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    card: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
}));
const scrumBoardStates = [
    {
        id: 1,
        agents: [],
        title: "NEW LOGIN",
        colorName: 'away'
    },
    {
        id: 2,
        agents: [],
        title: "AWAY",
        colorName: 'away'
    },
    {
        id: 3,
        agents: [],
        title: "READY",
        colorName: 'ready'
    },
    {
        id: 4,
        agents: [],
        title: "BUSY",
        colorName: 'busy'
    },
    {
        id: 5,
        agents: [],
        title: "CALL BACK",
        colorName: 'callback'
    },
    {
        id: 6,
        agents: [],
        title: "ON QUEUE CALL",
        colorName: 'onqueuecall'
    },
    {
        id: 7,
        agents: [],
        title: "WRAP UP",
        colorName: 'wrapup'
    }

]

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

    const [expanded, setExpanded] = React.useState(false);
    const [isFullscreenEnabled, setFullScreen] = React.useState(false);
    
    function handleExpandClick() {
      setExpanded(!expanded);
    }
   

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

    // function escFunction(event){
    //         console.log("45454545545454");
    //         setFullScreen(!isFullscreenEnabled);
    //       //Do whatever when esc is pressed
    // }
    // useEffect(()=> {
    //     console.log("123123123")
    //     document.addEventListener("fullscreenchange", escFunction, false);
    //     return () => {
    //         document.removeEventListener("fullscreenchange", escFunction, false);
    //     }
    // })
    // if ( !widgets || !projects )
    // {
    //     return null;
    // }

    return (
        <div style={{height: "100%"}} className="MyNonDraggableAreaClassName">
            
        <Fullscreen
            enabled={props.isFullscreenEnabled}
            onChange={(isFullscreenEnabled) => props.handleFullScreenChange(isFullscreenEnabled)}
        >
        <FusePageSimple
            
            
            classes={{
                content     : classes.content,
                
            }}
            style={{height: "100%"}}
            
            contentToolbar={
             
                
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                    style={{height: "100%"}}
                    
                >
                {props.queueList.map(queue => {
                    return (
                        <Tab className="text-14 font-600 normal-case" key={queue.name} label={queue.name}/>
                    )
                })}
                </Tabs>
            }
            content={
                <div className="" style={{width: "100%", height: "100%"}}>
                    
                            <FuseAnimateGroup
                                className="flex flex-wrap"
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                                style={{width: "100%", height: "100%"}}
                            >
                            <div className="widget flex w-full sm:w-1/2 p-12" style={{width: "100%", height: "100%"}}>
                            {
                                scrumBoardStates.map(card=> {
                                    return (
                                        <div className="p-6" key={card.id} style={{height: "100%"}}>
                                            <ScrumBoardCard selectedQueue={props.queueList[tabValue]} 
                                            card={card}
                                            agentList={props.agentList}/>
                                        </div>
                                    )
                                })
                            }
                        
                            </div>
                        
                            </FuseAnimateGroup>
                        
                   
                    
                </div>
            }
            
            ref={pageLayout}
        />
        </Fullscreen>
        </div>
    );
}

export default (DashboardScrumCard);
