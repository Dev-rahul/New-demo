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
            },{
                'id'   : 'Completed Events',
                'title': 'COMPLETED EVENTS',
                'type' : 'collapse',
                'icon' : 'compare_arrows',
                'url'  : '/completedevents',
                'active': false,
                'children' : [{
                    'id'   : 'Completed Calls',
                    'title': 'Calls',
                    'type' : 'item',
                    'icon' : 'call',
                    'active': false,
                    'url'  : '/apps/completedcalls'
                },{
                    'id'   : 'Agent State Changes',
                    'title': 'Agent State Changes',
                    'type' : 'item',
                    'icon' : 'access_time',
                    'active': false,
                    'url'  : '/apps/agentstatechange'
                },
                {
                    'id'   : 'Recording Library',
                    'title': 'Recording Library',
                    'type' : 'item',
                    'icon' : 'headset',
                    'active': false,
                    'url'  : '/apps/recordinglibrary'
                },
                {
                    'id'   : 'Evaluations',
                    'title': 'Evaluations',
                    'type' : 'item',
                    'icon' : 'check',
                    'active': false,
                    'url'  : '/apps/evaluations'
                }]
            },
            {
                'id'   : 'REPORTS',
                'title': 'REPORTS',
                'type' : 'collapse',
                'icon' : 'bar_chart',
                'url'  : '/reports',
                'active': false,
                'children' : [{
                    'id'   : 'Inbound voice queues',
                    'title': 'Inbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_forward',
                    'active': false,
                    'url'  : '/apps/inboundvoicequeues'
                },{
                    'id'   : 'Outbound voice queues',
                    'title': 'Outbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_back',
                    'active': false,
                    'url'  : '/apps/outboundvoicequeues'
                },
                {
                    'id'   : 'Agent Performance',
                    'title': 'Agent Report',
                    'type' : 'item',
                    'icon' : 'account_circle',
                    'active': false,
                    'url'  : '/apps/agentperformance'
                },
                {
                    'id'   : 'Tenant usage',
                    'title': 'Usage',
                    'type' : 'item',
                    'icon' : 'signal_cellular_alt',
                    'active': false,
                    'url'  : '/apps/tenantusage'
                },
                {
                    'id'   : 'Reports Scheduled',
                    'title': 'Scheduled Reports',
                    'type' : 'item',
                    'icon' : 'calendar_today',
                    'active': false,
                    'url'  : '/apps/reportsshedule'
                }]
            },
            {
                'id'   : 'EXTENSIONS AND ROUTING',
                'title': 'EXTENSIONS AND ROUTING',
                'type' : 'collapse',
                'icon' : 'extension',
                'url'  : '/extensionsandroutes',
                'active': false,
                'children' : [{
                    'id'   : 'Extensions',
                    'title': 'Extensions',
                    'type' : 'item',
                    'icon' : 'accessibility_new',
                    'active': false,
                    'url'  : '/apps/extensions'
                },{
                    'id'   : 'Inbound voice queues',
                    'title': 'Inbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_right_alt',
                    'active': false,
                    'url'  : '/apps/voiceQueues'
                },
                {
                    'id'   : 'Menus',
                    'title': 'Menus',
                    'type' : 'item',
                    'icon' : 'menu',
                    'active': false,
                    'url'  : '/apps/menus'
                },
                {
                    'id'   : 'Conditional routes',
                    'title': 'Conditional routes',
                    'type' : 'item',
                    'icon' : 'swap_calls',
                    'active': false,
                    'url'  : '/apps/routes'
                },
                {
                    'id'   : 'Groups',
                    'title': 'Groups',
                    'type' : 'item',
                    'icon' : 'group',
                    'active': false,
                    'url'  : '/apps/groups'
                },
                {
                    'id'   : 'IVR Questons',
                    'title': 'IVR Questons',
                    'type' : 'item',
                    'icon' : 'question_answer',
                    'active': false,
                    'url'  : '/apps/ivr'
                }]
            },
            {
                'id'   : 'RESOURCES',
                'title': 'RESOURCES',
                'type' : 'collapse',
                'icon' : 'settings_applications',
                'url'  : '/resources',
                'active': false,
                'children' : [{
                    'id'   : 'Schedules & Holiday',
                    'title': 'Schedules & Holiday',
                    'type' : 'item',
                    'icon' : 'timer',
                    'active': false,
                    'url'  : '/apps/schedules'

                },{
                    'id'   : 'Audio Library',
                    'title': 'Audio Library',
                    'type' : 'item',
                    'icon' : 'mic',
                    'active': false,
                    'url'  : '/apps/audiolibrary'
                },
                {
                    'id'   : 'Evaluation Forms',
                    'title': 'Evaluation Forms',
                    'type' : 'item',
                    'icon' : 'format_align_center',
                    'active': false,
                    'url'  : '/apps/evalution'
                },
                {
                    'id'   : 'Recording Options',
                    'title': 'Recording Options',
                    'type' : 'item',
                    'icon' : 'speaker',
                    'active': false,
                    'url'  : '/apps/recording'
                }]
            },
            {
                'id'   : 'ADMIN',
                'title': 'ADMIN',
                'type' : 'collapse',
                'icon' : 'list_alt',
                'url'  : '/admin',
                'active': false,
                'children' : [{
                    'id'   : 'Users',
                    'title': 'Users',
                    'type' : 'item',
                    'icon' : 'supervisor_account',
                    'active': false,
                    'url'  : '/apps/users'
                },{
                    'id'   : 'Tenants',
                    'title': 'Tenants',
                    'type' : 'item',
                    'icon' : 'border_all',
                    'active': false,
                    'url'  : '/apps/tenants'
                },
                {
                    'id'   : 'DIDs',
                    'title': 'DIDs',
                    'type' : 'item',
                    'icon' : 'format_list_numbered',
                    'active': false,
                    'url'  : '/apps/dids'
                },
                {
                    'id'   : 'Telcos',
                    'title': 'Telcos',
                    'type' : 'item',
                    'icon' : 'perm_identity',
                    'active': false,
                    'url'  : '/apps/telcos'
                },
                {
                    'id'   : 'Roles',
                    'title': 'Roles',
                    'type' : 'item',
                    'icon' : 'wb_iridescent',
                    'active': false,
                    'url'  : '/apps/roles'
                },
                {
                    'id'   : 'System Config',
                    'title': 'System Config',
                    'type' : 'item',
                    'icon' : 'settings_brightness',
                    'active': false,
                    'url'  : '/apps/systemconfig'
                },
                {
                    'id'   : 'Silhouettes',
                    'title': 'Silhouettes',
                    'type' : 'item',
                    'icon' : 'list',
                    'active': false,
                    'url'  : '/apps/silhouttes'
                },
                {
                    'id'   : 'Gateways',
                    'title': 'PSTN Gateways',
                    'type' : 'item',
                    'icon' : 'flash_on',
                    'active': false,
                    'url'  : '/apps/gateway'
                }],
            },
            {
                'id'   : 'logout',
                'title': 'LOGOUT',
                'type' : 'item',
                'icon' : 'close',
                'url'  : '/apps/logout'
            }

           
        ]
    }
];






export default navigationConfig;
