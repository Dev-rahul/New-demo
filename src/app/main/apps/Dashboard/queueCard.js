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
    Grid,
    Icon,
    IconButton,
    Typography,
    CardActions,
    Divider,
    TextField,
    FormControl,
    MenuItem,
    LinearProgressƒ
} from "@material-ui/core";
import Slider from '@material-ui/lab/Slider';
import ReactCardFlip from "react-card-flip";
import Widget3 from './agentPerformance';
import ProgressBar from 'react-progress-bar-battlenet-style';

const colorCode = {
    Idle: '#F2F2F2',
    in_queue: '#31C3E9',
    available: '#31C3E9',
    out_queue: "#2C7D26",
    callback: '#EDD6B4'
}


const marks = [
    {
      value: 0,
      label: '0°C',
      background: 'red'
    },
    {
      value: 20,
      label: '20°C',
      background: 'blue'
    },
    
    {
      value: 100,
      label: '100°C',
      background: 'green'
    },
  ];
class QueueCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            inCall: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    redAlert = this.props.queueData.fill_alert + 3;
    maxLimit = this.redAlert + (10 - (this.redAlert) % 10);
    orangePercentage = (this.props.queueData.fill_warning / this.maxLimit) * 100;
    redPercentage = (this.props.queueData.fill_alert / this.maxLimit) * 100;
    sliderColor = (this.props.queueData.members.length < this.props.queueData.fill_warning) ? '#40FF70' : (this.props.queueData.members.length >= this.props.queueData.fill_alert ? '#ff0000' : '#FF9C2A')

    randomNum = Math.floor(Math.random() * (2 + 1));
    colorArray = ['#40FF70', '#FF9C2A', '#ff0000']
    SliderStyle = {
        'background': `linear-gradient(90deg, rgba(0,255,4,1) 0%, rgba(245,255,0,1) ${this.orangePercentage}%, rgba(255,0,0,1) ${this.redPercentage}%)`,
        "color": `${this.sliderColor}`,
        "height": "2px",
        "padding": "7px 0px",
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
    valuetext=(value)=> {
        return `${value}°C`;
      }
      styleMark=() => {
          marks.map(mark => {
              return 
          })
      }

    render() {
        let queueStatus ='Idle';
        if(this.props.queueData.type === 'in_queue' && this.props.queueData.calls_waiting > 0) {
            // if(props.queueData.current_calls.length > 0) {
            queueStatus = 'in_queue' ;
            // }
            } else if(this.props.queueData.type === 'in_queue') {
            queueStatus = 'available';
            } else if(this.props.queueData.type === 'out_queue') {
            if(this.props.queueData.current_calls.length > 0) {
                queueStatus = 'out_queue' ;
            }
            }
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                <div className="p-12" key="front" style={{ width: "225px" }}>
                    <Card elevation={1} className="flex flex-col h-256">
                        <div
                            className="flex flex-shrink-0 items-center justify-between px-24 h-32"
                            style={{
                                background: colorCode[queueStatus],
                                color: "secondary"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className="font-medium truncate" color="inherit">
                                {this.props.queueData.name}
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                {this.props.queueData.extension}
                            </Typography>
                        </div>
                        <CardContent className="flex flex-col flex-auto justify-center">
                            <Typography className="font-medium truncate mb-20 pb-24" color="inherit" >
                                Available Agents : {this.props.queueData.members.length}
                            </Typography>
                            {console.log('Fill Alert::', this.props.queueData.fill_alert)}
                            {console.log('Fill Warning::', this.props.queueData.fill_warning)}
                            {/* <Slider
                                value={this.props.queueData.calls_waiting}
                                // getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                marks={marks}
                                track={{color: "blue"}}
                                // marks={marks}
                                valueLabelDisplay="on"
                                min={0}
                                getAriaValueText={this.valuetext}
                                max={this.maxLimit}
                                //valueLabelFormat= {x => this.randomNum}
                                // className='Slider'
                                // disabled
                                valueLabelDisplay="auto"
                                
                            /> */}
                            <Slider
        defaultValue={20}
        getAriaValueText={this.valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        rail= {colorCode.callback}
      />
                        </CardContent>
                        <Divider />
                        <CardActions style={{ "justifyContent": "space-between",padding: "3px", width: "100%", display: "flex" }} className="justify-center">
                            <Chip 
                                label="2"
                            />
                            <Typography className="font-medium truncate" color="inherit" style={{fontSize: "1.2rem"}}>
                                : Calls waiting
</Typography>
                            <div className="flex items-center justify-center opacity-75">
                                <Timer timeInSecond={0}/>
                            </div>
                        </CardActions>
                        {/* <ProgressBar className="w-full" variant="determinate"
completed={30} colors={[30, 70, 95]} /> */}
                    </Card>
                </div>

                <div className="p-12 " key="back" style={{ width: "225px" }}>
                    <Card elevation={1} className="flex flex-col h-256">
                        <div
                            className="flex flex-shrink-0 items-center justify-between px-24 h-32"
                            style={{
                                background: colorCode[queueStatus],
                                color: "black"
                            }}
                            onClick={this.handleClick}
                        >
                            <Typography className=" font-medium truncate " color="inherit">
                                {this.props.queueData.name}
                            </Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                {this.props.queueData.extension}
                            </Typography>
                        </div>
                        <CardContent className="flex flex-col flex-auto w-full p-6">

                            <div className="flex flex-col flex-auto items-center" style={{ "justifyContent": "space-between", width: "100%", display: "flex" }}>
                                <div className="item-center">

                                    <Grid container spacing={1}>
                                        <Grid item xs>
                                            <TextField
                                                style={{ marginTop: "5px", marginBottom: "0px" }}
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
                                                style={{ marginTop: "5px", marginBottom: "0px" }}
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
                                                style={{ marginTop: "5px", marginBottom: "0px" }}
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
                                                style={{ marginTop: "5px", marginBottom: "0px" }}
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
                                                style={{ marginTop: "5px", marginBottom: "0px" }}
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
                            <Timer timeInSecond={0}/>
                            </div>
                        </CardActions>

                    </Card>
                </div>
            </ReactCardFlip>
        );
    }
}

export default QueueCard;