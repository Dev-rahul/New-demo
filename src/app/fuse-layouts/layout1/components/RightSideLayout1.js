import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QuickPanel from 'app/fuse-layouts/shared-components/quickPanel/QuickPanel';
import ChatPanel from 'app/fuse-layouts/shared-components/chatPanel/ChatPanel';

function RightSideLayout1(props)
{
    const chatpanel = useSelector(({fuse}) => fuse.settings.current.layout.config.chatpanel);
    console.log(chatpanel)
    return (
        <React.Fragment>
            {chatpanel? <ChatPanel/>: null}
            
            <QuickPanel/>
        </React.Fragment>
    );
}

export default RightSideLayout1;

