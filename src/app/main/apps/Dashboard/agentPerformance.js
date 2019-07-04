import React from 'react';
import { Card, Icon, Typography } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';
import { width } from '@material-ui/system';

function Widget3() {
    const theme = useTheme();
    const widget3 = {
        impressions: {
            value: '6 / hr',
            ofTarget: 12
        },
        chartType: 'line',
        datasets: [
            {
                label: 'Performance',
                data: [0, 7, 1, 10, 4, 0, 10, 7, 8, 2, 14, 6, 11, 9, 0],
                fill: false
            }
        ],
        labels: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        options: {
            spanGaps: false,
            legend: {
                display: false
            },
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 2,
                    borderWidth: 1,
                    hoverRadius: 2,
                    hoverBorderWidth: 1
                },
                line: {
                    tension: 0
                }
            },
            layout: {
                padding: {
                    top: 5,
                    left: 5,
                    right: 5,
                    bottom: 5
                },
                
            },
            scales: {
                xAxes: [
                    {
                        display: false
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            // min: 100,
                            // max: 500
                        }
                    }
                ]
            }
        }
    }

    return (
        <Card style={{ width: '100%', height: "100%"}} className="rounded-8 shadow-none border-1">

            <div className="p-16 pb-0 flex flex-row items-end flex-wrap">

                <div className="pr-16">
                    <Typography className="h6" color="textSecondary">Average Calls per Hour</Typography>
                    <Typography className="text-12 font-300 leading-none mt-8">
                        {widget3.impressions.value}
                    </Typography>
                </div>

                <div className="py-2 text-16 flex flex-row items-center">
                    <div className="flex flex-row items-center">
                        {widget3.impressions.ofTarget > 0 && (
                            <Icon className="text-green mr-4">trending_up</Icon>
                        )}
                        {widget3.impressions.ofTarget < 0 && (
                            <Icon className="text-red mr-4">trending_down</Icon>
                        )}
                        <Typography>{widget3.impressions.ofTarget}%</Typography>
                    </div>
                    <Typography className="ml-4 whitespace-no-wrap">of target</Typography>
                </div>
                <div  style={{width: "100%"}} >
                    <Line  height={50}
                        data={{
                            labels: widget3.labels,
                            datasets: widget3.datasets.map(obj => ({
                                ...obj,
                                borderColor: theme.palette.secondary.main
                            }))
                        }}
                        options={widget3.options}
                    />
                </div>

            </div>


        </Card>
    );
}

export default Widget3;