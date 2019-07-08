import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Badge from '@material-ui/core/Badge';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { propTypes } from 'formsy-react';
import { Divider } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  card: {
    width: 165
  },
  title: {
    fontSize: "1.4rem",
    display: 'block',
    paddingBottom: "10px"
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

export default function ScrumBoardCard(props) {
    let selectedQueueName = '';
    let agentReady = [], agentBusy =[], agentAway =[], agentWrapUp = [], agentNewLogin =[],agentOnAQueueCall=[], agentCallBack = [];
    console.log("props.selectedQueue",props.selectedQueue)
    const [badgeCount, setBadgeCount] = React.useState(1);
    if(props.selectedQueue) {
        selectedQueueName =  props.selectedQueue.name;
        props.selectedQueue.members.map(member => {
          props.agentList.map(agent => {
              if(member.extension === agent.extension) {
                  if(agent.state === 'New Login') {
                      if(!agentNewLogin.includes(agent)){
                          agentNewLogin.push(agent);
                      }
                      
                  } else if(agent.state !== 'Ready') {
                      if(!agentAway.includes(agent)){
                          agentAway.push(agent);
                      }
                  } else {
                      if(agent.on_a_call === 1 )  {
                          if(!agentOnAQueueCall.includes(agent)){  
                              agentOnAQueueCall.push(agent); 
                          }
                      }  else if (agent.on_a_call === 3) {
                          if(!agentCallBack.includes(agent)){
                              agentCallBack.push(agent);
                          }
                      }else if(agent.on_a_wrapup === 1) {
                          if(!agentWrapUp.includes(agent)){
                              agentWrapUp.push(agent);
                          }
                      } else if(agent.on_a_call === 2) {
                          // for out bound queue
                      } else if(agent.on_a_call === 4) {
                          // for out bound queue
                      } else {
                          if(agent.status === 'Busy') {
                              if(!agentBusy.includes(agent)) {
                                  agentBusy.push(agent);
                              }
                          } else {
                              if(!agentReady.includes(agent)) {
                                  agentReady.push(agent)
                              }
                          }
                      }
                  }
              }
          })
      });
    } 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
  setAnchorEl(event.currentTarget);
  }
  
  function handleClose() {
  setAnchorEl(null);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  // useEffect(() => {
  //   switch(props.card.id) {
  //     case 1: 
         
  //        setBadgeCount(agentNewLogin.length)
  //        break;
         
  //     case 2: 
  //       setBadgeCount(agentAway.length);
  //       break;
  //     case 3: 
  //       setBadgeCount(agentReady.length);
  //       break;
  //     case 4: 
  //     setBadgeCount(agentBusy.length);
  //       break;
  //     case 5: 
  //     setBadgeCount(agentCallBack.length);
  //       break;
  //     case 6: 
  //     setBadgeCount(agentOnAQueueCall.length);
  //       break;
  //     case 7: 
  //     setBadgeCount(agentWrapUp.length);
  //       break;
  
  //   }

  // }, [])
  
  function displayBadgeComponent() {
    console.log("badgeCount", badgeCount)
    let badgeComponent = null;
    switch(props.card.id) {
      case 1: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentNewLogin.length} color="secondary">
        
         <div>
<IconButton onClick={handleClick} aria-label="Settings">
<MoreVertIcon /> 
</IconButton>
<Menu
id="simple-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
>
<MenuItem onClick={handleClose}>Ascending</MenuItem>
<MenuItem onClick={handleClose}>Descending</MenuItem>

</Menu>
</div>
         </Badge>
      )
      return badgeComponent;
         
      case 2: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentAway.length} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
      return badgeComponent;
      case 3: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentReady.length} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
      return badgeComponent;
      case 4: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentBusy.length} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
      return badgeComponent;
      case 5: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentCallBack.length} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
      return badgeComponent;
      case 6: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentOnAQueueCall.length} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
      return badgeComponent;
      case 7: 
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={agentWrapUp.length} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
      return badgeComponent;
      default:
      badgeComponent = (
        <Badge className={classes.margin} badgeContent={99} color="secondary">
        <IconButton aria-label="Settings">
         
             <MoreVertIcon />
         </IconButton>
         </Badge>
      )
        return badgeComponent;
    }
    
    
  }
  
  
function displayagentList(id) {
  switch(id) {
    case 1: 
        let newLoginComponent = [];
        agentNewLogin.map(agent => {
          newLoginComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"new"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>
          )
        })
        return newLoginComponent;
    case 2: 
        let agentAwayComponent = [];
        agentAway.map(agent => {
          agentAwayComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"away"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension} 
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>  
            )
        })
        return agentAwayComponent;
    case 3: 
        let agentReadyComponent = [];
        agentReady.map(agent => {
          agentReadyComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"ready"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>
            )
        })
        return agentReadyComponent;
    case 4: 
        let agentBusyComponent = [];
        agentBusy.map(agent => {
          agentBusyComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"busy"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>
            )
        })
        return agentBusyComponent;
    case 5: 
        let agentCallBackComponent = [];
        agentCallBack.map(agent => {
          agentCallBackComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"callback"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>
            )
        })
        return agentCallBackComponent;
    case 6: 
        let agentOnQueueCallComponent = [];
        agentOnAQueueCall.map(agent => {
          agentOnQueueCallComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"queueCall"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>
            )
        })
        return agentOnQueueCallComponent;
    case 7: 
        let agentWrapUpComponent = [];
        agentWrapUp.map(agent => {
          agentWrapUpComponent.push(
            <Card className={classes.subcard} style={{width:"130px", marginBottom:"5px"}} key={agent.extension+"wrapup"+agent.firstName}>
              <CardContent style={{padding: "2px", width: "100%"}}>
                <Typography  style={{paddingBottom: "5px", fontSize: "1.1rem"}} color="textSecondary" >
                    {agent.firstName + " "+ agent.lastName + " x"+ agent.extension}
                </Typography>
                <Divider/>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
              </CardContent>
            </Card>
            )
        })
        return agentWrapUpComponent;

  }
}

  return (
    <Card className={classes.card} style={{height: "100%"}}>
                                    <CardHeader
                                        
                                        action={
                                         displayBadgeComponent()
                                        
                                           
                                        }
                                        title={<span className={classes.title}>{props.card.title}</span>}
                                    />
      
                                    <CardContent
                                    style={{paddingTop: "0px", width: "100%"}}>
                                        {/* <Typography variant="body2" color="textSecondary" component="p">
                                        {selectedQueueName}
                                        </Typography> */}
                                        <div className="flex  flex-row flex-wrap items-center justify-center " style={{height: "100%",overflowY: "auto"}}>
                                          {displayagentList(props.card.id)}
                                          {/* {props.card.agents.map(agent => {
                                            return (
                                              <Chip label={agent.firstName} className="m-1" key={agent.extension+""+agent.firstName} />
                                            )
                                          })} */}
                                        </div>
                                    </CardContent>
     
     
                                </Card>
  );
}
