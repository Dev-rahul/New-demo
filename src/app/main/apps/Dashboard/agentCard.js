import React, { Component } from "react";
//import {withStyles} from '@material-ui/core/styles';
import { makeStyles, useTheme } from "@material-ui/styles";
import { FusePageSimple, DemoContent } from "@fuse";

import Timer from './timer';
import {
    Button,
    Card,
    CardContent,
    Chip,
    Icon,
    IconButton,
    Typography,
    CardActions,
    Divider,
    Avatar,
    FormControl,
    MenuItem,
    LinearProgress
} from "@material-ui/core";
import ReactCardFlip from "react-card-flip";
import Widget3 from "./agentPerformance";
const colorCode = {
    Idle: '#F2F2F2',
    Ready: '#2C7D26',
    Away: '#EDD6B4',
    Busy: '#B83900',
    Available: "#22B3A8",
    inBoundCall: "#034895",
    inWrapUp: "#31C3E9"
}
const useStyles = makeStyles(theme => ({
    Idle: {
        background: '#F2F2F2'
        },
        Ready: {
        background: '#2C7D26'
        },
        Away: {
        background: '#EDD6B4'
        },
        Busy: {
        background: '#B83900'
        },
        Available : {
        background: "#22B3A8"
        },
        inBoundCall: {
        background: "#034895"
        },
        inWrapUp: {
        background: "#31C3E9"
        }
}));

class AgentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            inCall: true,
            coach: true
        };
        this.handleClick = this.handleClick.bind(this);
        
    }

    autoFlip = (
        <div className="flex flex-col flex-auto items-center justify-center">
            Caller ID <Chip label="107" />
            Queue Name <Chip label="q307" />
        </div>
    );
    toggleCoachBargeButton = (type) => {
        if(type=== 'coach') {
            this.setState({coach: false});
        }
        if(type === 'barge') {
            this.setState({coach: true});
        }
    }
    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        this.setState({ inCall: Math.random() >= 0.5 });
    }

    render() {
        
        let agentStatus = "Idle";
        if(this.props.agentData.status === 'Busy') {
            if(this.props.agentData.on_a_call === 2 || this.props.agentData.on_a_call === 4 || this.props.agentData.on_a_call === 3 ) {
            
            agentStatus = 'Available';
            } else if( this.props.agentData.on_a_call === 1) {
            agentStatus = 'inBoundCall';
            } else if( this.props.agentData.on_a_wrapup === 1) {
            agentStatus = 'inWrapUp';
            } else {
            agentStatus = 'Busy';
            }
            } else if(this.props.agentData.status === 'Away'){
            agentStatus = 'Away';
            } else if(this.props.agentData.status === 'Idle'){
            
            if( this.props.agentData.on_a_call > 0) {
            agentStatus = "inBoundCall"
            } else if(this.props.agentData.on_a_wrapup > 0) {
            agentStatus = "inWrapUp";
            } else {
            if(this.props.agentData.state === 'Ready') {
            agentStatus = "Ready";
            } else {
            agentStatus = 'Away';
            }
            }
            } else {
            if(this.props.agentData.on_a_call === 2 || this.props.agentData.on_a_call === 4) {
            agentStatus = 'Available';
            }
            }
        let coachBargeButton = (
            <Button className="item-left" variant="contained" color="secondary"
                                size="small" onClick={() =>this.toggleCoachBargeButton('coach')}
                                style={{padding: "0px ", marginBottom: "5px", fontSize: '1.0rem'}}>
                                    Coach
            </Button>
        )
        if(!this.state.coach) {
            coachBargeButton = (
                <Button className="item-left" variant="contained" color="secondary"
                                size="small" onClick={() =>this.toggleCoachBargeButton('barge')}
                                style={{padding: "0px ", marginBottom: "5px", fontSize: '1.0rem'}}>
                                    Coaching, Click to barge-in
            </Button>
            )
        }
        return (
            <div>
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                <div className=" p-12 " key="front" style={{width: "225px"}}>
                    <Card elevation={1} className="flex flex-col h-256 ">
                        <div
                            className="flex  w-full flex-shrink-0 items-center justify-between px-24 h-32"
                            style={{
                                background: colorCode[agentStatus],
                                color: "secondary"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className="font-medium truncate" color="inherit">
                                {this.props.agentData.firstName + " " + this.props.agentData.lastName}
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                            {"x" +this.props.agentData.extension}
                            </Typography>
                        </div>
                        <CardContent className="flex flex-col flex-auto  justify-center">
                            <div
                                style={{
                                    "justifyContent": "space-between",
                                    width: "100%",
                                    display: "flex"
                                }}
                                className="flex-row "
                            >
                                {coachBargeButton}

                                {/* <Button
                                    style={{ justifyContent: "item-right" }}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Barge
                                </Button> */}
                            </div>
                            <div className="flex  flex-row flex-wrap items-left justify-center " style={{height: "100%",overflowY: "auto"}}>
                                {this.props.agentData.queues.map(queue => {
                                    return (
                                        <Chip label={queue.name} className="m-1" key={queue.extension+""+queue.name+""+this.props.agentData.firstName}
                                        style={{height: "25px"}} />
                                    )
                                })}
                            </div>
                        </CardContent>
                        <Divider />
                        <CardActions
                            style={{
                                "justifyContent": "space-between",
                                width: "100%",
                                display: "flex"
                            }}
                            className="justify-center "
                        >
                            <Typography className="font-medium truncate" color="inherit">
                                Ready
                            </Typography>
                            <div className="flex items-center justify-center opacity-75">
                               <Timer timeInSecond={0}/>
                            </div>
                        </CardActions>
                        <div className="w-full" style={{height: "3px", backgroundColor:colorCode[agentStatus]}}>

                        </div>

                        {/* <LinearProgress
                            className="w-full"
                            variant="determinate"
                            color="secondary"
                            value={100}
                            style={{backgroundColor:colorCode[agentStatus]}}
                        /> */}
                    </Card>
                </div>

                <div className="p-12" key="back" style={{width: "225px"}}>
                    <Card elevation={1} className="flex flex-col h-256">
                        <div
                            className="flex flex-shrink-0 items-center justify-between px-24 h-32"
                            style={{
                                backgroundColor:colorCode[agentStatus],
                                color: "black"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className="font-medium truncate" color="inherit">
                            {this.props.agentData.firstName + " " + this.props.agentData.lastName}
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                {"x" +this.props.agentData.extension}
                            </Typography>
                        </div>
                        <CardContent
                            style={{ padding: "1px" }}
                            className="flex flex-col flex-auto items-center justify-center"
                        >
                            {this.state.inCall ? this.autoFlip : <Widget3 />}
                        </CardContent>
                        <Divider />
                            <CardActions
                                style={{
                                    "justifyContent": "space-between",
                                    width: "100%",
                                    display: "flex"
                                }}
                                className="justify-center"
                            >
                                <Typography className="font-medium truncate" color="inherit">
                                    Call waiting
                                </Typography>
                                <div className="flex items-center justify-center opacity-75">
                                    <Timer timeInSecond={0}/>
                                </div>
                            </CardActions>
                            <div className="w-full" style={{height: "3px", backgroundColor:colorCode[agentStatus]}}>

                            </div>

                        </Card>
                    </div>
                </ReactCardFlip>
                </div>
                );
            }
}
                
export default AgentCard;