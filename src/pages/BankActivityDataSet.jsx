import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import BankActivityService from '../services/BankActivityService.js'
import CustomerService from '../services/CustomerService.js'
import PromotionService from '../services/PromotionService.js'
import PromotionEmailService from '../services/PromotionEmailService.js'
import ProfileService from '../services/ProfileService.js'
import StatusCard from 'components/StatusCard';

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Progress from '@material-tailwind/react/Progress';

class BankActivityDataSet extends Component {
	
    constructor(props) {
        
        super(props)

        this.state = {
			barColor: 'white',
			progressDataSet1:false,
			progressDataSet2:false,
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
		let username = AuthenticationService.getLoggedInUserName();
		this.setState({ progressDataSet1: false });
		this.setState({ progressDataSet2: true });
		this.setState({ barColor : "red" });
        
		BankActivityService.processBankActivity(username, "Bank_Customer_Activities.csv")
            .then(
                response => {
					this.setState({ barColor: 'green' })
					this.setState({ progressDataSet1: true })
					this.setState({ progressDataSet2: false });
                }
            )
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
                    <div className="grid grid-cols-1 px-4 mb-16">
    
						<Card>
				            <CardHeader color="purple" contentPosition="left">
				                <h2 className="text-white text-2xl">Bank Activity Data Set</h2>
				            </CardHeader>
				            <CardBody>

								<div className="border-b border-gray-200 align-left font-light text-sm whitespace-nowrap px-1 py-4 text-left">
				                		<Progress color={this.state.barColor} value="100"/>
				                </div>

								<div className="overflow-x-auto">	

									<form onSubmit={this.handleSubmit}>

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
					                        Process Bank Activity DataSet
					                    	</Button>
					
					                    </div>
					                </form>
								</div>

								<div className={this.state.progressDataSet1 === true ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto flex justify-center' : 'text-white'}>
            						<p class={this.state.progressDataSet1 === true ? 'text-green-500 text-sm my-6 font-bold uppercase ...' : 'text-white'}> Bank Activity Records Successfully Processesd !!!</p>	
        						</div>

								<div className={this.state.progressDataSet2 === true ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto flex justify-center' : 'text-white'}>
            						<p class={this.state.progressDataSet2 === true ? 'text-red-500 text-sm my-6 font-bold uppercase ...' : 'text-white'}> Bank Activity Records Running ... </p>	
        						</div>
   
				            </CardBody>
				        </Card>

            						


                    </div>
                </div>
            </div>
 
         </>

        )
    }
}

export default BankActivityDataSet