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

class GenerateProfile extends Component {

    constructor(props) {
        
        super(props)

        this.state = {
	        id: '',
            username: '',
            bankAccountId: '',
			emailAddress: '',
			generatedSuccessfully: false,
			customerSize: 0,
            promotionSize: 0,
			profileSize: 0,
			emailSize: 0
        }

		this.handleSubmit = this.handleSubmit.bind(this);
    }

   componentDidMount() {
        console.log('componentDidMount')
        this.refreshCustomers();
        console.log(this.state)
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
									this.setState({ profiles: response.data })
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

    handleSubmit(event) {
	
	    event.preventDefault();
        let username = AuthenticationService.getLoggedInUserName()
        const form = event.target;
    	const data = new FormData(form);

		let customer = {
            bankAccountId: data.get('bankAccountId'),
			emailAddress: data.get('emailAddress')
        }

        ProfileService.generateProfile(username, customer)
			.then(() => this.setState({ generatedSuccessfully: true }))

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
					                    <h2 className="text-white text-2xl">Generate Profile</h2>
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
					                        Customer Information
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
					                        Generate
					                    	</Button>
					
					                    </div>
					                </form>

								<div className={this.state.generatedSuccessfully === true ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto flex justify-center' : 'text-white'}>
            						<p class={this.state.generatedSuccessfully === true ? 'text-green-500 text-sm my-6 font-bold uppercase ...' : 'text-white'}> Profile Generated Successfully !!!</p>	
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

export default GenerateProfile