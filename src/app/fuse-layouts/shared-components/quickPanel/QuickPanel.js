import React from 'react';
import { Drawer, Typography, Card, CardContent, Button } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './store/actions/index'
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';
import Timer from '../../../main/apps/Dashboard/timer';
const useStyles = makeStyles(theme => ({
    root: {
        width: 280
    }
}));

function QuickPanel(props) {
    const dispatch = useDispatch();
    const state = useSelector(({ quickPanel }) => quickPanel.state);

    const classes = useStyles();

    return (
        <Drawer
            classes={{ paper: classes.root }}
            open={state}
            anchor="right"
            onClose={ev => dispatch(Actions.toggleQuickPanel())}
        >
            <FuseScrollbars>
                <Card elevation={1} className="flex flex-col h-256 ">
                    <div
                        className="flex w-full flex-shrink-0 items-center justify-between px-24 h-64"
                        style={{
                            background: "#A390B9",
                            color: "secondary"
                        }}

                    >
                        <Typography className="font-medium truncate" color="inherit">
                            Agent Control Panel
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
                                Bob Dylan X101
</Typography>

                            <Typography className="font-medium truncate" color="inherit">
                                Signed in for : <Timer timeInSecond={0}/>
</Typography>

                            <Typography className="font-medium truncate" color="inherit">
                                Answered Today :
</Typography>
                            <Button className="item-left" variant="contained"
                                size="small" color="secondary">
                                Go Ready
</Button>


                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center " style={{ height: "100%", overflowY: "auto" }}>

                        </div>
                    </CardContent>
                </Card>
                <Card elevation={1} className="flex flex-col h-256 ">
                    <div
                        className="flex w-full flex-shrink-0 items-center justify-between px-24 h-64"
                        style={{
                            background: "#A390B9",
                            color: "secondary"
                        }}

                    >
                        <Typography className="font-medium truncate" color="inherit">
                            Current Queue Call 
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
                                Caller : 
</Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                Arrived : 
</Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                Duation : 
</Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                Wait Time : <Timer timeInSecond={0}/>
</Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                Talk Time :
</Typography>
                            <Typography className="font-medium truncate" color="inherit">
                                Wrap up Time :
</Typography>

                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center " style={{ height: "100%", overflowY: "auto" }}>

                        </div>
                    </CardContent>
                </Card>
            </FuseScrollbars>
        </Drawer>
    );
}

export default withReducer('quickPanel', reducer)(QuickPanel);