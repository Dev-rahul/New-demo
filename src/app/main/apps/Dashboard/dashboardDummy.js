import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Menu,
  MenuItem,
  Hidden,
  Fab,
  FormControlLabel,
  Checkbox,
  Icon,
  IconButton,
  Paper,
  Tab,
  Tabs,
  InputLabel,
  Select,
  Typography,
  FormControl
} from "@material-ui/core";
import { FuseAnimateGroup, FusePageSimple } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import reducer from "../store/reducers";
import withReducer from "app/store/withReducer";
import AgentCard from "./agentCard";
import QueueCard from "./queueCard";
import AgentDistribution from "./agentDistribution";
import GraphComponent from "./graphComponent";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import DashBoardScrumCard from "./dashboardScrumCard";
let ResponsiveReactGridLayout = WidthProvider(Responsive);
let originalLayouts = getFromLS("layouts") || {};
let origialItems = getItemsLS("items") || {
  agents: true,
  queues: true,
  oldQueue: true,
  callsAndAgents: true,
  agentDistribution: true
};

const useStyles = makeStyles(theme => ({
  content: {
    "& canvas": {
      maxHeight: "100%"
    }
  }
}));

function DashboardDummy(props) {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState("");
  const settings = useSelector(({fuse}) => fuse.settings.current.layout.config.navbar.folded);
  console.log("settings",settings);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dashboardItems, setDashboardItems] = useState(
    JSON.parse(JSON.stringify(origialItems))
  );

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleChange = name => event => {
    let tempItems = dashboardItems;
    setDashboardItems({ ...dashboardItems, [name]: !dashboardItems[name] });

    tempItems[name] = !tempItems[name];
    console.log(tempItems);
    saveItemsLS("items", tempItems);
  };

  //const settings = useSelector(({fuse}) => fuse.settings.current.layout.config.navbar.folded);
  const queueList = useSelector(
    ({ socketReducer }) => socketReducer.socket.queueList
  );
  const agentList = useSelector(
    ({ socketReducer }) => socketReducer.socket.agentList
  );
  //console.log("settings", queueList, agentList)
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [layout, setlayout] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );
  const [graphHeight, setGraphHeight] = useState(400);
  const [graphWidth, setGraphWidth] = useState(900);
  const [tabValue, setTabValue] = useState(0);
  const [isFullscreenEnabled, setFullScreen] = React.useState(false);
  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    menuEl: null
  });
  let grapContainer = useRef();



  /////////// table menu /////////



  const [anchorElTable, setAnchorElTable] = React.useState(null);
  const [columnFilter, setcolumnFilter] = React.useState({
    agent_name: true,
    state: true,
    queue: true,
    caller_id: true,
    queue_belongs: true,
    day_handled: true,
    day_missed: true
  });



  function handleClickTableMenu(event) {
    setAnchorElTable(event.currentTarget);
  }

  function handleCloseTableMenu() {
    setAnchorElTable(null);
  }








  const Precolumns = [
    {
      Header: 'Agent Name',
      accessor: 'agent_name',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    },
    {
      Header: 'State',
      accessor: 'state',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    },
    {
      Header: 'Queue',
      accessor: 'queue',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    },
    {
      Header: 'Caller ID',
      accessor: 'caller_id',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    },
    {
      Header: 'Queue Membership',
      accessor: 'queue_belongs',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    },
    {
      Header: 'Day Answered',
      accessor: 'day_handled',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    },
    {
      Header: 'Day Missed',
      accessor: 'day_missed',
      show: true,
      headerStyle:{background: "#fcf8f2"}
    }
  ]
  const [columns, setColumns] = useState(Precolumns)



  const handleChangeTable = (name, index) => event => {
    let newColumns = [...columns]
    newColumns[index].show = !newColumns[index].show
    setColumns(newColumns);
    console.log("columnscolumnscolumnscolumns",columns)
    setcolumnFilter({ ...columnFilter, [name]: event.target.checked });

  }



  //////////////////////table menu end    //////////////////////////
  // useLayoutEffect(() => {
  //   console.log("qqqqqqqqq", grapContainer.current.getClientBoundingRect())
  //  // setDimensions(grapContainer.current.getClientBoundingRect());

  //   }, [])
  useEffect(() => {
    if (grapContainer) {
      console.log("grapContainer.clientHeight", grapContainer.current.clientHeight);
     setGraphHeight(grapContainer.current.clientHeight);
    setGraphWidth(grapContainer.current.clientWidth);
    }
  }, [graphHeight, graphWidth]);

  function handleTimerSwitchChange(event) {
    console.log("event.target.name", event.target.name, event.target.value);
    setValues(event.target.value);
    // setValues(oldValues => ({
    //   ...oldValues,
    //   [event.target.name]: event.target.value,
    // }));
  }
  function onResize() {
    if (grapContainer) {
      console.log("grapContainer", grapContainer);
      setGraphHeight(grapContainer.current.clientHeight);
    setGraphWidth(grapContainer.current.clientWidth);
    }
  }

  function resetLayout() {
    setlayout({});
    setDashboardItems({
      agents: true,
      queues: true,
      oldQueue: true,
      callsAndAgents: true,
      agentDistribution: true
    });
  }

  function onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);

    setlayout(layouts);

    //   console.log(layout);

    //   console.log("layouts", layouts)
  }

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleChangeProject(id) {
    setSelectedProject({
      id,
      menuEl: null
    });
  }

  function handleOpenProjectMenu(event) {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: event.currentTarget
    });
  }

  function handleCloseProjectMenu() {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: null
    });
  }
  function handleFullScreenChange(isFullscreenEnabled) {
    setFullScreen(isFullscreenEnabled);
  }
  useEffect(() => {
    let updateLayout = getFromLS("layouts");
    let updateItem = getItemsLS("items")|| dashboardItems;
    setlayout(updateLayout);
    setDashboardItems(updateItem);
  },[])
  useEffect(() => {
    ResponsiveReactGridLayout = WidthProvider(Responsive);
    let updateLayout = getFromLS("layouts");
    setlayout(updateLayout);
  }, [settings]);
  const queueOverView = (
    <div
      key="1"
      data-grid={{
        key: "1",
        w: 12,
        h: 10,
        x: 0,
        y: 0,
        minW: 12,
        minH: 10,
        i: "1"
      }}
      style={{ width: "100%", flexGrow: 1 }}
    >
      <Paper
        className="w-full rounded-8 shadow-none border-1"
        color="primary"
        style={{
          borderRadius: 4,
          borderWidth: 1,
          height: "100%",
          width: "100%"
        }}
      >
        <div
          className="flex items-center justify-between px-8  border-b-1"
          style={{ cursor: "move" }}
        >
          <Typography className="text-16">Queue Overview</Typography>
          <div className="MyNonDraggableAreaClassName">
            <FormControl
              className="MyNonDraggableAreaClassName"
              style={{ width: "100px", paddingRight: "10px" }}
            >
              <InputLabel htmlFor="age-simple">Loop(sec)</InputLabel>
              <Select
                value={values}
                onChange={handleTimerSwitchChange}
                inputProps={{
                  name: "autoswitchtimer",
                  id: "age-simple"
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={60}>60</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              size="small"
              color="secondary"
              style={{ marginRight: "2px", marginTop: "20px" }}
              onClick={() => setFullScreen(true)}
            >
              <Icon>fullscreen</Icon>
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              style={{ marginTop: "20px" }}
              onClick={handleChange("queues")}
            >
              <Icon>close</Icon>
            </IconButton>
          </div>
        </div>
        <div
          className="flex flex-col flex-1 w-full"
          style={{ height: "82%", width: "100%", overflow: "auto" }}
        >
          <div
            className="flex flex-col flex-1  w-full mx-auto "
            style={{ height: "100%", width: "100%" }}
          >
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
              className="flex flex-wrap px-2 "
              style={{ height: "100%", width: "100%" }}
            >
              <DashBoardScrumCard
                queueList={queueList}
                agentList={agentList}
                isFullscreenEnabled={isFullscreenEnabled}
                handleFullScreenChange={handleFullScreenChange}
              />
            </FuseAnimateGroup>
          </div>
        </div>
      </Paper>
    </div>
  );

  const agents = (
    <div
      key="2"
      data-grid={{
        key: "2",
        w: 12,
        h: 10,
        x: 0,
        y: 10,
        minW: 5,
        minH: 9,
        i: "2"
      }}
    >
      <Paper
        className="w-full rounded-8 shadow-none border-1"
        color="primary"
        style={{
          borderRadius: 4,
          borderWidth: 1,
          height: "100%",
          width: "100%"
        }}
      >
        <div
          className="flex items-center justify-between px-8 py-8 border-b-1"
          style={{ cursor: "move" }}
        >
          <Typography className="text-16">Agents</Typography>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleChange("agents")}
          >
            <Icon>close</Icon>
          </IconButton>
        </div>
        <div
          className="flex flex-col flex-1 w-full"
          style={{ maxHeight: "82%", width: "100%", overflow: "auto" }}
        >
          <div
            className="flex flex-col flex-1  w-full mx-auto "
            style={{ height: "100%", width: "100%" }}
          >
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
              className="flex flex-wrap px-16"
            >
              {agentList.map(function(agent, index) {
                return <AgentCard key={index} agentData={agent} />;
              })}
            </FuseAnimateGroup>
          </div>
        </div>
      </Paper>
    </div>
  );
  const queues = (
    <div
      key="3"
      data-grid={{
        key: "3",
        w: 12,
        h: 10,
        x: 0,
        y: 20,
        minW: 5,
        minH: 9,
        i: "3"
      }}
    >
      <Paper
        className="w-full rounded-8 shadow-none border-1"
        color="primary"
        style={{
          borderRadius: 4,
          borderWidth: 1,
          height: "100%",
          width: "100%"
        }}
      >
        <div
          className="flex items-center justify-between px-8 py-8 border-b-1"
          style={{ cursor: "move" }}
        >
          <Typography className="text-16">Queue</Typography>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleChange("oldQueue")}
          >
            <Icon>close</Icon>
          </IconButton>
        </div>
        <div
          className="flex flex-col flex-1 w-full"
          style={{ maxHeight: "82%", width: "100%", overflow: "auto" }}
        >
          <div
            className="flex flex-col flex-1  w-full mx-auto MyNonDraggableAreaClassName"
            style={{ height: "100%", width: "100%" }}
          >
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
              className="flex flex-wrap px-2"
            >
              {queueList.map(function(queue, index) {
                return <QueueCard key={index} queueData={queue} />;
              })}
            </FuseAnimateGroup>
          </div>
        </div>
      </Paper>
    </div>
  );
  const agentDistribution = (
    <div
      key="4"
      data-grid={{
        key: "4",
        w: 12,
        h: 10,
        x: 0,
        y: 30,
        minW: 5,
        minH: 9,
        i: "4"
      }}
    >
      <Paper
        className="w-full rounded-8 shadow-none border-1"
        color="primary"
        style={{
          borderRadius: 4,
          borderWidth: 1,
          height: "98%",
          width: "100%"
        }}
      >
        <div
          className="flex items-center justify-between px-8 py-8 border-b-1"
          style={{ cursor: "move" }}
        >
          <Typography className="text-16">Agent Distribution</Typography>




          <div >
        <div style={{ float: "left" }}>
          <IconButton className="h-40 w-40 p-0" aria-owns={anchorElTable ? 'simple-menuTable' : null} aria-haspopup="true" onClick={handleClickTableMenu}>
            <Icon>more_horiz</Icon>
          </IconButton>
          <Menu
            id="simple-menuTable"
            anchorEl={anchorElTable}
            open={Boolean(anchorElTable)}
            onClose={handleCloseTableMenu}
          >

            {columns.map((data, index) => <MenuItem key={data.accessor} onClick={handleCloseTableMenu}><FormControlLabel
              control={
                <Checkbox checked={columnFilter[data.accessor]} onChange={handleChangeTable(data.accessor, index)} value={data.accessor} />
              }
              label={data.Header}
            /></MenuItem>)}

          </Menu>

        </div>
      




          <IconButton
            size="small"
            color="secondary"
            onClick={handleChange("agentDistribution")}
          >
            <Icon>close</Icon>
          </IconButton>
          </div>
        </div>
        <div
          className="flex flex-col flex-1 w-full"
          style={{ maxHeight: "82%", width: "100%", overflow: "auto" }}
        >
          <div
            className="flex flex-col flex-1  w-full mx-auto MyNonDraggableAreaClassName"
            style={{ height: "100%", width: "100%" }}
          >
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
              className="flex flex-wrap px-2"
            >
              <AgentDistribution agentData={agentList} columFilter={columns} />
            </FuseAnimateGroup>
          </div>
        </div>
      </Paper>
    </div>
  );
  const callsAndAgents = (
    <div
      key="5"
      data-grid={{
        key: "5",
        w: 12,
        h: 10,
        x: 0,
        y: 40,
        minW: 5,
        minH: 9,
        i: "5"
      }}
    >
      <Paper
        className="w-full rounded-8 shadow-none border-1"
        color="primary"
        style={{
          borderRadius: 4,
          borderWidth: 1,
          height: "100%",
          width: "100%"
        }}
      >
        <div
          className="flex items-center justify-between px-8 py-8 border-b-1"
          style={{ cursor: "move" }}
        >
          <Typography className="text-16">Calls And Agent</Typography>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleChange("callsAndAgents")}
          >
            <Icon>close</Icon>
          </IconButton>
        </div>
        <div
          className="flex flex-col flex-1 w-full"
          style={{ height: "90%", width: "100%" }}
        >
          <div
            className="flex flex-col flex-1  w-full mx-auto MyNonDraggableAreaClassName"
            style={{ height: "100%", width: "100%", overflow: "auto" }}
            ref={grapContainer}
          >
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
              className="flex flex-wrap px-16"
            >
              {queueList.length > 0 ? (
                <GraphComponent
                  queueData={queueList}
                  graphHeight={graphHeight}
                  graphWidth={graphWidth}
                />
              ) : null}
            </FuseAnimateGroup>
          </div>
        </div>
      </Paper>
    </div>
  );
  // if ( !widgets || !projects )
  // {
  //     return null;
  // }

  return (
    <div style={{ flexGrow: 1 }}>
      <div className="p-2" style={{ float: "right" }}>
        <Fab onClick={() => resetLayout()} size="small" color="secondary">
          <Icon>restore</Icon>
        </Fab>

        <Fab
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="secondary"
          size="small"
          style={{ marginLeft: "5px" }}
          onClick={handleClick}
        >
          <Icon>settings</Icon>
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dashboardItems.agents}
                  onChange={handleChange("agents")}
                  value={dashboardItems.agents}
                />
              }
              label="Agents"
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dashboardItems.queues}
                  onChange={handleChange("queues")}
                  value={dashboardItems.queues}
                />
              }
              label="Queue Overview"
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dashboardItems.oldQueue}
                  onChange={handleChange("oldQueue")}
                  value={dashboardItems.oldQueue}
                />
              }
              label="Queue"
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dashboardItems.agentDistribution}
                  onChange={handleChange("agentDistribution")}
                  value={dashboardItems.agentDistribution}
                />
              }
              label="Agent Distribution"
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dashboardItems.callsAndAgents}
                  onChange={handleChange("callsAndAgents")}
                  value={dashboardItems.callsAndAgents}
                />
              }
              label="Calls And Agents"
            />
          </MenuItem>
        </Menu>
      </div>
      <ResponsiveReactGridLayout
        key="responsiveGrid"
        style={{ width: "100%", flexGrow: 1, marginTop: "40px" }}
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        draggableCancel=".MyNonDraggableAreaClassName"
        rowHeight={30}
        layouts={layout}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        onResizeStop={onResize}
      >
        {dashboardItems.queues ? (
          queueOverView
        ) : (
          <div
            key="w"
            data-grid={{
              w: 0,
              h: 0,
              minW: 0,
              minH: 0,
              x: 0,
              y: 1,
              i: "6",
              static: true
            }}
          />
        )}
        {dashboardItems.agents ? (
          agents
        ) : (
          <div
            key="q"
            data-grid={{
              w: 0,
              h: 0,
              minW: 0,
              minH: 0,
              x: 0,
              y: 1,
              i: "5",
              static: true
            }}
          />
        )}
        {dashboardItems.oldQueue ? (
          queues
        ) : (
          <div
            key="oq"
            data-grid={{
              w: 0,
              h: 0,
              minW: 0,
              minH: 0,
              x: 0,
              y: 1,
              i: "9",
              static: true
            }}
          />
        )}
        {dashboardItems.agentDistribution ? (
          agentDistribution
        ) : (
          <div
            key="e"
            data-grid={{
              w: 0,
              h: 0,
              minW: 0,
              minH: 0,
              x: 0,
              y: 1,
              i: "7",
              static: true
            }}
          />
        )}
        {dashboardItems.callsAndAgents ? (
          callsAndAgents
        ) : (
          <div
            key="r"
            data-grid={{
              w: 0,
              h: 0,
              minW: 0,
              minH: 0,
              x: 0,
              y: 1,
              i: "8",
              static: true
            }}
          />
        )}
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

function saveItemsLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "items",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function getItemsLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("items")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

//export default (DashboardDummy);
export default withReducer("socketReducer", reducer)(DashboardDummy);
