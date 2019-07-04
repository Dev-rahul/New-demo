import React, { Component } from "react";
//import {withStyles} from '@material-ui/core/styles';
import { makeStyles, useTheme } from "@material-ui/styles";
import { FusePageSimple, DemoContent } from "@fuse";
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

class AgentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            inCall: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    autoFlip = (
        <div className="flex flex-col flex-auto items-center justify-center">
            Caller ID <Chip label="107" />
            Queue Name <Chip label="q307" />
        </div>
    );

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        this.setState({ inCall: Math.random() >= 0.5 });
    }

    render() {
        return (
            <div>
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                <div className=" p-12 " key="front" style={{width: "225px"}}>
                    <Card elevation={1} className="flex flex-col h-256 ">
                        <div
                            className="flex  w-full flex-shrink-0 items-center justify-between px-24 h-64"
                            style={{
                                background: "#ff0000",
                                color: "secondary"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className="font-medium truncate" color="inherit">
                                {this.props.agentData.firstName + " " + this.props.agentData.lastName}
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                            {this.props.agentData.extension}
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
                                <Button className="item-left" variant="contained"
                                size="small">
                                    Coach
                                </Button>

                                <Button
                                    style={{ justifyContent: "item-right" }}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Barge
                                </Button>
                            </div>
                            <div className="flex  flex-row flex-wrap items-center justify-center " style={{height: "100%",overflowY: "auto"}}>
                                {this.props.agentData.queues.map(queue => {
                                    return (
                                        <Chip label={queue.name} className="m-1" key={queue.extension+""+queue.name} />
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
                                Call waiting
                            </Typography>
                            <div className="flex items-center justify-center opacity-75">
                                <Icon className="text-20 mr-8" color="inherit">
                                    access_time
                                </Icon>
                                <div className="text-16 whitespace-no-wrap">3 min</div>
                            </div>
                        </CardActions>
                        <LinearProgress
                            className="w-full"
                            variant="determinate"
                            color="secondary"
                            value={100}
                        />
                    </Card>
                </div>

                <div className="p-12" key="back" style={{width: "225px"}}>
                    <Card elevation={1} className="flex flex-col h-256">
                        <div
                            className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                            style={{
                                background: "#22ff05",
                                color: "black"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className="font-medium truncate" color="inherit">
                            {this.props.agentData.firstName + " " + this.props.agentData.lastName}
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                {this.props.agentData.extension}
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
                                    <Icon className="text-20 mr-8" color="inherit">
                                        access_time
                                    </Icon>
                                    <div className="text-16 whitespace-no-wrap">3 min</div>
                                </div>
                            </CardActions>

                        </Card>
                    </div>
                </ReactCardFlip>
                </div>
                );
            }
}
                
export default AgentCard;