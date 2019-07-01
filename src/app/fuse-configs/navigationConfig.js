const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'      : 'dashboards',
                'title'   : 'Dashboards',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'url'  : '/apps/dashboard',
                'children': [
                    {
                        'id'   : 'onehr-summary',
                        'title': '1 Hr Summ View',
                        'type' : 'item',
                        'icon' : 'show_chart',
                        'url'  : '/apps/one-hr-summ'
                    },
                    {
                        'id'   : 'settings',
                        'title': 'Settings',
                        'type' : 'item',
                        'icon' : 'settings',
                        'url'  : '/apps/settings'
                    }
                ]
            },
            {
                'id'   : 'calendar',
                'title': 'Calendar',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/apps/calendar'
            },
            {
                'id'   : 'mail',
                'title': 'Mail',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/apps/mail',
                'badge': {
                    'title': 25,
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'   : 'todo',
                'title': 'To-Do',
                'type' : 'item',
                'icon' : 'check_box',
                'url'  : '/apps/todo',
                'badge': {
                    'title': 3,
                    'bg'   : 'rgb(255, 111, 0)',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'   : 'contacts',
                'title': 'Contacts',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/apps/contacts/all'
            },
            {
                'id'   : 'chat',
                'title': 'Chat',
                'type' : 'item',
                'icon' : 'chat',
                'url'  : '/apps/chat',
                'badge': {
                    'title': 13,
                    'bg'   : 'rgb(9, 210, 97)',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'   : 'notes',
                'title': 'Notes',
                'type' : 'item',
                'icon' : 'note',
                'url'  : '/apps/notes'
            }
        ]
    }
];

export default navigationConfig;
