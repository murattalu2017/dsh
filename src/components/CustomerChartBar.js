import { useState, useEffect } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import AuthenticationService from '../services/AuthenticationService.js'

export default function ChartBar() {
    
	const [list2020, setList2020] = useState([]);
	const [list2021, setList2021] = useState([]);
	const [loading2020, setLoading2020] = useState(true); 
	const [loading2021, setLoading2021] = useState(true); 

	const loadData2020 = async () => {
				
				const headers = { authorization: AuthenticationService.getJWTToken() }
    			
				const res = await fetch("http://localhost:5000/cbap-application/users/cbap/year/2020/customers-by-date", { headers });
   	 			setList2020(await res.json());

				setLoading2020(false);
    };

	const loadData2021 = async () => {
				
				const headers = { authorization: AuthenticationService.getJWTToken() }
    			
				const res = await fetch("http://localhost:5000/cbap-application/users/cbap/year/2021/customers-by-date", { headers });
   	 			setList2021(await res.json());

				setLoading2021(false);
    };

		useEffect(() => {
			
		loadData2020();
		loadData2021();
			
        let config = {
            type: 'bar',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: '#03a9f4',
                        borderColor: '#03a9f4',
                        data: list2021,
                        fill: false,
                        barThickness: 8,
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: '#f44336',
                        borderColor: '#f44336',
                        data: list2020,
                        barThickness: 8,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: 'Orders Chart',
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                },
                legend: {
                    labels: {
                        fontColor: 'rgba(17,17,17,.7)',
                    },
                    align: 'end',
                    position: 'bottom',
                },
                scales: {
                    xAxes: [
                        {
                            display: false,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month',
                            },
                            gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: 'rgba(33, 37, 41, 0.3)',
                                zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Value',
                            },
                            gridLines: {
                                borderDash: [2],
                                drawBorder: false,
                                borderDashOffset: [2],
                                color: 'rgba(33, 37, 41, 0.2)',
                                zeroLineColor: 'rgba(33, 37, 41, 0.15)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        let ctx = document.getElementById('bar-chart-customer').getContext('2d');
        window.myBar = new Chart(ctx, config);

    }, [loading2020, loading2021]);

    return (
        <Card>
            <CardHeader color="pink" contentPosition="left">
                <h2 className="text-white text-2xl">Customers</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas id="bar-chart-customer"></canvas>
                </div>
            </CardBody>
        </Card>
    );
}
