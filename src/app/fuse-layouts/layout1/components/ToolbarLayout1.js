import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Hidden, Toolbar, Icon ,List, ListItem,Divider,ListItemAvatar,Avatar,Badge,Typography} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { FuseShortcuts } from '@fuse';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import Drawer from '@material-ui/core/Drawer';
import {Card, CardContent} from '@material-ui/core'
import {FuseUtils, NavLinkAdapter} from '@fuse';
import Sound from 'react-sound';





const useStyles = makeStyles(theme => ({
separator: {
width: 1,
height: 64,
backgroundColor: theme.palette.divider
},
snackButton: {
'&:hover': {
backgroundColor: "#FAFAFA",
}
}
}));
const StyledMenu = withStyles({
paper: {
border: '1px solid #d3d4d5',
},
})(props => (
<Menu
elevation={0}
getContentAnchorEl={null}
anchorOrigin={{
vertical: 'bottom',
horizontal: 'center',
}}
transformOrigin={{
vertical: 'top',
horizontal: 'center',
}}
{...props}
/>
));

const StyledMenuItem = withStyles(theme => ({
root: {
'&:focus': {
backgroundColor: theme.palette.primary.main,
'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
color: theme.palette.common.white,
},
},
},


}))(MenuItem);
function ToolbarLayout1(props) {
const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);

const classes = useStyles(props);
const [anchorEl, setAnchorEl] = React.useState(null);
const [drawerOpen, setDrawerOpen] = React.useState(false);

function handleClick(event) {
setAnchorEl(event.currentTarget);
}

function handleClose() {
setAnchorEl(null);
}


const [state, setState] = React.useState({
open: false,
vertical: 'top',
horizontal: 'center',
});

const { vertical, horizontal, open } = state;

const handleClickSnackBar = newState => () => {
setState({ open: true, ...newState });
};
function toggleDrawer() {

setDrawerOpen(!drawerOpen);
console.log(drawerOpen);
};



const drawerData = (
<div
onKeyDown={toggleDrawer}
>
<Card elevation={1} className="flex flex-col h-256 ">
<div
className="flex w-full flex-shrink-0 items-center justify-between px-24 h-64"
style={{
background: "#889B9D",
color: "white"
}}

>
{drawerOpen? ( <Sound
url="https://notificationsounds.com/message-tones/filling-your-inbox-251/download/mp3"
playStatus={Sound.status.PLAYING}
loop={true}
/>) : console.log('no sound')}

<Typography className="font-medium truncate" color="inherit">
Incoming Chat Request
</Typography>


</div>
<CardContent className="flex flex-col flex-auto justify-center">
<div
style={{
"justifyContent": "space-between",
width: "100%",
display: "flex"
}}
className="flex-col "
>
<Typography className="font-medium truncate" color="inherit">
Name : Jerin Devasy
</Typography>
<Typography className="font-medium truncate" color="inherit">
Email : jerin@netstratum.com
</Typography>
<Typography className="font-medium truncate" color="inherit">
Dept : Sales
</Typography>
<Typography className="font-medium truncate" color="inherit">
Question : Upgrading the number of queues
</Typography>
</div>
</CardContent>
</Card>
<Card elevation={1} className="flex flex-col h-256 ">
<div
className="flex w-full flex-shrink-0 items-center justify-between px-24 h-64"
style={{
background: "#889B9D",
color: "white"
}}

>
<Typography className="font-medium truncate" color="inherit">
CRM Information
</Typography>

</div>
<CardContent className="flex flex-col flex-auto border-b-1 justify-center">
<div
style={{
"justifyContent": "space-between",
width: "100%",
display: "flex"
}}
className="flex-col "
>
<Typography className="font-medium truncate" color="inherit">
Account Name : jerin@netstratum.com
</Typography>
<Typography className="font-medium truncate" color="inherit">
Phone Number : 877890890890
</Typography>
<Typography className="font-medium truncate" color="inherit">
Last Sale On : {Date.now()}
</Typography>

</div>
<div className="flex flex-row flex-wrap items-center justify-center " style={{ height: "100%", overflowY: "auto" }}>

</div>
</CardContent>
</Card>
    <Card elevation={3} className="flex flex-col h-256 ">
<Typography className="font-medium truncate" color="inherit">
Do you want to see the chat?
</Typography>
<CardContent className="flex flex-row justify-between">

<Button onClick={toggleDrawer} component={NavLinkAdapter} exact="true" to={'/apps/agentChat'}

variant="contained" color="primary" style={{backgroundColor: "green"}}>
Accept
</Button>
<Button onClick={toggleDrawer} variant="contained" color="primary" style={{backgroundColor: "red"}}>
Reject
</Button>

</CardContent>
</Card>
</div>
)

