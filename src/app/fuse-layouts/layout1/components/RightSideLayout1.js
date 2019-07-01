import React from 'react';
import QuickPanel from 'app/fuse-layouts/shared-components/quickPanel/QuickPanel';
import ChatPanel from 'app/fuse-layouts/shared-components/chatPanel/ChatPanel';

function RightSideLayout1(props)
{
    return (
        <React.Fragment>
            <ChatPanel/>
            <QuickPanel/>
        </React.Fragment>
    );
}

export default RightSideLayout1;
