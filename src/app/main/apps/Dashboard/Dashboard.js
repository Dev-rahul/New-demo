import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import  * as websocketService from '../../../../Utils/websocket';
const styles = theme => ({
    layoutRoot: {}
});

class Dashboard extends Component {
    componentDidMount() {
        console.log("in Dashboard");
    }
    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>Header</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <h4>Content</h4>
                        <br/>
                        <DemoContent/>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Dashboard);