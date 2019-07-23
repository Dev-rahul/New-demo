import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Icon, Fab, Typography, Avatar, Select,Card, CardContent, Paper, IconButton, TextField,
    Button, DialogActions, DialogContent, DialogContentText,Drawer, DialogTitle, Divider, Dialog
} from '@material-ui/core';
import clsx from 'clsx';
import {
    FuseAnimateGroup, FuseAnimate, FusePageSimple,
    FuseScrollbars
} from "@fuse";
import { fade } from '@material-ui/core/styles/colorManipulator';
import Image from '../../../../assets/work-relax.jpg';
import Emojify from 'react-emojione';
import Timer from '../Dashboard/timer';
import moment from 'moment/moment';
import { maxHeight } from '@material-ui/system';
import ChromeImage from '../../../../assets/chrome.png'
import EdgeImage from '../../../../assets/edge.png'
import FireFoxImage from '../../../../assets/firefox.png'
import SafariImage from '../../../../assets/safari.png'
import message from 'app/store/reducers/fuse/message.reducer';
import Linkify from 'react-linkify';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
import Autosuggest from 'react-autosuggest';
import ReactToPrint from 'react-to-print';


const useStyles = makeStyles(theme => ({
    card: {
        width: 165
    },
    chatDiv: {
        // backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
    },
    messageRow: {
        '&.contact': {
            '& .bubble': {
                // backgroundColor: theme.palette.primary.main,
                backgroundColor: theme.palette.grey[300],
                //color: theme.palette.primary.contrastText,
                color : "#000",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                '& .time': {
                    marginLeft: 12
                }
            },
            '&.supervisor': {
                backgroundColor: "#FF6C92",
                //color: theme.palette.primary.contrastText,
                color : "#000",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                '& .time': {
                    marginLeft: 12
                } 
            },
            '&.first-of-group': {
                '& .bubble': {
                    borderTopLeftRadius: 20
                }
            },
            '&.last-of-group': {
                '& .bubble': {
                    borderBottomLeftRadius: 20
                }
            }
        },
        '&.me': {
            paddingLeft: 40,

            '& .avatar': {
                order: 2,
                margin: '0 0 0 16px'
            },
            '& .bubble': {
                marginLeft: 'auto',
                backgroundColor: "#B3E5FC",
                //color: theme.palette.getContrastText(theme.palette.grey[300]),
                color: '#000',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                '& .time': {
                    justifyContent: 'flex-end',
                    right: 0,
                    marginRight: 12
                }
            },
            '& .supervisor': {

                marginLeft: 'auto',
                backgroundColor: "#FF6C92",
                //color: theme.palette.getContrastText(theme.palette.grey[300]),
                color: '#000',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                '& .time': {
                    justifyContent: 'flex-end',
                    right: 0,
                    marginRight: 12
                } 
            },
            
            '&.first-of-group': {
                '& .bubble': {
                    borderTopRightRadius: 20
                }
            },

            '&.last-of-group': {
                '& .bubble': {
                    borderBottomRightRadius: 20
                }
            }
        },
        '&.contact + .me, &.me + .contact': {
            paddingTop: 0,
            marginTop: 0
        },
        '&.first-of-group': {
            '& .bubble': {
                borderTopLeftRadius: 20,
                paddingTop: 5
            }
        },
        '&.last-of-group': {
            '& .bubble': {
                borderBottomLeftRadius: 20,
                paddingBottom: 5,
                
            }
        }
    },
    
    
    
}));

