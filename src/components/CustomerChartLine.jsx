import { useState, useEffect } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import AuthenticationService from '../services/AuthenticationService.js'

export default function ChartLine() {

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

        var config = {
            type: 'line',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'July',
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
                        fill: false
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: '#ff9800',
                        borderColor: '#ff9800',
                        data: list2020,
						fill: false
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: 'Sales Charts',
                    fontColor: 'white',
                },
                legend: {
                    labels: {
                        fontColor: 'black',
                    },
                    align: 'end',
                    position: 'bottom',
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: 'rgba(17,17,17,.7)',
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month',
                                fontColor: 'white',
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: 'rgba(33, 37, 41, 0.3)',
                                zeroLineColor: 'rgba(0, 0, 0, 0)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: 'rgba(17,17,17,.7)',
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Value',
                                fontColor: 'white',
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: 'rgba(17, 17, 17, 0.15)',
                                zeroLineColor: 'rgba(33, 37, 41, 0)',
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };

        var ctx = document.getElementById('line-chart-customer').getContext('2d');
        window.myLine = new Chart(ctx, config);
		

    }, [loading2020, loading2021]);

	//if (loading) return <p>Loading...</p>
 
    return (
        <Card>
            <CardHeader color="orange" contentPosition="left">
                <h2 className="text-white text-2xl">Customers</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas id="line-chart-customer"></canvas>

                </div>
            </CardBody>
        </Card>
    );


}
