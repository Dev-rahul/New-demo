import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    minWidth: 150
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

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  
  
  
function displayagentList(id) {
  switch(id) {
    case 1: 
        let newLoginComponent = [];
        agentNewLogin.map(agent => {
          newLoginComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"new"+agent.firstName} />
          )
        })
        return newLoginComponent;
    case 2: 
        let agentAwayComponent = [];
        agentAway.map(agent => {
          agentAwayComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"away"+agent.firstName} />
          )
        })
        return agentAwayComponent;
    case 3: 
        let agentReadyComponent = [];
        agentReady.map(agent => {
          agentReadyComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"ready"+agent.firstName} />
          )
        })
        return agentReadyComponent;
    case 4: 
        let agentBusyComponent = [];
        agentBusy.map(agent => {
          agentBusyComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"busy"+agent.firstName} />
          )
        })
        return agentBusyComponent;
    case 5: 
        let agentCallBackComponent = [];
        agentCallBack.map(agent => {
          agentCallBackComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"callback"+agent.firstName} />
          )
        })
        return agentCallBackComponent;
    case 6: 
        let agentOnQueueCallComponent = [];
        agentOnAQueueCall.map(agent => {
          agentOnQueueCallComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"queue"+agent.firstName} />
          )
        })
        return agentOnQueueCallComponent;
    case 7: 
        let agentWrapUpComponent = [];
        agentWrapUp.map(agent => {
          agentWrapUpComponent.push(
            <Chip label={agent.firstName} className="m-1" key={agent.extension+"wrapup"+agent.firstName} />
          )
        })
        return agentWrapUpComponent;

  }
}

  return (
    <Card className={classes.card} style={{height: "100%"}}>
                                    <CardHeader
        
                                        action={
                                            <IconButton aria-label="Settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={props.card.title}
                                    />
      
                                    <CardContent>
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