const customerArray = [
    {
        name: 'Rahul',
        id: 'rahul123',
        index: 0,
        mood: 'good',
        nation: 'India',
        flag: ':flag_in:',
        browser: 'chrome',
        ref: "chatRef0",
        email: "rahul@getMail.com",
        department: "Sales And Service",
        Questions: "My queue is not receving any calls?",
        accountName: "Rahul@info",
        ip: "192.168.0.1",
        area: "cochin",
        message: '',
        chat: [
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hai",
                time: new Date().getTime(),
                name: "Rahul",
                type: "customer"
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul good afternoon nice to meet you buddy",
                time: new Date().getTime()+  100,
                name: 'agentName',
                type: "agent"
            },
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hi Rahul good svgdggf afternoon nice to meet you buddy",
                time: new Date().getTime()+  200,
                name: 'Rahul',
                type: "customer"
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul gsgfads gwfsdvsbuddy",
                time: new Date().getTime()+  300,
                name: 'agentName',
                type: "agent"
            },
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hi Rahul good svgdgggef dfsgnfht you buddy",
                time: new Date().getTime()+  400,
                name: 'Rahul',
                type: 'customer'
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul gsgfads edgrfh eggehj gwfsdvsbuddy",
                time: new Date().getTime()+  500,
                name: 'agentName',
                type: "agent"
            },
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hai",
                time: new Date().getTime()+ 600,
                name: "Rahul",
                type: "customer"
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul good afternoon nice to meet you buddy",
                time: new Date().getTime()+  700,
                name: 'agentName',
                type: "supervisor"
            },
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hi Rahul good svgdggf afternoon nice to meet you buddy",
                time: new Date().getTime()+ 800,
                name: 'Rahul',
                type: "customer"
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul gsgfads gwfsdvsbuddy",
                time: new Date().getTime()+  900,
                name: 'agentName',
                type: "supervisor"
            },
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hi Rahul good svgdgggef dfsgnfht you buddy",
                time: new Date().getTime()+ 1000,
                name: 'Rahul',
                type: "customer"
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul gsgfads edgrfh eggehj gwfsdvsbuddy",
                time: new Date().getTime()+ 1100,
                name: 'agentName',
                type: "agent"
                
            }
        ]
    },
    {
        name: 'Amarnath',
        id: 'amarnath123',
        index: 1,
        mood: 'okey',
        nation: 'Us',
        flag: ':us:',
        browser: 'edge',
        ref: "chatRef1",
        email: "amarnath@gmail.com",
        department: "CCS",
        Questions: "When is the new UI coming?",
        accountName: "Amar@ccs",
        ip: "192.168.10.5",
        area: "New Jersy",
        message: '',
        chat: []
    },
    {
        name: 'Vipin Vijayan',
        id: 'vipin123',
        index: 2,
        mood: 'bad',
        nation: 'India',
        flag: ':flag_in:',
        browser: 'firefox',
        ref: "chatRef2",
        email: "vipin@gmail.com",
        department: "Customer Service",
        Questions: "My dashboard is not responding?",
        accountName: "Vipin@ccs",
        ip: "192.168.100.50",
        area: "Chalakudy",
        message: '',
        chat: []
    },
    {
        name: 'Jerin',
        id: 'jerin123',
        index: 3,
        mood: 'soft',
        nation: 'Canada',
        flag: ':flag_ca:',
        browser: 'safari',
        ref: "chatRef3",
        email: "jernin@gmail.com",
        department: "Sales",
        Questions: "Is there any Discount?",
        accountName: "jerin@tts",
        ip: "192.168.10.15",
        area: "Monteral",
        message: '',
        chat: []
    }
]


const theme = {
    container: {
      position: 'relative'
    },
    input: {
      width: "800px",
      
    },
    inputFocused: {
      outline: 'none'
    },
    inputOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    suggestionsContainer: {
      display: 'none'
    },
    suggestionsContainerOpen: {
      display: 'block',
      position: 'absolute',
      bottom: 50,
      width: 280,
      border: '1px solid #aaa',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 0
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    suggestion: {
      cursor: 'pointer',
      padding: '10px 20px'
    },
    suggestionHighlighted: {
      backgroundColor: '#ddd'
    }
  };
  
  const languages = [
    {
      name: 'Hello, welcome to BroadView. How can i help you',
      hash: '#WELCOME'
    },
    {
      name: 'Thanks for your time, hope you are satisfied with our service',
      hash: '#BYE'
    },
    {
      name: 'CCS : 2000$, Phone : 100$',
      hash: '#PRICE'
    }
  ];
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return languages.filter(language => regex.test(language.hash));
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }

export default function AgentChat(props) {

    const [chatRandomArray, setChatRandomArray] = useState(customerArray);
    const [chatArray, setChatArray] = useState([]);
    const [drawerState0, setdrawerState0] = useState(false);
    const [drawerState1, setdrawerState1] = useState(false);
    const [drawerState2, setdrawerState2] = useState(false);
    const [drawerState3, setdrawerState3] = useState(false);
    const [messageText0, setMessageText0] = useState("");
    const [messageText1, setMessageText1] = useState("");
    const [messageText2, setMessageText2] = useState("");
    const [messageText3, setMessageText3] = useState("");



    const [value, setValue] = useState('');
    const [suggestions, setSuggestion] = useState([]);



    function onChange (event, { newValue, method }){
        setValue(newValue);
        setMessageText0(newValue);
      };
      
      function onSuggestionsFetchRequested ({ value }) {
        let newValue = getSuggestions(value)
        setSuggestion(newValue);
      };
    
     function  onSuggestionsClearRequested (){
        setSuggestion([]);
      };

      const inputProps = {
        placeholder: "Type 'c'",
        value,
        onChange: onChange
      };

      function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      
      function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
          return [];
        }
      
        const regex = new RegExp('^' + escapedValue, 'i');
      
        return languages.filter(language => regex.test(language.hash));
      }
      
      function getSuggestionValue(suggestion) {
        return suggestion.name;
      }

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.hash}</span>
  );
}

