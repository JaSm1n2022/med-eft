
module.exports.statusList = [
    'Create Order',
    'Picked Up',
    'Delivered'

]
module.exports.advancedFilter = [
    {
        col: 'Shipment Number',
        alias : 'shipmentNbr',
        filter: [
            { operation: 'equal', dataType: 'string' },
            { operation: 'startWith', dataType: 'string' },
            { operation: 'endWith', dataType: 'string' },
            { operation: 'like', dataType: 'string' }
        ]
    },

    {
        col: 'Shipment Latest Status',
        alias: 'latestStatus',
        filter:
            [
                { operation: 'equal', dataType: 'list',
                default: 
                    [
                        'Approaching Delivery', 
                        'Arrived at pickup',
                        'Arriving Delivery', 
                        'Arriving Pickup',
                        'Assigned Carrier',
                        'Assigned Driver',
                        'CONSIGNEE Delivery Request Updated',
                        'Create Order',
                        'Delivered',
                        'Departing Delivery', 
                        'Departing Pickup', 
                        'Edit Order',
                        'Empty Return Completed',
                        'In Transit',
                        'Left Delivery',
                        'Loading Completed',
                        'Picked Up',
                        'Pre-pull to yard - Await Dispatch',
                        'Ready for return',
                        'Received',
                        'Return Order',
                        'Start Loading',
                        'Tender Accepted'
                        
                ]},
                { operation: 'in', dataType: 'list multi',default : 
                    [
                        {
                        name:'Approaching Delivery',
                        isChecked:undefined
                        },
                        {
                            name: 'Arrived at pickup',
                            isChecked : undefined
                        },
                        {
                            name: 'Arriving Delivery',
                            isChecked : undefined
                        },
                        {
                            name: 'Arriving Pickup',
                            isChecked : undefined
                        },
                        {
                            name: 'Assigned Carrier',
                            isChecked : undefined
                        },
                        {
                            name: 'Assigned Driver',
                            isChecked : undefined
                        },
                        {
                            name: 'CONSIGNEE Delivery Request Updated',
                            isChecked : undefined
                        },
                        {
                            name: 'Create Order',
                            isChecked : undefined
                        },
                        {
                            name: 'Edit Order',
                            isChecked : undefined
                        },
                        {
                            name: 'Delivered',
                            isChecked : undefined
                        },
                        {
                            name: 'Departing Delivery',
                            isChecked : undefined
                        },
                        {
                            name: 'Departing Pickup',
                            isChecked : undefined
                        },
                        {
                            name: 'Empty Return Completed',
                            isChecked : undefined
                        },
                        {
                            name: 'In Transit',
                            isChecked : undefined
                        },
                        {
                            name: 'Left Delivery',
                            isChecked : undefined
                        },
                        {
                            name: 'Loading Completed',
                            isChecked : undefined
                        },
                        {
                            name: 'Picked Up',
                            isChecked : undefined
                        },
                        {
                            name: 'Pre-pull to yard - Await Dispatch',
                            isChecked : undefined
                        },
                        {
                            name: 'Ready for return',
                            isChecked : undefined
                        },
                        {
                            name: 'Received',
                            isChecked : undefined
                        },
                        {
                            name: 'Return Order',
                            isChecked : undefined
                        },
                        {
                            name: 'Start Loading',
                            isChecked : undefined
                        },
                        {
                            name: 'Tender Accepted',
                            isChecked : undefined
                        }
                                                
                ]},
                    
                { operation: 'not in', dataType: 'list multi', 
                
                
                default : [
                    {
                    name:'Approaching Delivery',
                    isChecked:undefined
                    },
                    {
                        name: 'Arrived at pickup',
                        isChecked : undefined
                    },
                    {
                        name: 'Arriving Delivery',
                        isChecked : undefined
                    },
                    {
                        name: 'Arriving Pickup',
                        isChecked : undefined
                    },
                    {
                        name: 'Assigned Carrier',
                        isChecked : undefined
                    },
                    {
                        name: 'Assigned Driver',
                        isChecked : undefined
                    },
                    {
                        name: 'CONSIGNEE Delivery Request Updated',
                        isChecked : undefined
                    },
                    {
                        name: 'Create Order',
                        isChecked : undefined
                    },
                    {
                        name: 'Edit Order',
                        isChecked : undefined
                    },
                    {
                        name: 'Delivered',
                        isChecked : undefined
                    },
                    {
                        name: 'Departing Delivery',
                        isChecked : undefined
                    },
                    {
                        name: 'Departing Pickup',
                        isChecked : undefined
                    },
                    {
                        name: 'Empty Return Completed',
                        isChecked : undefined
                    },
                    {
                        name: 'In Transit',
                        isChecked : undefined
                    },
                    {
                        name: 'Left Delivery',
                        isChecked : undefined
                    },
                    {
                        name: 'Loading Completed',
                        isChecked : undefined
                    },
                    {
                        name: 'Picked Up',
                        isChecked : undefined
                    },
                    {
                        name: 'Pre-pull to yard - Await Dispatch',
                        isChecked : undefined
                    },
                    {
                        name: 'Ready for return',
                        isChecked : undefined
                    },
                    {
                        name: 'Received',
                        isChecked : undefined
                    },
                    {
                        name: 'Return Order',
                        isChecked : undefined
                    },
                    {
                        name: 'Start Loading',
                        isChecked : undefined
                    },
                    {
                        name: 'Tender Accepted',
                        isChecked : undefined
                    }
                                            
            ] }
            ]
    },

    {
        col: 'Shipment Status',
        alias: 'status',
        filter:
            [
          
                { operation: 'has been', dataType: 'list multi',default : 
                    [{name:'Delivered',isChecked:undefined},{name:'Picked Up',isChecked:undefined}] },
                { operation: 'has not been', dataType: 'list multi', default : 
                    [{isChecked:undefined,name:'Delivered'},{isChecked:undefined,name:'Picked Up'}] }
            ]
    },
    {
        col: 'Equipment',
        alias : 'equipmentNbr',
        filter: [
            { operation: 'equal', dataType: 'string' },
            { operation: 'startWith', dataType: 'string' },
            { operation: 'endWith', dataType: 'string' },
            { operation: 'like', dataType: 'string' }
        ]
    },
    {
        col: 'Actual Picked Up',
        alias: 'actualPickupDt',
        filter:
            [
                { operation: 'is', dataType: 'list', default: ['not done', 'done'] },
                { operation: 'today', dataType: 'date' },
                { operation: 'yesterday', dataType: 'date' },
                { operation: 'This week', dataType: 'dates' },
                { operation: 'This month', dataType: 'dates' },
                { operation: 'Next 7 days', dataType: 'dates' },
                { operation: 'Next 30 days', dataType: 'dates' },
                { operation: 'Next 90 days', dataType: 'dates' },
               
                { operation: 'Last 7 days', dataType: 'dates' },
                { operation: 'Last 30 days', dataType: 'dates' },
                { operation: 'Last 90 days', dataType: 'dates' },
               
                // { operation: 'greater than', dataType: 'calendar' },
              //  { operation: 'less than', dataType: 'calendar' },
              //  { operation: 'between', dataType: 'date range' }
    
            ]
    },
    {
        col: 'Transport Mode',
        alias: 'transportMode',
        filter: [
            { operation: 'is', dataType: 'list', default: ['All', 'Inbound/Full', 'Return/Empty'] }
        ]
        // rodel has the column
    },
    {
        col: 'Actual Delivery',
        alias: 'actualDelvDt',
        filter: [
            { operation: 'is', dataType: 'list', default: ['not done', 'done'] },
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'This week', dataType: 'dates' },
            { operation: 'This month', dataType: 'dates' },
            { operation: 'Next 7 days', dataType: 'dates' },
            { operation: 'Next 30 days', dataType: 'dates' },
            { operation: 'Next 90 days', dataType: 'dates' },
           
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' }
        ]
        // rodel has the column
    },
    {
        col: 'Created',
        alias: 'created',
        filter: [
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' }
        ]
        // rodel has the column
    },
  
    {
        col: 'Has been available (days)',
        alias: 'available',
        filter: [
            { operation: 'is', dataType: 'list', default: ['unknown', 'known'] },
            //fcAvailable date {exists : false}
            { operation: 'less than', dataType: 'list',default : [0,1,5,10,15,20,25,30] },
            { operation: 'greater than', dataType: 'list',default : [0,1,5,10,15,20,25,30] },
            // Today - fcAvailable dt 

            // 
        ]
    },

    {
        col: 'Port ETA',
        alias: 'oceanEta',
        filter: [
            { operation: 'is', dataType: 'list', default: ['unknown', 'known'] },
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'This week', dataType: 'dates' },
            { operation: 'This month', dataType: 'dates' },
            { operation: 'Next 7 days', dataType: 'dates' },
            { operation: 'Next 30 days', dataType: 'dates' },
            { operation: 'Next 90 days', dataType: 'dates' },
           
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' },
           
       
            // 
            // oscar has the column

            // 
        ]
    },
    {
        col: 'Rail ATA',
        alias: 'railAta',
        filter: [
            { operation: 'is', dataType: 'list', default: ['not done', 'done'] },
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'This week', dataType: 'dates' },
            { operation: 'This month', dataType: 'dates' },
            { operation: 'Next 7 days', dataType: 'dates' },
            { operation: 'Next 30 days', dataType: 'dates' },
            { operation: 'Next 90 days', dataType: 'dates' },
           
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' },
           
       
            // oscar has the column

            // 
        ]
    },
    {
        col: 'Rail Available Date',
        alias: 'railAvailDt',
        filter: [
            { operation: 'is', dataType: 'list', default: ['known', 'unknown'] },
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'This week', dataType: 'dates' },
            { operation: 'This month', dataType: 'dates' },
            { operation: 'Next 7 days', dataType: 'dates' },
            { operation: 'Next 30 days', dataType: 'dates' },
            { operation: 'Next 90 days', dataType: 'dates' },
           
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' },
           
       
            // oscar has the column

            // 
        ]
    },
   
    {
        col: 'Port ATA',
        alias: 'oceanAta',
        filter: [
            { operation: 'is', dataType: 'list', default: ['not done', 'done'] },
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'This week', dataType: 'dates' },
            { operation: 'This month', dataType: 'dates' },
            { operation: 'Next 7 days', dataType: 'dates' },
            { operation: 'Next 30 days', dataType: 'dates' },
            { operation: 'Next 90 days', dataType: 'dates' },
           
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' },
           
       
            // 
            // oscar has the column

            // 
        ]
    },
    {
        col: 'Port Available Date',
        alias: 'oceanAvailDt',
        filter: [
            { operation: 'is', dataType: 'list', default: ['known', 'unknown'] },
            { operation: 'today', dataType: 'date' },
            { operation: 'yesterday', dataType: 'date' },
            { operation: 'This week', dataType: 'dates' },
            { operation: 'This month', dataType: 'dates' },
            { operation: 'Next 7 days', dataType: 'dates' },
            { operation: 'Next 30 days', dataType: 'dates' },
            { operation: 'Next 90 days', dataType: 'dates' },
           
            { operation: 'Last 7 days', dataType: 'dates' },
            { operation: 'Last 30 days', dataType: 'dates' },
            { operation: 'Last 90 days', dataType: 'dates' },
           
       
            // 
            // oscar has the column

            // 
        ]
    },
    {
        col: 'Port Release PIN',
        alias: 'portRlsPin',
        filter: [
            { operation: 'is', dataType: 'list', default: ['known', 'unknown'] },
        ]
        // rodel has the column
    },


    {
        col: 'Assigned Driver',
        alias: 'assignedDriver',
        filter: [
            { operation: 'is', dataType: 'list', default: ['known', 'unknown'] },
        ]
        // rodel has the column
    },

    {
        col: 'Missed Delivery Date',
        alias: 'missedDelvDt',
        filter: [
            { operation: 'is', dataType: 'list', default: ['true', 'false'] },
        ]
        // rodel has the column
    },




    {
        col: 'Detention Remaining Days',
        alias: 'detentionRemDays',
        filter: [
            { operation: 'is', dataType: 'list', default: ['expired'] },
            //fcAvailable date {exists : false}
            { operation: 'less than', dataType: 'list',default : [0,1,5,10,15,20,25,30] },
            { operation: 'greater than', dataType: 'list',default : [0,1,5,10,15,20,25,30] },
       
            //
        ]
    },
    {
        col: 'Pending Tender (hrs)',
        alias: 'pendingTender',
        filter:
            [
                { operation: 'greater than', dataType: 'int' },
                { operation: 'less than', dataType: 'int' }
            ]
    },
    {
        col: 'Requested Delivery Date',
        alias: 'rqstDelvDt',
        filter:
            [
                { operation: 'today', dataType: 'date' },
                { operation: 'yesterday', dataType: 'date' },
                { operation: 'This week', dataType: 'dates' },
                { operation: 'This month', dataType: 'dates' },
                { operation: 'Next 7 days', dataType: 'dates' },
                { operation: 'Next 30 days', dataType: 'dates' },
                { operation: 'Next 90 days', dataType: 'dates' },
               
                { operation: 'Last 7 days', dataType: 'dates' },
                { operation: 'Last 30 days', dataType: 'dates' },
                { operation: 'Last 90 days', dataType: 'dates' },
               
           


            ]
    }
];