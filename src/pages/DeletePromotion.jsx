import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import PromotionService from '../services/PromotionService.js'
import StatusCard from 'components/StatusCard';

import Input from "@material-tailwind/react/Input";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import moment from 'moment';

class DeletePromotion extends Component {

    constructor(props) {     
        super(props)
        this.state = {
            promotions: [],
            message: null,
            customerSize: 0,
            promotionSize: 0
        }
    }

    componentDidMount() {
	
	    var authResult = new URLSearchParams(window.location.search);
        let username = AuthenticationService.getLoggedInUserName()
		var index = authResult.toString().indexOf('=');
		var result = authResult.toString().substring(index + 1, authResult.toString().length);

		console.log('result=' + result)
		PromotionService.deletePromotion(username, result);
		
		PromotionService.retrieveAllPromotions(username)
            .then(
                response => {
                    this.setState({ promotions: response.data })
					this.setState({ customerSize: this.state.promotions.length })
                }
            )
	
	    this.props.history.push('/list-promotions');
    }

    render() {
        
		return (
        <>
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="Total Customers"
                            amount="350,897"
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="New Customers"
                            amount="2,356"
                            percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Sales"
                            amount="924"
                            percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Performance"
                            amount="49,65%"
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                        <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">              

                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default DeletePromotion