const renderInputComponent = inputProps => (
  <TextField
    autoFocus={false}
    id="message-input"
    className="flex-1"
    InputProps={{
      disableUnderline: true,
      classes: {
        root: "flex flex-grow flex-shrink-0 ml-16 mr-48 my-8",
        input: ""
      },
      placeholder: "Type your message",
      
    }}
    InputLabelProps={{
      shrink: false,
      className: classes.bootstrapFormLabel
    }}
    onChange={event => onInputChange(event, 0)}
    value={messageText0}
    {...inputProps}
   

  />
);


    
    const [emojiState0, setEmojiPicker0] = useState(false);
    const [emojiState1, setEmojiPicker1] = useState(false);
    const [emojiState2, setEmojiPicker2] = useState(false);
    const [emojiState3, setEmojiPicker3] = useState(false);
    const [chat, setChat] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const chatRef0 = useRef(null);
    const chatRef1 = useRef(null);
    const chatRef2 = useRef(null);
    const chatRef3 = useRef(null);
    const chatLog = useRef(null);
    const refs = [chatRef0, chatRef1, chatRef2, chatRef3];
    const classes = useStyles();
    let divStyle = {
        width: "50%",
        height: "90%"
    }
    let divClass = "",
    divChatStyle = {

    }
    if (chatArray.length === 1) {
        divStyle = {
            width: "100%",
            height: "100%"
        }
    } else if (chatArray.length === 2) {
        divStyle = {
            width: "50%",
            height: "100%"
        }
        divClass = "max-h-512";
    }
    else if (chatArray.length > 2) {
        divStyle = {
            width: "50%",
            height: "45%"
        }
        divClass = "max-h-192";
    }
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        if (chatArray.length < 4) {
            setOpen(true);
            const customer = chatRandomArray[Math.floor(Math.random() * chatRandomArray.length)];
            setSelectedCustomer(customer);
        }
    }

    function handleClose() {
        setSelectedCustomer({});
        setOpen(false);
    }
    function shouldShowContactAvatar(item, i) {
        return (
            item.to === 'agentId'
        );
    }

    function isFirstMessageOfGroup(item, i, index) {
        console.log("isFirstMessageOfGroup", i)
        return (i === 0 || (chatArray[index].chat[i - 1] && chatArray[index].chat[i - 1].from !== 'agentId'));
    }

    function isLastMessageOfGroup(item, i, index) {
        console.log("isLastMessageOfGroup", i)
        return (i === chatArray[index].chat.length - 1 || (chatArray[index].chat[i + 1] && chatArray[index].chat[i + 1].from !== 'agentId'));
    }
    function openDrawer(id) {
        if(id==="chatDrawer0") {
            setdrawerState0(!drawerState0)
        } else if(id==="chatDrawer1") {
            setdrawerState1(!drawerState1)
        } else if(id==="chatDrawer2") {
            setdrawerState2(!drawerState2)
        }
        else if(id==="chatDrawer3") {
            setdrawerState3(!drawerState3)
        }
         
    }

    useEffect(() => {
        setChatArray([customerArray[0]]);
    },[])

    function handleAddChat() {


        if (chatArray.length < 4) {
            
            let toUpdateChatArray = [...chatArray];
            toUpdateChatArray.push(selectedCustomer);
            setChatArray(toUpdateChatArray);
            let index = 0;
            let chatRandomArrayToUpdate = [...chatRandomArray];
            chatRandomArrayToUpdate.map(customerRandom => {
                if (customerRandom.id === selectedCustomer.id) {
                    chatRandomArrayToUpdate.splice(index, 1);
                }
                index = index + 1;
            })
            setChatRandomArray(chatRandomArrayToUpdate);
            setOpen(false);
            setSelectedCustomer({});
        }
    }
    function handleCloseChat(id, drawerindex) {
        if(chatArray.length === 1) {
            setdrawerState0(false);
            setEmojiPicker0(false);
        }
        if(chatArray.length === 2) {
            setdrawerState1(false);
            setEmojiPicker1(false);
        }
        if(chatArray.length === 3) {
            setdrawerState2(false);
            setEmojiPicker2(false);
        }
        if(chatArray.length === 4) {
            setdrawerState3(false);
            setEmojiPicker3(false);
        }
        
        let chatArrayToUpdate = [...chatArray];
        let index = 0; let customerToPush = {};
        chatArrayToUpdate.map(chat=> {
            if(chat.id === id) {
                chatArrayToUpdate.splice(index, 1);

            }
            index= index + 1;
        })
        customerArray.map(customer => {
            if(customer.id === id) {
                customerToPush = customer;
            }
        })
        let chatRandomArrayToUpdate = [...chatRandomArray];
        chatRandomArrayToUpdate.push(customerToPush);
        setChatRandomArray(chatRandomArrayToUpdate);
        setChatArray(chatArrayToUpdate)

        

    }
    function onInputChange(event, id) {
       if(id === 0 ) {
           setMessageText0(event.target.value);
       }
       if(id === 1 ) {
            setMessageText1(event.target.value); 
       }  
        if(id === 2 ) {
            setMessageText2(event.target.value);    
        }
        if(id === 3 ) {
            setMessageText3(event.target.value);    
        }
    }
    function addEmoji (n, e, index) {
        console.log("addemoji", index);
        const emojiString = n.colons;
        if(index === 0 ) {
            setMessageText0(messageText0 + " " + emojiString);
        }
        if(index === 1 ) {
             setMessageText1(messageText1 + " " + emojiString); 
        }  
         if(index === 2 ) {
             setMessageText2(messageText2 + " " + emojiString);    
         }
         if(index === 3 ) {
             setMessageText3(messageText3 + " " + emojiString);    
         }
    }
    function scrollToBottom(id)
    {   if(id === 0) {
            chatRef0.current.scrollTop = chatRef0.current.scrollHeight;
        } else if (id === 1) {
            chatRef1.current.scrollTop = chatRef1.current.scrollHeight;
        } else if (id === 2) {
            chatRef2.current.scrollTop = chatRef2.current.scrollHeight;
        } else if (id === 3) {
            chatRef3.current.scrollTop = chatRef3.current.scrollHeight;
        }
        
    }

    function toggleEmojiPicker (id) {
        if(id===0) {
            setEmojiPicker0(!emojiState0)
        }
        if(id===1) {
            setEmojiPicker1(!emojiState1)
        }
        if(id===2) {
            setEmojiPicker2(!emojiState2)
        }
        if(id===3) {
            setEmojiPicker3(!emojiState3)
        }
        
    }
    function onMessageSubmit (event, id) {
        event.preventDefault();
        
        let messageText = '';
        if(id === 0) {
            messageText = messageText0;
            setMessageText0("");
            setValue('');
            setEmojiPicker0(false)
        } else if(id === 1) {
            messageText = messageText1;
            setMessageText1("");
            setEmojiPicker1(false)
        }
        else if(id === 2) {
            messageText = messageText2;
            setMessageText2("");
            setEmojiPicker2(false)
        }
        else if(id === 3) {
            messageText = messageText3;
            setMessageText3("");
            setEmojiPicker3(false)
        }
        if(messageText.trim() === "") {
            return;
        }
        let chatArrayToUpdate = [...chatArray];
        let messageToPush = {
            from: "agentId",
            to: chatArray[id].id,
            payload: messageText.trim(),
            time: new Date().getTime(),
            name: 'agentName'
        }
        chatArrayToUpdate[id].chat.push(messageToPush);
        setChatArray(chatArrayToUpdate);
        scrollToBottom(id);
    }
