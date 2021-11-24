import { useEffect } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';

export default function ChartBar2() {
    useEffect(() => {        

	let dataPie = {
    labels: ["JavaScript", "Python", "Ruby","JavaScript", "Python", "Ruby", "Ruby"],
    datasets: [
      {
          label: "My First Dataset",
          data: [100, 50, 100, 60, 50, 30, 40],
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
    }, []);
    return (
        <Card>
            <CardHeader color="green" contentPosition="left">
                <h2 className="text-white text-2xl">Promotions</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas id="bar-chart-promotion"></canvas>
                </div>
            </CardBody>
        </Card>
    );
}
