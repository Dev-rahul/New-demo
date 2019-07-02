import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import { connect } from 'react-redux';
import  * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import {bindActionCreators} from 'redux';
import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import DashBoardScrumCard from './dashboardScrumCard';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
const styles = theme => ({
    layoutRoot: {}
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts))
        };
    }
    componentDidMount() {
        console.log("in Dashboard");
    }

    static get defaultProps() {
        return {
          className: "layout",
          cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
          rowHeight: 30
        };
      }
    
      resetLayout() {
        this.setState({ layouts: {} });
      }
    
      onLayoutChange(layout, layouts) {
        saveToLS("layouts", layouts);
        this.setState({ layouts });
      }
    render()
    {
        const {classes} = this.props;
        console.log("agentsList in dashboard", this.props.agentList);
        return (
            <div style={{flexGrow: 1}}>
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
            style={{width: "100%", flexGrow: 1}}
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="1" data-grid={{ w: 2, h: 6, x: 0, y: 0, minW: 2, minH: 6 }} style={{width: "100%", flexGrow: 1}}>
          <div style={{maxWidth: "99%", maxHeight: "98%"}}>
          <DashBoardScrumCard />
          </div>
            
          </div>
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
            <span className="text">2</span>
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
            <span className="text">3</span>
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
            <span className="text">5</span>
          </div>
        </ResponsiveReactGridLayout>
      </div>        )
    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }
  
  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  

function mapStateToProps({socketReducer})
{
    return {
        agentList: socketReducer.socket.agentList,
        queueList: socketReducer.socket.queueList
    }
}

export default withReducer('socketReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(Dashboard))));