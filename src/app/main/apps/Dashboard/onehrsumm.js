import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';

const styles = theme => ({
    layoutRoot: {}
});

class OneHrSumm extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>OneHrSummary View</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>OneHrSummary View</h4></div>
                }
                content={
                    <div className="p-24">
                        <h4>OneHrSummary View</h4>
                        <br/>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(OneHrSumm);