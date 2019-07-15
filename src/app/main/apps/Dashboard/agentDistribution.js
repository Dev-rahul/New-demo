import React, { useState } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DraggableTable from './draggableTable';
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import RightSideLayout1 from 'app/fuse-layouts/layout1/components/RightSideLayout1'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { InputAdornment, IconButton, FormControl, Tooltip } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles({
  spanButton: {
    width: '95%'
  },
  addButton: {
    float: 'right',
    color: 'red',
    padding: 'inherit'
  }
})

function AgentDistributionTable(props) {
  const [distributionData, setAgentDistributionData] = useState([]);
  let dataToBeAdded_agents = [];
  props.agentData.map(agent => {

    let agentName = '';
    if (agent.firstName !== '') {
      agentName += agent.firstName;
    }
    if (agent.lastName !== '') {
      agentName += agent.lastName;
      // agentName = (<Tooltip title={agentName}placement="top">
      // <span></span>{agentName}
      // </Tooltip>)
    }
    if (agent.extension !== '') {
      agentName += "(x" + agent.extension + ")";
    }
    let queueList = '', queueBelongs = '';
    agent.queues.map(queue => {
      queueList += queue.name + " (q" + queue.extension + ") ";
      queueBelongs += " (q" + queue.extension + ") ";
    })
    let callerId = '';
    if (agent.call_id !== "undefined") {

      if (agent.caller_num.length > 8 && agent.caller_num !== "undefined") {
        callerId = agent.caller_num;

      } else {

        if (agent.caller_name !== "undefined")
          callerId = agent.caller_num + ' (' + agent.caller_name + ')';
        else
          callerId = agent.caller_num;
      }
    }
    dataToBeAdded_agents.push({
      agent_name: (<Tooltip title={agentName} placement="top"><span>{agentName}</span></Tooltip>),
      agent: (<Tooltip title={agent.extension} placement="top"><span>{agent.extension}</span></Tooltip>),
      state: (<Tooltip title={agent.state} placement="top"><span>{agent.state}</span></Tooltip>),
      queue: (<Tooltip title={queueList} placement="top"><span>{queueList}</span></Tooltip>),
      caller_id: (<Tooltip title={callerId} placement="top"><span>{callerId}</span></Tooltip>),
      queue_belongs: (<Tooltip title={queueBelongs} placement="top"><span>{queueBelongs}</span></Tooltip>),
      day_handled: (<Tooltip title={agent.day_handled} placement="top"><span>{agent.day_handled}</span></Tooltip>),
      day_missed: (<Tooltip title={agent.day_missed} placement="top"><span>{agent.day_missed}</span></Tooltip>)
    });
  });
  // setAgentDistributionData(dataToBeAdded_agents);
  // const [filterMenuEl, setAnchorEl] = React.useState(null);
  
  /* 
  const handleChange = name => event => {
  console.log('1234567890',name)
  setcolumnFilter({ ...columnFilter, [name]: event.target.checked });
  const index = columns.map(e => e.accessor).indexOf(name);
  handleShow(index);
  }; */


  return (
    <div className="flex flex-col justify-between flex-1 px-2 pt-2" style={{ marginBottom: '10px', height: "100%", width: "100%" }}>
      
      <DraggableTable
        rows={dataToBeAdded_agents}
        columns={props.columFilter}
        className='-striped -highlight'
        filterable={false}
        show='true'
      />


    </div>
  )
}

export default AgentDistributionTable