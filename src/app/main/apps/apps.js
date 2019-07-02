import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import axios from 'axios';
import { connect } from 'react-redux';
import  * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import {bindActionCreators} from 'redux';
const styles = theme => ({
    layoutRoot: {}
});

class Apps extends Component {
    connection = null;
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("apps.js");
        const data = {
            function: 'extensions.auth',
            pin: '0104',
            extension: '104',
            sil_tenant_url: '/iit909',
            'Access-Control-Allow-Credentials': 'omit'
          }
          axios({
            method: 'post',
            url: 'http://10.226.14.70:7778/6/api',
            data
          }).then(data => {
              console.log(data.data.core_cookie);
              this.connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
                const sendData = JSON.stringify({
                    request: "fetch_agent_events"
                });
            
                const queue_sendData = JSON.stringify({
                    request: "fetch_queue_events"
                });
                
                this.connection.onopen = () => {
                    console.log("123456677")
                    this.props.history.push('apps/dashboard')
                    this.connection.send('panel_type:dashboard');
                    this.connection.send(queue_sendData);
                    this.connection.send(sendData);
                    setInterval( _ =>{
                        if(this.connection ) {
                            this.connection.send('ping');
                        }
                    }, 5000 )
                }
                this.connection.onmessage = evt => { 
                        //console.log("on websocket message", evt.data);
                        if(evt.data !== 'pong') {
                            const responaeData = JSON.parse(evt.data);
                            if(responaeData.action === 'create_agent') {
                              //  console.log("agentResponse", responaeData.response);
                             //   this.setState({agentList: responaeData.response});
                             this.props.handleUpdateAgent(responaeData.response)
                             console.log("this.props.agentList", this.props.agentList)
                             
                            }
                            if(responaeData.action === 'update_agent') {
                           //     console.log("updateResponse", responaeData.response);
                               // console.log("this.props.agentList", this.props.agentList)
                                
                                    this.props.handleUpdateAgent(responaeData.response)
                                //this.setState({agentList: tempAgentList});
                            }
                            if(responaeData.action === 'create_queue') {
                              //  console.log("QueueResponse", responaeData.response);
                                //this.setState({queueList: responaeData.response});
                                this.props.handleUpdateQueue(responaeData.response)
                            }
                            if(responaeData.action === 'update_queue') {
                              //  console.log("UpdateQueueResponse", responaeData.response);
                                 
                                 
                                
                                //this.setState({queueList: tempQueList });
                                this.props.handleUpdateQueue(responaeData.response)
                              //  console.log('filteredItems',this.state.queueList);
                            }
                        }
                        
                      };

                   


                    this.connection.onclose = () => {
                            this.connection = null;
                           // this.setState({connected: false});
                        //    let connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
                    }



            
          })
      
        
    }
    render()
    {
       // console.log("in render", this.props)
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                
                content={
                    <div className="p-24">
                        <h4>Apps</h4>
                        <br/>
                    </div>
                }
            />
        )
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        handleUpdateAgent  : Actions.updateAgentList,
        handleUpdateQueue  : Actions.updateQueueList,
    }, dispatch);
}

function mapStateToProps({socketReducer})
{
    return {
        agentList: socketReducer.socket.agentList,
        queueList: socketReducer.socket.queueList
    }
}
//export default withStyles(styles, {withTheme: true})(Apps);
//export default connect(null,mapDispatchToProps)(Apps);
export default withReducer('socketReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Apps))));