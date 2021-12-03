import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import CustomerService from '../services/CustomerService.js'
import StatusCard from 'components/StatusCard';

import Input from "@material-tailwind/react/Input";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import moment from 'moment'
import {Redirect} from 'react-router-dom';

class DeleteCustomer extends Component {

    constructor(props) {
        
        super(props)

        this.state = {
	        id: '',
            username: '',
            bankAccountId: '',
			firstName: '',
			lastName: '',
			emailAddress: '',
			addresssLine: '',
			city: '',
			state: '',
			country: '',
			zipCode: '',
			registerDate: '',
			hasProfile: '',
			facebookId: '',
			twitterId: '',	
			instagramId: '',
			hasLoginFailed: false,
            showSuccessMessage: false,
			registeredSuccessfull: false,
        }

		this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
	
	    var authResult = new URLSearchParams(window.location.search);

        console.log('componentDidMount' + authResult)
	
		console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
	
        let username = AuthenticationService.getLoggedInUserName()
		
		var index = authResult.toString().indexOf('=');
		var result = authResult.toString().substring(index + 1, authResult.toString().length);
		
		console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTresult="+result)
		this.deleteCustomer(username, result);
		//CustomerService.deleteCustomer(username, id) 
	
	    this.props.history.push('/list-customers');
    }

    handleSubmit(event) {
	
	    event.preventDefault();
        let username = AuthenticationService.getLoggedInUserName()
        const form = event.target;
    	const data = new FormData(form);

		let customer = {
            username: data.get('username'),
            bankAccountId: data.get('bankAccountId'),
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			emailAddress: data.get('emailAddress'),
			addresssLine: data.get('addresssLine'),
			city: data.get('city'),
			state: data.get('state'),
			country: data.get('country'),
			zipCode: data.get('zipCode'),
			registerDate: data.get('registerDate'),
			hasProfile: data.get('hasProfile'),
			facebookId: data.get('facebookId'),
			twitterId: data.get('twitterId'),
			instagramId: data.get('instagramId')
        }

        if (this.state.id !== null && this.state.id !== '' && this.state.id > -1) {
            CustomerService.updateCustomer(username, this.state.id, customer)
			this.setState({ registeredSuccessfull: true })
                .then(() => this.props.history.push('/update-customer'))
        } else {   
			CustomerService.createCustomer(username, customer)
                .then(() => this.props.history.push('/register-customer'))
			event.target.reset();
			this.setState({ registeredSuccessfull: true })
        }

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

export default DeleteCustomer