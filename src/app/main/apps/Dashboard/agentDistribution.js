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
import {InputAdornment, IconButton,FormControl} from '@material-ui/core'
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

function AgentDistributionTable (props) {
  const [distributionData, setAgentDistributionData] = useState([]);
  let dataToBeAdded_agents = [];
  props.agentData.map(agent => {

      let agentName = ''; 
      if(agent.firstName !== '') {
        agentName += agent.firstName;
      }
      if(agent.lastName !== '') {
        agentName += agent.lastName;
      }
      if(agent.extension !== '') {
        agentName +=  "(x" + agent.extension + ")";
      }
      let queueList = '', queueBelongs = '';
       agent.queues.map(queue => {
        queueList += queue.name + " (q" + queue.extension + ") ";
        queueBelongs += " (q" + queue.extension + ") ";
       })
       let callerId= '';
       if(agent.call_id !== "undefined") {

        if (agent.caller_num.length > 8 && agent.caller_num !== "undefined") {
            callerId = agent.caller_num;

        } else {

            if (agent.caller_name !=="undefined" )
            callerId = agent.caller_num + ' (' + agent.caller_name + ')';
            else
            callerId = agent.caller_num;
        }
       }
    dataToBeAdded_agents.push({
        agent_name: agentName,
        agent: agent.extension,
        state: agent.state,
        queue: queueList,
        caller_id: callerId,
        queue_belongs: queueBelongs,
        day_handled: agent.day_handled,
        day_missed: agent.day_missed
    });
  });
//   setAgentDistributionData(dataToBeAdded_agents);
  // const [filterMenuEl, setAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [columnFilter, setcolumnFilter] = React.useState({
    agent_name: true,
    state: true,
    queue: true,
    caller_id: true,
    queue_belongs: true,
    day_handled: true,
    day_missed: true
  });



  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

 

 




  const Precolumns = [
    {
      Header: 'Agent Name',
      accessor: 'agent_name',
      show: true
    },
    {
      Header: 'State',
      accessor: 'state',
      show: true
    },
    {
      Header: 'Queue',
      accessor: 'queue',
      show: true
    },
    {
        Header: 'Caller ID',
        accessor: 'caller_id',
        show: true
    },
    {
        Header: 'Queue Membership',
        accessor: 'queue_belongs',
        show: true
    },
    {
        Header: 'Day Answered',
        accessor: 'day_handled',
        show: true
    },
    {
        Header: 'Day Missed',
        accessor: 'day_missed',
        show: true
    }
  ]
  const [columns, setColumns] = useState(Precolumns)

 

  const handleChange = (name, index) => event => {
    let newColumns = [...columns]
    newColumns[index].show = !newColumns[index].show
    setColumns(newColumns);
    setcolumnFilter({ ...columnFilter, [name]: event.target.checked });
    
  }
/* 
  const handleChange = name => event => {
    console.log('1234567890',name)
    setcolumnFilter({ ...columnFilter, [name]: event.target.checked });
    const index = columns.map(e => e.accessor).indexOf(name);
    handleShow(index);
  }; */


  return (
    <div className="flex flex-col justify-between flex-1 px-2 pt-2" style={{marginBottom: '10px', height: "100%", width: "100%"}}>
        <div  >
          <div style={{float: "right"}}>
          <IconButton className= "h-40 w-40 p-0"  aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={handleClick}>
          <Icon>more_horiz</Icon>
        </IconButton>   
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >

        {columns.map((data,index) =>  <MenuItem key={data.accessor}  onClick={handleClose}><FormControlLabel
        control={
          <Checkbox checked={columnFilter[data.accessor]} onChange={handleChange(data.accessor,index)} value={data.accessor} />
        }
        label={data.Header}
      /></MenuItem>)}

{/* 
       <MenuItem onClick={handleClose}><FormControlLabel
        control={
          <Checkbox checked={columnFilter.status} onChange={handleChange('status')} value="status" />
        }
        label="Status"
      /></MenuItem> */}
      
        </Menu>            
                          
          </div>
        </div>
      <DraggableTable
        rows={dataToBeAdded_agents}
        columns={columns}
        className='-striped -highlight'
        filterable = {false}
        show='true'
      />


    </div>
  )
}

export default AgentDistributionTable