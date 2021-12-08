import { useState, useEffect } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import AuthenticationService from '../services/AuthenticationService.js'

export default function ChartBar2() {
	
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

	let dataPie = {
    labels: ["P1", "P2", "P3","P4", "P5", "P6", "P7"],
    datasets: [
      {
          label: "My First Dataset",
          data: list2021,
		  size: "w-30",
          backgroundColor: [
          	"rgb(133, 105, 241)",
          	"rgb(164, 101, 241)",
          	"rgb(101, 143, 241)",
			"rgb(255, 255, 0)",
			"rgb(0, 0, 255)",
			"rgb(0, 255, 0)",
			"rgb(255, 0, 0)"
            ],
        	hoverOffset: 0,
          },
         ],
	    };

  		let configPie = {
    	  type: "pie",
    	  data: dataPie,
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
                },
            },
		};

        let ctx = document.getElementById('bar-chart-promotion').getContext('2d');
        window.myBar = new Chart(ctx, configPie);

    }, [loading2020, loading2021]);

    return (
        <Card>
            <CardHeader color="green" contentPosition="left">
                <h2 className="text-white text-2xl">Active Promotions</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas id="bar-chart-promotion"></canvas>
                </div>
            </CardBody>
        </Card>
    );
}
