import React, {useEffect, useRef, useState} from 'react';
import {Menu, MenuItem, Hidden, Icon, IconButton,Paper, Tab, Tabs, Typography} from '@material-ui/core';
import {FuseAnimateGroup, FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import AgentCard from './agentCard';
import QueueCard from './queueCard';

import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import DashBoardScrumCard from './dashboardScrumCard';
let ResponsiveReactGridLayout = WidthProvider(Responsive);
let originalLayouts = getFromLS("layouts") || {};


const useStyles = makeStyles(theme => ({
    content          : {
        '& canvas': {
            maxHeight: '100%'
        },
    },
}));

function DashboardDummy(props)
{
    const dispatch = useDispatch();
    const settings = useSelector(({fuse}) => fuse.settings.current.layout.config.navbar.folded);
    const queueList = useSelector(({socketReducer}) => socketReducer.socket.queueList);
    const agentList = useSelector(({socketReducer}) => socketReducer.socket.agentList);
    console.log("settings", queueList, agentList)
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [layout, setlayout] = useState(JSON.parse(JSON.stringify(originalLayouts)));
    const [tabValue, setTabValue] = useState(0);
    const [selectedProject, setSelectedProject] = useState({
        id    : 1,
        menuEl: null
    });



    function resetLayout() {
        setlayout( {} );
      }
    
    function onLayoutChange(layout, layouts) {
     //   console.log(layout);
        saveToLS("layouts", layouts);
     //   console.log("layouts", layouts)
        setlayout(layouts );
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

    useEffect(() => {
        let updateLayout = {...layout};
       // console.log("original layout", layout);
        // if ( settings )
        // {
        //     console.log("settings changed", settings);
        //     if(updateLayout.lg) {
        //         updateLayout.lg.map(layouts => {
        //             layouts.w = layouts.w -2;
        //         })
        //     }
            
        //     console.log("updated layout", updateLayout)
        //     saveToLS("layouts", updateLayout);
        //     setlayout(updateLayout );
        //     // layout.sm.map(layouts => {
        //     //     layouts.w = layouts.w -1;
        //     // })
            
        // } else {
        //     if(updateLayout.lg) {
        //     updateLayout.lg.map(layouts => {
        //         layouts.w = layouts.w + 5;
        //     })
        //     updateLayout.sm.map(layouts => {
        //         layouts.w = layouts.w + 5;
        //     })
        // }
        //     console.log("before save layout", updateLayout)
        //     saveToLS("layouts", updateLayout);
        //     setlayout(updateLayout );
        // }
        ResponsiveReactGridLayout = WidthProvider(Responsive);
        originalLayouts= layout;
    }, [settings]);

    // if ( !widgets || !projects )
    // {
    //     return null;
    // }

    return (
        <div style={{flexGrow: 1}} >
        <button onClick={() => resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout key="responsiveGrid"
            style={{width: "100%", flexGrow: 1}}
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          draggableCancel= '.MyNonDraggableAreaClassName'
          rowHeight={30}
          layouts={layout}
          onLayoutChange={(layout, layouts) =>
            onLayoutChange(layout, layouts)
          }
        >
        <div key="1" data-grid={{key: "1", w: 2, h: 6, x: 0, y: 0, minW: 2, minH: 6, i: "1" }} style={{width: "100%", flexGrow: 1}}>
            <div style={{maxWidth: "99%", maxHeight: "98%"}}>
                <DashBoardScrumCard queueList={queueList} agentList={agentList}/>
            </div>
          </div>
          <div key="2" data-grid={{key: "2", w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3, i: "2" }}>
            <Paper className="w-full rounded-8 shadow-none border-1" color="primary" style={{borderRadius: 4, borderWidth: 1, height: "100%", width: "100%"}}>
              <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{cursor: "crosshair",}} >
                <Typography className="text-16" >Agents</Typography>
                <IconButton size="small" color="secondary" ><Icon>close</Icon>
                </IconButton>
              </div>
              <div className="flex flex-col flex-1 w-full" style={{maxHeight: "82%", width: "100%", overflow: "auto"}}>
                <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto "
                  style={{height: "100%", width: "100%"}}>
                  <FuseAnimateGroup

                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                    className="flex flex-wrap px-16"

                  >
                      {agentList.map(function(agent, index){
                        return <AgentCard key={index} agentData={agent}/>         
                      })}
                </FuseAnimateGroup>
              </div>
            </div>
          </Paper>
          </div>
          <div key="3" data-grid={{key: "3", w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 , i: "3"}}>
          <Paper className="w-full rounded-8 shadow-none border-1" color="primary" style={{borderRadius: 4, borderWidth: 1, height: "100%", width: "100%"}}>
              <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{cursor: "crosshair",}} >
                <Typography className="text-16" >Queue</Typography>
                <IconButton size="small" color="secondary" ><Icon>close</Icon>
                </IconButton>
              </div>
              <div className="flex flex-col flex-1 w-full" style={{maxHeight: "82%", width: "100%", overflow: "auto"}}>
                <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto MyNonDraggableAreaClassName"
                  style={{height: "100%", width: "100%"}}>
                  <FuseAnimateGroup

                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                    className="flex flex-wrap px-16"

                  >
                      {queueList.map(function(queue, index){
                        return <QueueCard key={index} queueData={queue}/>         
                      })}
                </FuseAnimateGroup>
              </div>
            </div>
          </Paper>
          </div>
          <div key="4" data-grid={{key: "4", w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3, i: "4" }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{key: "5", w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3,  i: "5"}}>
            <span className="text">5</span>
          </div>
        </ResponsiveReactGridLayout>
        
        </div>
    );
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }
  
  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }

//export default (DashboardDummy);
export default withReducer('socketReducer', reducer)(DashboardDummy);
