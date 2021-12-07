import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import CustomerService from '../services/CustomerService.js'
import PromotionService from '../services/PromotionService.js'
import PromotionEmailService from '../services/PromotionEmailService.js'
import ProfileService from '../services/ProfileService.js'
import StatusCard from 'components/StatusCard';

import Input from "@material-tailwind/react/Input";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import moment from 'moment'

class RegisterCustomer extends Component {

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
			customerSize: 0,
            promotionSize: 0,
			profileSize: 0,
			emailSize: 0,
        }

		this.handleSubmit = this.handleSubmit.bind(this);
    }

    refreshCustomers() {
       
 		let username = AuthenticationService.getLoggedInUserName()
        
		CustomerService.retrieveAllCustomers(username)
            .then(
                response => {
                    this.setState({ customers: response.data })
					this.setState({ customerSize: this.state.customers.length })
                }
            )

		PromotionService.retrieveAllPromotions(username)
            			.then(
                			response => {
                   				this.setState({ promotionSize: response.data.length })
                		}
            		)

		ProfileService.retrieveAllProfiles(username)
            					.then(
                				response => {
                    				this.setState({ profileSize: response.data.length })

                				}
           					  );

		PromotionEmailService.retrieveAllPromotionEmailss(username)
            .then(
                response => {
                    this.setState({ emailSize: response.data.length})
                }
            )

    }


    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        this.refreshCustomers();
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
                            amount={this.state.customerSize}
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="Total Profiles"
                            amount={this.state.profileSize}
                            percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Total Promotions"
                            amount={this.state.promotionSize}
                            percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Email Sent"
                            amount={this.state.emailSize}
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

							<Card>
					            <CardHeader color="purple" contentPosition="none">
					                <div className="w-full flex items-center justify-between">
					                    <h2 className="text-white text-2xl">New Customer</h2>
					                    <Button
					                        color="transparent"
					                        buttonType="link"
					                        size="lg"
					                        style={{ padding: 0 }}
					                    >
					                        
					                    </Button>
					                </div>
					            </CardHeader>
					            <CardBody>
									
									<form onSubmit={this.handleSubmit}>
					                    
										<h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
					                        User Information
					                    </h6>
					                    <div className="flex flex-wrap mt-10">
					                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="Account ID"
													name="bankAccountId"
					                            />
					                        </div>
					                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
					                            <Input
					                                type="email"
					                                color="purple"
					                                placeholder="Email Address"
													name="emailAddress"
					                            />
					                        </div>
					                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="First Name"
													name="firstName"
					                            />
					                        </div>
					                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="Last Name"
													name="lastName"
					                            />
					                        </div>
					                    </div>
					
					                    <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
					                        Contact Information
					                    </h6>
					                    <div className="flex flex-wrap mt-10">
					                        <div className="w-full lg:w-12/12 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="Address"
													name="addresssLine"
					                            />
					                        </div>
					                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="City"
													name="city"
					                            />
					                        </div>
											<div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="State"
													name="state"
					                            />
					                        </div>
					                        <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="Postal Code"
													name="zipCode"
					                            />
					                        </div>
					                        <div className="w-full lg:w-12/12 mb-10 font-light">
					                            <Input
					                                type="text"
					                                color="purple"
					                                placeholder="Country"
													name="country"
					                            />
					                        </div>


					                    </div>
					
					                    <div className="flex flex-wrap mt-10 font-light">
					                        <Button
					                        color="purple"
					            			buttonType="outline"
					            			size="lg"
					            			rounded={false}
					            			block={false}
					            			iconOnly={false}
					            			ripple="dark"
											type="submit"
											>
					                        Register
					                    	</Button>
					
					                    </div>
					                </form>

									<div className={this.state.registeredSuccessfull === true ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto flex justify-center' : 'text-white'}>
                        				<p class={this.state.registeredSuccessfull === true ? 'text-purple-500 text-sm my-6 font-bold uppercase ...' : 'text-white'}> Customer Registered Successfully!!!</p>	
                    				</div>

					            </CardBody>
					        </Card>

                        </div>
                    </div>
                </div>
            </div>
        </>

        )
    }
}

export default RegisterCustomer