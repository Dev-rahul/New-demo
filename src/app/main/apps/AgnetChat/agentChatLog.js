import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Icon, Fab,Typography, Avatar, Select, Paper,  IconButton, TextField,
Button, DialogActions,DialogContent, DialogContentText, DialogTitle, Divider, Dialog } from '@material-ui/core';
import clsx from 'clsx';
import { FuseAnimateGroup, FuseAnimate, FusePageSimple,
    FuseScrollbars } from "@fuse";
import Image from '../../../../assets/work-relax.jpg';
import Emojify from 'react-emojione';
import Timer from '../Dashboard/timer';
import moment from 'moment/moment';


const useStyles = makeStyles(theme => ({
    messageRow: {
        '&.contact'                       : {
            '& .bubble'       : {
                backgroundColor        : theme.palette.primary.main,
                color                  : theme.palette.primary.contrastText,
                borderTopLeftRadius    : 5,
                borderBottomLeftRadius : 5,
                borderTopRightRadius   : 20,
                borderBottomRightRadius: 20,
                '& .time'              : {
                    marginLeft: 12
                }
            },
            '&.first-of-group': {
                '& .bubble': {
                    borderTopLeftRadius: 20
                }
            },
            '&.last-of-group' : {
                '& .bubble': {
                    borderBottomLeftRadius: 20
                }
            }
        },
        '&.me'                            : {
            paddingLeft: 40,

            '& .avatar'       : {
                order : 2,
                margin: '0 0 0 16px'
            },
            '& .bubble'       : {
                marginLeft             : 'auto',
                backgroundColor        : theme.palette.grey[300],
                color                  : theme.palette.getContrastText(theme.palette.grey[300]),
                borderTopLeftRadius    : 20,
                borderBottomLeftRadius : 20,
                borderTopRightRadius   : 5,
                borderBottomRightRadius: 5,
                '& .time'              : {
                    justifyContent: 'flex-end',
                    right         : 0,
                    marginRight   : 12
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
            paddingTop: 20,
            marginTop : 20
        },
        '&.first-of-group'                : {
            '& .bubble': {
                borderTopLeftRadius: 20,
                paddingTop         : 13
            }
        },
        '&.last-of-group'                 : {
            '& .bubble': {
                borderBottomLeftRadius: 20,
                paddingBottom         : 13,
                '& .time'             : {
                    display: 'flex'
                }
            }
        }
    }
}));

const customerArray = [
  {
      name: 'Rahul',
      id: 'rahul123',
      mood: 'good',
      nation: 'India',
      browser: 'Chrome',
      chat: [
          {
              from: "rahul123",
              to: "agentId",
              payload: "Hai",
              time: Math.floor(Date.now() / 1000),
              name: "Rahul"
          },
          {
              from: "agentId",
              to: "rahul123",
              payload: "Hi Rahul",
              time: (Math.floor(Date.now() / 1000)+100),
              name: 'agentName'
          }
      ]
  },
  {
      name: 'Amarnath',
      id: 'amarnath123',
      mood: 'okey',
      nation: 'Us',
      browser: 'Internet Explorer',
      chat: []
  },
  {
      name: 'Vipin Vijayan',
      id: 'vipin123',
      mood: 'bad',
      nation: 'India',
      browser: 'FireFox',
      chat: []
  },
  {
      name: 'Jerin',
      id: 'jerin123',
      mood: 'soft',
      nation: 'Canada',
      browser: 'Chrome',
      chat: []
  }
]


export default function AgentChatLogs(props) {

//   const [chatRandomArray, setChatRandomArray] = useState(customerArray);
//   const [chatArray, setChatArray] = useState([customerArray[0]]);
//   const [chat, setChat] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState({});
//   const chatRef = useRef(null);
//   const classes = useStyles();
//   let flag = 0;
//   let divStyle = {
//       width: "50%",
//       height: "90%"
//   }
//   if(chatArray.length === 1) {
//     divStyle = {
//         width: "100%",
//         height: "90%"
//     }
//   } else if(chatArray.length === 2) {
//     divStyle = {
//         width: "50%",
//         height: "90%"
//     }
//   }
//   else if(chatArray.length > 2) {
//     divStyle = {
//         width: "50%",
//         height: "45%"
//     }
//   }
//   const [open, setOpen] = React.useState(false);

//   function handleClickOpen() {
//     if(chatArray.length <4) {
//         setOpen(true);
//         const customer = chatRandomArray[Math.floor(Math.random()* chatRandomArray.length)];
//         setSelectedCustomer(customer);
//     }
//   }

//   function handleClose() {
//     setSelectedCustomer({});
//     setOpen(false);
//   }
//   function shouldShowContactAvatar(item, i)
//     {
//         return (
//             item.to === 'agentId' 
//         );
//     }

//   function isFirstMessageOfGroup(item, i, )
//     {
//         return (i === 0 || (chatArray[0].chat[i - 1] && chatArray[0].chat[i - 1].from !== 'agentId'));
//     }

//     function isLastMessageOfGroup(item, i)
//     {
//         return (i === chatArray[0].chat.length - 1 || (chatArray[0].chat[i + 1] && chatArray[0].chat[i + 1].from !== 'agentId'));
//     }

//     console.log(props)
    

//   function handleAddChat(num) {

//         let chatRandomArrayToUpdate = customerArray[num];
//        console.log(chatRandomArrayToUpdate);
//         setChatRandomArray(chatRandomArrayToUpdate);
//         setOpen(false);
//         setSelectedCustomer({});
        
//   }

  
// useEffect(() => {
//   if(props.location.state.id==="Rahul") {
//     console.log(' i was here')
//     handleAddChat(0);

 
// }
// }, []);
  

//   const emptyChat = (
//     <div className="flex flex-col flex-1 items-center justify-center p-2">
//         <div className="max-w-512 text-center">
//             <FuseAnimate animation="transition.expandIn" delay={100}>
//                     <Typography variant="h2" color="inherit" className="font-medium mb-32">
//                         No chats here.
//                     </Typography>
//             </FuseAnimate>
//             <FuseAnimate delay={500}>
//                 <Typography variant="h5" color="textSecondary" className="mb-16">
//                     Looks like currently, you do not have any chat requests that you will have to attend to!
//                 </Typography>
//             </FuseAnimate>
//             <FuseAnimate delay={500}>
              
//                         <img className="w-160 print:w-60" src={Image} alt="Work - relax"/>
            
//             </FuseAnimate>
//         </div>
//     </div>
//   )
//   return (
//     <div className="flex flex-row flex-wrap " style={{width: "100%", height: "100%"}}>
        
//         {chatArray.length=== 0? emptyChat : chatArray.length === 1? (
//             <div  style={divStyle} key={chatArray[0].name}>
//             <div className="widget   w-full sm:w-1/2 md:w-1/4 p-12" style={{width: "100%", height: "100%"}}>
//                 <Paper className="row w-full rounded-8 shadow-none border-1" style={{height: "100%", width: "100%"}}>
//                 <FusePageSimple
//             classes={{
//                 header      : "min-h-48 h-48",
//                 toolbar     : "min-h-48 h-48",
//                 rightSidebar: "w-288",
//                 content     : classes.content,
//             }}
//             header={
//                 <div className="flex flex-col justify-between flex-1 px-2 pt-4">
//                     <div className="flex items-start">
//                         <div className="p-4" style={{width: "10%"}}>
//                             <Emojify  >:wink:</Emojify>
//                         </div>
//                         <Typography style={{width:"50%"}}className="p-2 p-l-8 sm:py-4" variant="h6">{chatArray[0].name}</Typography>
//                         <div style={{width:"20%"}} className="p-4 sm:py-4">mood</div>
//                         <div style={{width:"20%"}} className="px-2 pt-4 sm:py-4">
//                             <Timer timeInSecond={0}/>
//                         </div>
//                     </div>
//                 </div>
//             }
//             content={
//                 <div className="p-12"
//                 style={{height: "100%", width: "100%"}}>
//                     <FuseAnimateGroup
//                             className="flex flex-wrap"
//                             enter={{
//                                 animation: "transition.slideUpBigIn"
//                             }}
//                             style={{height: "100%", width: "100%"}}
//                         >
//                             <div className={clsx("flex flex-col relative", props.className)}
//                             style={{width: "100%"}}>
//                             <FuseScrollbars
//                 ref={chatRef}
//                 className="flex flex-1 flex-col overflow-y-auto"
//             >
//                 {chatArray[0].chat && chatArray[0].chat.length > 0 ?
//                     (
//                          <div className="flex flex-col pt-16 pl-56 pr-16 pb-40">
//                              {chatArray[0].chat.map((item, i) => {
//                                  //const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
//                                  return (
//                                      <div
//                                          key={item.time}
//                                          className={clsx(
//                                              classes.messageRow,
//                                              "flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative pr-16 pb-4 pl-16",
//                                              {'me': item.from === 'agentId'},
//                                              {'contact': item.from !== 'agentId'},
//                                              {'first-of-group': isFirstMessageOfGroup(item, i)},
//                                              {'last-of-group': isLastMessageOfGroup(item, i)},
//                                              (i + 1) === chatArray[0].chat.length && "pb-96"
//                                          )}
//                                      >
//                                       {shouldShowContactAvatar(item, i) && (
//                                              <Avatar className="avatar absolute left-0 m-0 -ml-32">{item.name.charAt(0)+""+item.name.charAt(1)}</Avatar>
//                                          )}
//                                          <div className="bubble flex relative items-center justify-center p-12 max-w-full">
//                                              <div className="leading-tight whitespace-pre-wrap">{item.payload}</div>
//                                              <Typography className="time absolute  w-full text-11 mt-8 -mb-24 left-0 bottom-0 whitespace-no-wrap"
//                                                          color="textSecondary">{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
//                                          </div>
//                                      </div>
//                                  )
//                              })}
//                          </div>
//                     ) : (
//                         <div className="flex flex-col flex-1" style={{width: "100%"}}>
//                             <div className="flex flex-col flex-1 items-center justify-center">
//                                 <Icon className="text-128" color="disabled">chat</Icon>
//                             </div>
//                             <Typography className="px-16 pb-96 text-center" color="textSecondary">
//                                 Start a conversation by typing your message below.
//                             </Typography>
//                         </div>
//                     )
//                 }

//             </FuseScrollbars>
//             {chat && (
//                 <form  className="absolute bottom-0 right-0 left-0 py-16 px-8">
//                     <Paper className="flex items-center relative rounded-24" elevation={1}>
//                         <TextField
//                             autoFocus={false}
//                             id="message-input"
//                             className="flex-1"
//                             InputProps={{
//                                 disableUnderline: true,
//                                 classes         : {
//                                     root : "flex flex-grow flex-shrink-0 ml-16 mr-48 my-8",
//                                     input: ""
//                                 },
//                                 placeholder     : "Type your message"
//                             }}
//                             InputLabelProps={{
//                                 shrink   : false,
//                                 className: classes.bootstrapFormLabel
//                             }}
//                             // onChange={onInputChange}
//                             value={"hai"}
//                         />
//                         <IconButton className="absolute right-0 top-0" type="submit">
//                             <Icon className="text-24" color="action">send</Icon>
//                         </IconButton>
//                     </Paper>
//                 </form>
//             )}
//         </div>
//                     </FuseAnimateGroup>
//                 </div>
//             }
//             rightSidebarContent={
//                 <FuseAnimateGroup
//                     className="w-full"
//                     enter={{
//                         animation: "transition.slideUpBigIn"
//                     }}
//                 >
//                     <div className="p-6">
//                         right side panel
//                     </div>
//                 </FuseAnimateGroup>
//             }
//         />
                   
//                 </Paper>
//             </div>
//         </div>
//         ): 
//         chatArray.map(chats => {
//             return (
//                 <div  style={divStyle} key={chats.name}>
//                     <div className="widget   w-full sm:w-1/2 md:w-1/4 p-12" style={{width: "100%", height: "100%"}}>
//                         <Paper className="w-full rounded-8 shadow-none border-1" style={{height: "100%"}}>
//                             <div className="flex w-full items-center justify-between px-16 py-16 border-b-1" >
//                                 <Typography className="text-16">{chats.name}</Typography>
//                             </div>
//                             <div className="flex flex-row flex-wrap w-full" >
//                                 <div className="w-full md:w-1/2 p-8 min-h-420 h-420">
//                                 </div>
//                             </div>

//                         </Paper>
//                     </div>
//                 </div>
//             )
//         })} 
//     </div>
//   )



const customerArray = [
    {
        name: 'Rahul',
        id: 'rahul123',
        mood: 'good',
        nation: 'India',
        browser: 'Chrome',
        chat: [
            {
                from: "rahul123",
                to: "agentId",
                payload: "Hai",
                time: Math.floor(Date.now() / 1000),
                name: "Rahul"
            },
            {
                from: "agentId",
                to: "rahul123",
                payload: "Hi Rahul",
                time: (Math.floor(Date.now() / 1000)+100),
                name: 'agentName'
            }
        ]
    },
    {
        name: 'Amarnath',
        id: 'amarnath123',
        mood: 'okey',
        nation: 'Us',
        browser: 'Internet Explorer',
        chat: []
    },
    {
        name: 'Vipin Vijayan',
        id: 'vipin123',
        mood: 'bad',
        nation: 'India',
        browser: 'FireFox',
        chat: []
    },
    {
        name: 'Jerin',
        id: 'jerin123',
        mood: 'soft',
        nation: 'Canada',
        browser: 'Chrome',
        chat: []
    }
  ]
  




//const dispatch = useDispatch();
   // const contacts = useSelector(({chatApp}) => chatApp.contacts.entities);
    const selectedContactId = customerArray[0].id
    const chat = customerArray[0].chat
    //const user = useSelector(({chatApp}) => chatApp.user);
    const chatArray = [customerArray[0]];


    const classes = useStyles(props);
    const chatRef = useRef(null);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        if ( chat )
        {
            scrollToBottom();
        }
    }, [chat]);

    function scrollToBottom()
    {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    function shouldShowContactAvatar(item, i)
    {
        return (
            item.who === selectedContactId &&
            ((chat.dialog[i + 1] && chat.dialog[i + 1].who !== selectedContactId) || !chat.dialog[i + 1])
        );
    }

    function isFirstMessageOfGroup(item, i, )
    {
        return (i === 0 || (chatArray[0].chat[i - 1] && chatArray[0].chat[i - 1].from !== 'agentId'));
    }

    function isLastMessageOfGroup(item, i)
    {
        return (i === chatArray[0].chat.length - 1 || (chatArray[0].chat[i + 1] && chatArray[0].chat[i + 1].from !== 'agentId'));
    }

    function onInputChange(ev)
    {
        setMessageText(ev.target.value);
    }

    function onMessageSubmit(ev)
    {
        ev.preventDefault();
        if ( messageText === '' )
        {
            return;
        }

        // dispatch(Actions.sendMessage(messageText, chat.id, user.id))
        //     .then(() => {
        //         setMessageText('');
        //     });
    }

    return (
        <div className={clsx("flex flex-col relative", props.className)}>
            <FuseScrollbars
                ref={chatRef}
                className="flex flex-1 flex-col overflow-y-auto"
            >
                {chatArray[0].chat && chatArray[0].chat.length > 0 ?
                    (
                        <div className="flex flex-col pt-16 pl-56 pr-16 pb-40">
                            {chatArray[0].chat.map((item, i)=> {
                                //const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
                                return (
                                    <div
                                                                             key={item.time}
                                                                             className={clsx(
                                                                                 classes.messageRow,
                                                                                 "flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative pr-16 pb-4 pl-16",
                                                                                 {'me': item.from === 'agentId'},
                                                                                 {'contact': item.from !== 'agentId'},
                                                                                 {'first-of-group': isFirstMessageOfGroup(item, i)},
                                                                                 {'last-of-group': isLastMessageOfGroup(item, i)},
                                                                                 (i + 1) === chatArray[0].chat.length && "pb-96"
                                                                             )}
                                                                         >
                                                                          {shouldShowContactAvatar(item, i) && (
                                                                                 <Avatar className="avatar absolute left-0 m-0 -ml-32">{item.name.charAt(0)+""+item.name.charAt(1)}</Avatar>
                                                                             )}
                                                                             <div className="bubble flex relative items-center justify-center p-12 max-w-full">
                                                                                 <div className="leading-tight whitespace-pre-wrap">{item.payload}</div>
                                                                                 <Typography className="time absolute  w-full text-11 mt-8 -mb-24 left-0 bottom-0 whitespace-no-wrap"
                                                                                             color="textSecondary">{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                                                             </div>
                                                                         </div>
                                                                     )
                                                                 })}
                                                             </div>
                    ) : (
                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col flex-1 items-center justify-center">
                                <Icon className="text-128" color="disabled">chat</Icon>
                            </div>
                            <Typography className="px-16 pb-24 text-center" color="textSecondary">
                                Start a conversation by typing your message below.
                            </Typography>
                        </div>
                    )
                }

            </FuseScrollbars>
            {chat && (
                <form onSubmit={onMessageSubmit} className="absolute bottom-0 right-0 left-0 py-16 px-8">
                    <Paper className="flex items-center relative rounded-24" elevation={1}>
                        <TextField
                            autoFocus={false}
                            id="message-input"
                            className="flex-1"
                            InputProps={{
                                disableUnderline: true,
                                classes         : {
                                    root : "flex flex-grow flex-shrink-0 ml-16 mr-48 my-8",
                                    input: ""
                                },
                                placeholder     : "Type your message"
                            }}
                            InputLabelProps={{
                                shrink   : false,
                                className: classes.bootstrapFormLabel
                            }}
                            onChange={onInputChange}
                            value={messageText}
                        />
                        <IconButton className="absolute right-0 top-0" type="submit">
                            <Icon className="text-24" color="action">send</Icon>
                        </IconButton>
                    </Paper>
                </form>
            )}
        </div>
    );
}





