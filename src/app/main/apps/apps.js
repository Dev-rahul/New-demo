import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import axios from 'axios';
const styles = theme => ({
    layoutRoot: {}
});

class Apps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected : false,
            agentList: [],
            queueList: [],
        }
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
                    this.setState({connected: true});
                    this.connection.send('panel_type:dashboard');
                    this.connection.send(queue_sendData);
                    this.connection.send(sendData);
                    setInterval( _ =>{
                        if(this.connection !== null && this.state.connected) {
                            this.connection.send('ping');
                        }
                    }, 5000 )
                }
                this.connection.onmessage = evt => { 
                        console.log("on websocket message", evt.data);
                        if(evt.data !== 'pong') {
                            const responaeData = JSON.parse(evt.data);
                            if(responaeData.action === 'create_agent') {
                              //  console.log("agentResponse", responaeData.response);
                                this.setState({agentList: responaeData.response});
                            }
                            if(responaeData.action === 'update_agent') {
                           //     console.log("updateResponse", responaeData.response);

                                let tempAgentList = [...this.state.agentList];
                                 //console.log('tempQueList',tempQueList)
                                
                                
                                    responaeData.response.map(currAgent => {
                                       let index = 0;
                                       tempAgentList.map(agent => {
                                           if(agent.extension === currAgent.extension) {
                                             //  queue.current_calls = currQueue.current_calls;
                                             tempAgentList.splice(index, 1, currAgent);
                                           }
                                           index = index+ 1;
                                        })
                                    })
                                this.setState({agentList: tempAgentList});
                            }
                            if(responaeData.action === 'create_queue') {
                              //  console.log("QueueResponse", responaeData.response);
                                this.setState({queueList: responaeData.response});
                            }
                            if(responaeData.action === 'update_queue') {
                              //  console.log("UpdateQueueResponse", responaeData.response);
                                 let tempQueList = [...this.state.queueList];
                               //  console.log('tempQueList',tempQueList)
                                
                                
                                    responaeData.response.map(currQueue => {
                                       let index = 0;
                                        tempQueList.map(queue => {
                                           if(queue.extension === currQueue.extension) {
                                             //  queue.current_calls = currQueue.current_calls;
                                             tempQueList.splice(index, 1, currQueue);
                                           }
                                           index = index+ 1;
                                        })
                                    })
                                 
                                
                                this.setState({queueList: tempQueList });
                              //  console.log('filteredItems',this.state.queueList);
                            }
                        }
                        
                      };

                   


                    this.connection.onclose = () => {
                            this.connection = null;
                            this.setState({connected: false});
                        //    let connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
                    }



            
          })
      
        
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
                    <div className="p-24"><h4>Apps</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Apps js</h4></div>
                }
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

export default withStyles(styles, {withTheme: true})(Apps);