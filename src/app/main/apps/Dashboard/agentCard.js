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
FaceIcon,
FormControl,
MenuItem,
LinearProgress
} from "@material-ui/core";
import ReactCardFlip from "react-card-flip";

class AgentCard extends React.Component {
constructor() {
super();
this.state = {
isFlipped: false
};
this.handleClick = this.handleClick.bind(this);
}

handleClick(e) {
e.preventDefault();
this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
}

render() {
return (
<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key="front">
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
Vipin Vijayan
</Typography>
<Typography className="font-medium truncate" color="inherit">
x107
</Typography>
</div>
<CardContent className="flex flex-row flex-auto items-center justify-center">
<Chip
avatar={
<Avatar>
<Icon>phone_forwarded</Icon>
</Avatar>
}
label="q356"
/>
<Chip
avatar={
<Avatar>
<Icon>phone_forwarded</Icon>
</Avatar>
}
label="q306"
/>
<Chip
avatar={
<Avatar>
<Icon>phone_forwarded</Icon>
</Avatar>
}
label="q307"
/>
</CardContent>
<Divider />
<CardActions className="justify-center">
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

<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key="back">
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
Vipin Vijayan
</Typography>
</div>
<CardContent className="flex flex-col flex-auto items-center justify-center">
<Typography className="text-center text-16 font-400">
q317
</Typography>
<Typography className="text-center text-16 font-400">
q307
</Typography>
<Typography className="text-center text-16 font-400">
q306
</Typography>

{/ <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">1</Typography> /}
</CardContent>
<Divider />
<CardActions className="justify-center">
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
</ReactCardFlip>
);
}
}

export default AgentCard;