import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components'

const styles = theme => ({
    layoutRoot: {}
});
const steps = [
    {
        id: '1',
        message: 'What is your name?',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        trigger: '4',
      },
      {
        id: '4',
        message: 'How can i help you',
        trigger: '5'
      },
      {
        id: '5',
        user: true,
        trigger: 6
      },
      {
        id: '6',
        message: 'Pick a number',
        trigger: '7',
      },
      {
        id: '7',
        options: [
          { value: '1', label: '1', trigger: '8' },
          { value: '2', label: '2', trigger: '8' },
          { value: '3', label: '3', trigger: '8' },
          { value: '4', label: '4', trigger: '8' },
          { value: '5', label: '5', trigger: '8' },
        ],
      },
      {
        id: '8',
        message: 'A callback message was called!',
        trigger: 9,
      },
      {
        id: '9',
        message: 'Thank you!!!! :)',
        end: true,
      }
  ];
  
class Settings extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div>
    <ChatBot 
    headerTitle="Rush"
    recognitionEnable={true}
    speechSynthesis={{ enable: true, lang: 'en'}}
    steps={steps} />
  </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Settings);