function handleCloseSnackBar() {
setState({ ...state, open: false });
}





return (
<ThemeProvider theme={toolbarTheme}>
<AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
<Toolbar className="p-0">

{config.navbar.display && config.navbar.position === 'left' && (
<Hidden lgUp>
<NavbarMobileToggleButton className="w-64 h-64 p-0" />
<div className={classes.separator} />
</Hidden>
)}

<div className="flex flex-1">
<Hidden mdDown>
<FuseShortcuts className="px-16" />
</Hidden>
</div>

<div className="flex">
<Button onClick={toggleDrawer}>New Chat</Button>
<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
{drawerData}
</Drawer>

<Button className={classes.snackButton} onClick={handleClickSnackBar({ vertical: 'top', horizontal: 'right' })} style={{fontColor: "#FAFAFA", color: "#FAFAFA", cursor:"auto"}}>Top-Right</Button>
<div className="w-64 h-64 p-2"
>

<Snackbar
anchorOrigin={{ vertical, horizontal }}
key={`${vertical},${horizontal}`}
open={open}
style={{marginRight: "100px", marginTop: "100px"}}
onClose={handleCloseSnackBar}
ContentProps={{
'aria-describedby': 'message-id',
}}
message={<span id="message-id">Incoming Chat request</span>}
action={[
<IconButton key="close" aria-label="Close" color="inherit" onClick={handleCloseSnackBar}>
<Icon>close</Icon>
</IconButton>,
]}
/>
<IconButton
aria-label="More"
aria-controls="long-menu"
aria-haspopup="true"
onClick={handleClick}
>
<Badge className={classes.margin} badgeContent={3} color="primary">
<Icon >notifications</Icon>
</Badge>
</IconButton>
<StyledMenu
id="customized-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
>
<StyledMenuItem>
<List className={classes.root}>
<ListItem alignItems="flex-start">
<ListItemAvatar>
<Icon style={{marginTop: "20px"}}>info</Icon>
</ListItemAvatar>
<ListItemText
primary="Incoming chat request from User-01


"
secondary={
<React.Fragment>
<Typography
component="span"
variant="body2"
className={classes.inline}
color="textPrimary"
>
10-07-2017 05:00 PM
</Typography>

</React.Fragment>
}
/>
</ListItem>
<Divider variant="inset" component="li" />
<ListItem alignItems="flex-start">
<ListItemAvatar>
<Icon style={{marginTop: "20px"}}>warning</Icon>
</ListItemAvatar>
<ListItemText
primary="Calls waiting in support queue crossed fill warning"
secondary={
<React.Fragment>
<Typography
component="span"
variant="body2"
className={classes.inline}
color="textPrimary"
>
10-07-2017 04:00 PM
</Typography>
</React.Fragment>
}
/>
</ListItem>
<Divider variant="inset" component="li" />
<ListItem alignItems="flex-start">
<ListItemAvatar>
<Icon style={{marginTop: "20px"}}>error</Icon>
</ListItemAvatar>
<ListItemText
primary="Calls waiting in sales queue crossed fill alert"
secondary={
<React.Fragment>
<Typography
component="span"
variant="body2"
className={classes.inline}
color="textPrimary"
>
09-07-2017 02:15 AM
</Typography>

</React.Fragment>
}
/>
</ListItem>
</List>
</StyledMenuItem>

</StyledMenu>
</div>
<div className={classes.separator} />
<UserMenu />

<div className={classes.separator} />


<Hidden lgUp>

<div className={classes.separator} />

</Hidden>

<div className={classes.separator} />

<QuickPanelToggleButton />
</div>

{config.navbar.display && config.navbar.position === 'right' && (
<Hidden lgUp>
<NavbarMobileToggleButton />
</Hidden>
)}
</Toolbar>
</AppBar>
</ThemeProvider>
);
}

export default ToolbarLayout1;