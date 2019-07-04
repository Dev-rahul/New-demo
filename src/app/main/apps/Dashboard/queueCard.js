import React, { Component } from "react";
//import {withStyles} from '@material-ui/core/styles';
import { makeStyles, useTheme } from "@material-ui/styles";
import { FusePageSimple, DemoContent } from "@fuse";
import {
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Icon,
    IconButton,
    Typography,
    CardActions,
    Divider,
    TextField,
    FormControl,
    MenuItem,
    LinearProgress
} from "@material-ui/core";
import ReactCardFlip from "react-card-flip";
import Widget3 from './agentPerformance';
import ProgressBar from 'react-progress-bar-battlenet-style';





class QueueCard extends React.Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false,
            inCall: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    autoFlip = (<div className="flex flex-col flex-auto items-center justify-center">


        Caller ID <Chip
            label="107"
        />
        Queue Name <Chip
            label="q307"
        />


    </div>
    )

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        this.setState({ inCall: Math.random() >= 0.5 })
    }

    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                <div className="p-12" key="front" style={{ width: "225px" }}>
                    <Card elevation={1} className="flex flex-col h-256">
                        <div
                            className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                            style={{
                                background: "#ff0000",
                                color: "secondary"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className="font-medium truncate" color="inherit">
                                Technical Support
</Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                q307
</Typography>
                        </div>
                        <CardContent className="flex flex-col flex-auto justify-center">
                            <Typography className="font-medium truncate" color="inherit">
                                Available Agents :
                            </Typography>
                            <Chip
                                label="10"
                            />
                        </CardContent>
                        <Divider />
                        <CardActions style={{ "justifyContent": "space-between", width: "100%", display: "flex" }} className="justify-center">
                            <Chip
                                label="2"
                            />
                            <Typography className="font-medium truncate" color="inherit">
                                : Calls waiting
</Typography>
                            <div className="flex items-center justify-center opacity-75">
                                <Icon className="text-20 mr-8" color="inherit">
                                    access_time
</Icon>
                                <div className="text-16 whitespace-no-wrap">3 min</div>
                            </div>
                        </CardActions>
                        <ProgressBar className="w-full" variant="determinate"
                            completed={30} colors={[30, 70, 95]} />
                    </Card>
                </div>

                <div className="p-12 " key="back" style={{ width: "225px" }}>
                    <Card elevation={1} className="flex flex-col h-256">
                        <div
                            className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                            style={{
                                background: "#22ff05",
                                color: "black"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className=" font-medium truncate " color="inherit">
                                Technical Support
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                q307
                            </Typography>
                        </div>
                        <CardContent className="flex flex-col flex-auto w-full p-6">

                            <div className="flex flex-col flex-auto items-center" style={{ "justifyContent": "space-between", width: "100%", display: "flex" }}>
                                <div className="item-center">

                                    <Grid container spacing={1}>
                                        <Grid item xs>
                                            <TextField
                                            style={{marginTop: "5px", marginBottom:"0px"}}
                                                id="outlined-denseqge"
                                                label="Fill Warning"
                                                margin="dense"
                                                variant="outlined"
                                                
                                                InputLabelProps={{ style: { fontSize: "12px" } }}
                                                    InputProps={{ style: { height: "30px" } }}

                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField
                                            style={{marginTop: "5px", marginBottom:"0px"}}
                                                id="outlined-denefse"
                                                label="Fill Alert"
                                                margin="dense"
                                                variant="outlined"
                                                
                                                InputLabelProps={{ style: { fontSize: "12px" } }}
                                                    InputProps={{ style: { height: "30px" } }}

                                            />
                                        </Grid>


                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            <TextField
                                            style={{marginTop: "5px", marginBottom:"0px"}}
                                                id="outlined-deewrense"
                                                label="Answer Time Obj"
                                                margin="dense"
                                                variant="outlined"
                                                
                                                InputLabelProps={{ style: { fontSize: "12px" } }}
                                                    InputProps={{ style: { height: "30px" } }}

                                            />
                                        </Grid>



                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            <TextField
                                            style={{marginTop: "5px", marginBottom:"0px"}}
                                                id="outlined-denswqe"
                                                label="Waiting Alert (Sec)"
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{ style: { fontSize: "12px" } }}
                                                    InputProps={{ style: { height: "30px" } }}

                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container spacing={0}>
                                            <Grid item xs>
                                                <TextField
                                                    style={{marginTop: "5px", marginBottom:"0px"}}
                                                    id="outlined-denswqe"
                                                    label="Talk time Alert"
                                                    margin="dense"
                                                    variant="outlined"
                                                    InputLabelProps={{ style: { fontSize: "12px" } }}
                                                    InputProps={{ style: { height: "30px" } }}

                                                />
                                            </Grid>

                                        </Grid>
                        
                                </div>
                            </div>

                        </CardContent>
                        <Divider />
                        <CardActions style={{ "justifyContent": "space-between", width: "100%", display: "flex" }} className="justify-center">
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
        );
    }
}

export default QueueCard;