function displayRightSideBar(id) {


    console.log("chatarray",chatArray, id);
    if(chatArray.length> 0) {
        return (
            <FuseScrollbars>
             <Paper className="row w-full rounded-8 shadow-none border-1" style={{ height: "100%", width: "100%" }}>
                                <FusePageSimple
                                    classes={{
                                        header: "min-h-40 h-40",
                                        content: classes.content,
                                    }}
                                    header ={
                                        <Typography className="font-medium truncate ml-96 mt-12" color="inherit">
                                            Prequestion
                                        </Typography>
                                    }
                                    content = {
                                        <div
                                            style={{
                                                "justifyContent": "space-between",
                                                width: "100%",
                                                display: "flex"
                                            }}
                                            className="flex-col mb-48"
                                        >
                                        <Typography className="font-medium truncate" color="inherit">
                                            Email       : {chatArray[id].email}
                                        </Typography>
                                        <Typography className="font-medium truncate" color="inherit">
                                            Department  : {chatArray[id].department}
                                        </Typography>
                                        <Typography className="font-medium truncate" color="inherit">
                                            Questions   : {chatArray[id].Questions} 
                                        </Typography>
                                        </div>
                                    }
                                    />
            </Paper>
            <Paper className="row w-full rounded-8 shadow-none border-1" style={{ height: "100%", width: "100%" }}>
                                <FusePageSimple
                                    classes={{
                                        header: "min-h-40 h-40",
                                        content: classes.content,
                                    }}
                                    header ={
                                        <Typography className="font-medium truncate ml-96 mt-12" color="inherit">
                                            CRM
                                        </Typography>
                                    }
                                    content = {
                                        <div
                                            style={{
                                                "justifyContent": "space-between",
                                                width: "100%",
                                                display: "flex"
                                            }}
                                            className="flex-col mb-48"
                                        >
                                        <Typography className="font-medium truncate" color="inherit">
                                            Account Name       : {chatArray[id].accountName}
                                        </Typography>
                                        </div>
                                    }
                                    />
            </Paper>
            <Paper className="row w-full rounded-8 shadow-none border-1" style={{ height: "100%", width: "100%" }}>
                                <FusePageSimple
                                    classes={{
                                        header: "min-h-40 h-40",
                                        content: classes.content,
                                    }}
                                    header ={
                                        <Typography className="font-medium truncate ml-96 mt-12" color="inherit">
                                            Vistor Info
                                        </Typography>
                                    }
                                    content = {
                                        <div
                                            style={{
                                                "justifyContent": "space-between",
                                                width: "100%",
                                                display: "flex"
                                            }}
                                            className="flex-col mb-48"
                                        >
                                        <Typography className="font-medium truncate" color="inherit">
                                            IP       : {chatArray[id].ip}
                                        </Typography>
                                        <Typography className="font-medium truncate" color="inherit">
                                            Area       : {chatArray[id].area}
                                        </Typography>
                                        </div>
                                    }
                                    />
            </Paper>
            
        </FuseScrollbars>
        )
    }
    
}
    
    const emptyChat = (
        <div className="flex flex-col flex-1 items-center justify-center p-2">
            <div className="max-w-512 text-center">
                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <Typography variant="h2" color="inherit" className="font-medium mb-32">
                        No chats here.
                    </Typography>
                </FuseAnimate>
                <FuseAnimate delay={500}>
                    <Typography variant="h5" color="textSecondary" className="mb-16">
                        Looks like currently, you do not have any chat requests that you will have to attend to!
                </Typography>
                </FuseAnimate>
                <FuseAnimate delay={500}>

                    <img className="w-160 print:w-60" src={Image} alt="Work - relax" />

                </FuseAnimate>
            </div>
        </div>
    )
    return (
        <div className="flex flex-row flex-wrap "  style={{ width: "100%", height: "100%" }}>
            {/* <div className="p-2 w-full" style={{ height: "6%" }}>
                <Fab size="small" onClick={handleClickOpen} color="secondary">
                    <Icon>add</Icon>
                </Fab>
            </div> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"New Incoming chat request?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        New incoming chat request from {selectedCustomer.name} from {selectedCustomer.nation}.
                        Do you want to accept the chat request?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                </Button>
                    <Button onClick={handleAddChat} color="primary" autoFocus>
                        Agree
                </Button>
                </DialogActions>
            </Dialog>
        
            {chatArray.length === 0 ? emptyChat : chatArray.length === 1 ? (
                <div style={divStyle} key={chatArray[0].name}>
                    <div className="widget   w-full sm:w-1/2 md:w-1/4 p-12" style={{ width: "100%", height: "100%" }}>
                    
                        <Paper className="row w-full rounded-8 shadow-none border-1" style={{ height: "100%", width: "100%" }}
                        ref={chatLog}>
                            <FusePageSimple
                                classes={{
                                    header: "min-h-40 h-40",
                                    toolbar: "min-h-40 h-40",
                                    rightSidebar: "w-288",
                                    content: classes.content,
                                }}
                                header={
                                    
                                    <div className="flex flex-col justify-between flex-1 px-2 pt-4">
                                        <div className="flex items-start">
                                            <div className="pl-2" style={{ width: "10%" }}>
                                                <Emojify  >{chatArray[0].flag}</Emojify>
                                            </div>
                                            <Typography style={{ width: "50%" }} className="pl-2 p-l-8 sm:py-0" variant="h5">{chatArray[0].name}</Typography>
                                            <div style={{ width: "20%" }} className="p-0 sm:py-0">
                                            {
                                                chatArray[0].browser === 'chrome'? <img height="30px" width="30px"  src={ChromeImage} alt="Chrome" /> : 
                                                chatArray[0].browser === 'edge' ? <img height="30px" width="30px" src={EdgeImage} alt="Edge" /> :
                                                chatArray[0].browser === 'firefox' ? <img height="30px" width="30px" src={FireFoxImage} alt="Firefox" /> :
                                                chatArray[0].browser === 'safari' ? <img  height="30px" width="30px" src={SafariImage} alt="safari" /> : null
                                            }
                                                
                                            </div>
                                            {/* <div style={{ width: "20%" }} className="px-2 pt-4 sm:py-4">
                                                <Timer timeInSecond={0} />
                                            </div> */}
                                            <ReactToPrint
                                                trigger={() => <Icon>print</Icon>}
                                                content={() => chatLog.current}
                                            />
                                            <Icon style={{marginLeft: "10px"}}>note</Icon>
                                            <Icon style={{marginLeft: "10px"}}>info</Icon>
                                        </div>
                                    </div>
                                }
                                content={
                                    <div  className={clsx(classes.chatDiv, "p-12, ")}
                                        style={{ height: "100%", width: "100%" }}>
                                        <FuseAnimateGroup
                                            className="flex flex-wrap"
                                            enter={{
                                                animation: "transition.slideUpBigIn"
                                            }}
                                            style={{ height: "100%", width: "100%" }}
                                        >
                                            <div className={clsx("flex flex-col relative", props.className)}
                                                style={{ width: "100%"}}>
                                                <FuseScrollbars
                                                    ref={chatRef0}
                                                    className="flex flex-1 flex-col overflow-y-auto max-h-512"
                                                    
                                                    
                                                >
                                                    {chatArray[0].chat && chatArray[0].chat.length > 0 ?
                                                        (
                                                            <div className="flex flex-col pt-16 pl-56 pr-16 pb-40"
                                                            >
                                                                {chatArray[0].chat.map((item, i) => {
                                                                    //const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
                                                                    return (
                                                                        <div
                                                                            key={item.time}
                                                                            className={clsx(
                                                                                classes.messageRow,
                                                                                "flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative pr-16 pb-4 pl-16",
                                                                                { 'me': item.from === 'agentId' },
                                                                                { 'contact': item.from !== 'agentId' },
                                                                                { 'first-of-group': isFirstMessageOfGroup(item, i, 0) },
                                                                                { 'last-of-group': isLastMessageOfGroup(item, i, 0) },
                                                                                (i + 1) === chatArray[0].chat.length && "pb-2"
                                                                            )}
                                                                        >
                                                                            {shouldShowContactAvatar(item, i) && (
                                                                                <Avatar className="avatar absolute left-0 m-0 -ml-32">{item.name.charAt(0) + "" + item.name.charAt(1)}</Avatar>
                                                                            )}
                                                                            {item.type === 'supervisor'?
                                                                                (<div className={clsx("supervisor flex relative items-center justify-center p-4 max-w-full")}>
                                                                                <div className="leading-tight whitespace-pre-wrap">
                                                                                <Linkify properties={{onClick: function onClick(e) { e.preventDefault(); window.open(item.payload, "_blank") }}}>
                                                                                <Emojify>{item.payload+ "  "} </Emojify>
                                                                                </Linkify>
                                                                                
                                                                                <span className="time   w-full text-11 "
                                                                                    color="textSecondary">{moment(item.time).format('h:mm:ss a')}</span>
                                                                                </div>
                                                                               
                                                                            </div>) :
                                                                            (<div className={clsx("bubble flex relative items-center justify-center p-4 max-w-full")}>
                                                                            <div className="leading-tight whitespace-pre-wrap">
                                                                            <Linkify properties={{onClick: function onClick(e) { e.preventDefault(); window.open(item.payload, "_blank") }}}>
                                                                            <Emojify>{item.payload+ "  "} </Emojify>
                                                                            </Linkify>
                                                                            
                                                                            <span className="time   w-full text-11 "
                                                                                color="textSecondary">{moment(item.time).format('h:mm:ss a')}</span>
                                                                            </div>
                                                                           
                                                                        </div>)}
                                                                            
                                                                           
                                                                           
                                                                        </div>
                                                                    )
                                                                })}
                                                                 
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col flex-1" style={{ width: "100%" }}>
                                                                <div className="flex flex-col flex-1 items-center justify-center">
                                                                    <Icon className="text-128" color="disabled">chat</Icon>
                                                                </div>
                                                                <Typography className="px-16 pb-96 text-center" color="textSecondary">
                                                                    Start a conversation by typing your message below.
                            </Typography>
                                                            </div>
                                                        )
                                                    }

                                                </FuseScrollbars>
                                                {/* {chat && (
                                                    <form  onSubmit={(event)=>onMessageSubmit(event,0)} className="absolute bottom-0 right-0 left-0 py-0 px-8">
                                                    {emojiState0?<Picker set='emojione'  onSelect={(n, e)=>addEmoji(n, e, 0)}/>: null}
                                                        <Paper className="flex items-center relative rounded-24" elevation={1}>
                                                          

                                                        <Autosuggest 
                                                            suggestions={suggestions}
                                                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                            getSuggestionValue={getSuggestionValue}
                                                            renderSuggestion={renderSuggestion}
                                                            inputProps={inputProps}
                                                            theme={theme}
                                                            autoFocus={false}
                                                            renderInputComponent={renderInputComponent}
                                                        />
                                                            <IconButton className="absolute right-0 top-0" type="submit">
                                                                <Icon className="text-24" color="action">send</Icon>
                                                            </IconButton>
                                                            <IconButton className="absolute  top-0" type="button"
                                                            style={{right: "48px"}} onClick={() => toggleEmojiPicker(0)}>
                                                                <Icon className="text-24" color="action">insert_emoticon</Icon>
                                                            </IconButton>
                                                        </Paper>
                                                    </form>
                                                )} */}
                                            </div>
                                        </FuseAnimateGroup>
                                    </div>
                                }
                                rightSidebarContent={
                                    <FuseAnimateGroup
                                        className="w-full"
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        <div className="">
                                           {displayRightSideBar(0)}
                                        </div>
                                    </FuseAnimateGroup>
                                }
                            />
                        </Paper>
                    </div>
                </div>
            ) :
                chatArray.map((chats, index) => {
                    return (
                        <div style={divStyle} className={clsx("min-h-352")} key={chats.name}>
                            <div className="widget   w-full sm:w-1/2 md:w-1/4 p-2" style={{ width: "100%", height: "100%" }}>
                                <Paper className="w-full rounded-8 shadow-none border-1 mb-12" style={{ height: "100%" }}>
                                <FusePageSimple
                                style={{ height: "100%" }}
                                classes={{
                                    header: "min-h-40 h-40",
                                    toolbar: "min-h-40 h-40",
                                    content: classes.content,
                                    
                                }}
                                header={
                                    <div className="flex flex-col justify-between flex-1 px-2 pt-4">
                                        <div className="flex items-start">
                                            <div className="pl-4" style={{ width: "10%" }}>
                                                <Emojify  >{chatArray[index].flag}</Emojify>
                                            </div>
                                            <Typography style={{ width: "50%" }} className=" p-l-8 sm:py-0" variant="h6">{chatArray[index].name}</Typography>
                                            <div style={{ width: "20%" }} className="p-0 sm:py-0">
                                            {
                                                chatArray[index].browser === 'chrome'? <img height="30px" width="30px"  src={ChromeImage} alt="Chrome" /> : 
                                                chatArray[index].browser === 'edge' ? <img height="30px" width="30px" src={EdgeImage} alt="Edge" /> :
                                                chatArray[index].browser === 'firefox' ? <img height="30px" width="30px" src={FireFoxImage} alt="Firefox" /> :
                                                chatArray[index].browser === 'safari' ? <img  height="30px" width="30px" src={SafariImage} alt="safari" /> : null
                                            }
                                            </div>
                                            <div style={{ width: "20%" }} className="px-2 pt-4 sm:py-4">
                                                <Timer timeInSecond={0} />
                                            </div>
                                            <Icon onClick={()=>openDrawer("chatDrawer"+index)}> menu</Icon>
                                            <Icon onClick={()=>handleCloseChat(chatArray[index].id, chatArray[index].index)}>close</Icon>
                                        </div>
                                    </div>
                                }
                                content={
                                    <div className={clsx(classes.chatDiv, "p-12")}
                                        style={{ height: "100%", width: "100%" }}>
                                        <FuseAnimateGroup
                                        
                                            className="flex flex-wrap"
                                            enter={{
                                                animation: "transition.slideUpBigIn"
                                            }}
                                            style={{ height: "100%", width: "100%" }}
                                        >
                                            <div className={clsx("flex flex-col relative",  props.className)}
                                                style={{ width: "100%" }} id={"chatDrawer"+index}>
                                                <FuseScrollbars
                                                    ref={refs[index]}
                                                    className={clsx("flex flex-1 flex-col overflow-y-auto", divClass)}
                                                    
                                                    
                                                >
                                                    {chatArray[index].chat && chatArray[index].chat.length > 0 ?
                                                        (
                                                            <div className="flex flex-col pt-16 pl-56 pr-16 pb-40">
                                                                {chatArray[index].chat.map((item, i) => {
                                                                    //const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
                                                                    return (
                                                                        <div
                                                                            key={item.time}
                                                                            className={clsx(
                                                                                classes.messageRow,
                                                                                "flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative pr-16 pb-4 pl-16",
                                                                                { 'me': item.from === 'agentId' },
                                                                                { 'contact': item.from !== 'agentId' },
                                                                                { 'first-of-group': isFirstMessageOfGroup(item, i, index) },
                                                                                { 'last-of-group': isLastMessageOfGroup(item, i, index) },
                                                                                (i + 1) === chatArray[0].chat.length && "pb-2"
                                                                            )}
                                                                        >
                                                                            {shouldShowContactAvatar(item, i) && (
                                                                                <Avatar className="avatar absolute left-0 m-0 -ml-32">{item.name.charAt(0) + "" + item.name.charAt(1)}</Avatar>
                                                                            )}
                                                                            <div className="bubble flex relative items-center justify-center p-4 max-w-full">
                                                                                <div className="leading-tight whitespace-pre-wrap">
                                                                                <Linkify properties={{target: '_blank'}}>
                                                                                <Emojify>{item.payload + "  "}</Emojify>
                                                                                </Linkify>
                                                                                
                                                                                
                                                                                <span className="time   w-full text-11 "
                                                                                    color="textSecondary">{moment(item.time).format('h:mm:ss a')}</span>
                                                                                </div>
                                                                                {/* <Typography className="time absolute  w-full text-11 mt-8 -mb-24 left-0 bottom-0 whitespace-no-wrap"
                                                                                    color="textSecondary">{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography> */}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col flex-1" style={{ width: "100%" }}>
                                                                <div className="flex flex-col flex-1 items-center justify-center">
                                                                    <Icon className="text-128" color="disabled">chat</Icon>
                                                                </div>
                                                                <Typography className="px-16 pb-96 text-center" color="textSecondary">
                                                                    Start a conversation by typing your message below.
                            </Typography>
                                                            </div>
                                                        )
                                                    }

                                                </FuseScrollbars>
                                                {chat && (
                                                    <form  onSubmit={(event)=>onMessageSubmit(event,index)} className="absolute bottom-0 right-0 left-0 py-0 px-8">
                                                        {index === 0? emojiState0?<Picker set='emojione' onSelect={(n, e)=>addEmoji(n, e, index)} />: null :
                                                            index ===1? emojiState1?<Picker set='emojione' onSelect={(n, e)=>addEmoji(n, e, index)}/>: null :
                                                            index === 2? emojiState2?<Picker set='emojione' onSelect={(n, e)=>addEmoji(n, e, index)}/>: null: 
                                                            index === 3? emojiState3?<Picker set='emojione' onSelect={(n, e)=>addEmoji(n, e, index)} />: null : null}
                                                        <Paper className="flex items-center relative rounded-24" elevation={1}>
                                                            <TextField
                                                                autoFocus={false}
                                                                id="message-input"
                                                                className="flex-1"
                                                                InputProps={{
                                                                    disableUnderline: true,
                                                                    classes: {
                                                                        root: "flex flex-grow flex-shrink-0 ml-16 mr-48 my-8",
                                                                        input: ""
                                                                    },
                                                                    placeholder: "Type your message"
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: false,
                                                                    className: classes.bootstrapFormLabel
                                                                }}
                                                                onChange={(event)=>onInputChange(event,index)}
                                                                value={index === 0 ? messageText0 : 
                                                                index === 1 ? messageText1 :
                                                                index === 2 ? messageText2 :
                                                                index === 3? messageText3 : ''}
                                                            />
                                                            <IconButton className="absolute right-0 top-0" type="submit">
                                                                <Icon className="text-24" color="action">send</Icon>
                                                            </IconButton>
                                                            <IconButton className="absolute  top-0" type="button"
                                                            style={{right: "48px"}} onClick={() => toggleEmojiPicker(index)} >
                                                                <Icon className="text-24" color="action">insert_emoticon</Icon>
                                                            </IconButton>
                                                        </Paper>
                                                    </form>
                                                )}
                                            </div>
                                        </FuseAnimateGroup>
                                    </div>
                                }
                                
                            />

                                </Paper>
                            </div>
                        </div>
                    )
                })}

<Drawer
  open={drawerState0}
  anchor="right"
  onClose={() => {openDrawer(0)}}
  
  PaperProps={{ style: { position: 'absolute', width: "50%", height: "80%" } }}
  BackdropProps={{ style: { position: 'absolute', height: "80%" } }}
  ModalProps={{
    container: document.getElementById('chatDrawer0'),
    style: { position: 'absolute' }
  }}
  variant="temporary"
>
<FuseAnimateGroup
                                        className="w-full"
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        <div className="">
                                        {
                                            chatArray.length > 0? displayRightSideBar(0): ""
                                        }
                                           
                                        </div>
                                    </FuseAnimateGroup>
</Drawer>

<Drawer
  open={drawerState1}
  anchor="right"
  onClose={() => {openDrawer(1)}}
  
  PaperProps={{ style: { position: 'absolute', width: "50%", height: "80%" } }}
  BackdropProps={{ style: { position: 'absolute', height: "80%" } }}
  ModalProps={{
    container: document.getElementById('chatDrawer1'),
    style: { position: 'absolute' }
  }}
  variant="temporary"
>
<FuseAnimateGroup
                                        className="w-full"
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        <div className="">
                                        {
                                            chatArray.length > 1? displayRightSideBar(1): ""
                                        }
                                        </div>
                                    </FuseAnimateGroup>
</Drawer>
<Drawer
  open={drawerState2}
  anchor="right"
  onClose={() => {openDrawer(2)}}
  
  PaperProps={{ style: { position: 'absolute', width: "50%", height: "80%" } }}
  BackdropProps={{ style: { position: 'absolute', height: "80%" } }}
  ModalProps={{
    container: document.getElementById('chatDrawer2'),
    style: { position: 'absolute' }
  }}
  variant="temporary"
>
<FuseAnimateGroup
                                        className="w-full"
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        <div className="">
                                        {
                                            chatArray.length > 2? displayRightSideBar(2): ""
                                        }
                                        </div>
                                    </FuseAnimateGroup>
</Drawer>
<Drawer
  open={drawerState3}
  anchor="right"
  onClose={() => {openDrawer(3)}}
  
  PaperProps={{ style: { position: 'absolute', width: "50%", height: "80%" } }}
  BackdropProps={{ style: { position: 'absolute', height: "80%" } }}
  ModalProps={{
    container: document.getElementById('chatDrawer3'),
    style: { position: 'absolute' }
  }}
  variant="temporary"
>
<FuseAnimateGroup
                                        className="w-full"
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        <div className="">
                                        {
                                            chatArray.length > 3? displayRightSideBar(3): ""
                                        }
                                        </div>
                                    </FuseAnimateGroup>
</Drawer>
        </div>
    )
}
