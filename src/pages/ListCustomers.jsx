import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import CustomerService from '../services/CustomerService.js'
import PromotionService from '../services/PromotionService.js'
import PromotionEmailService from '../services/PromotionEmailService.js'
import ProfileService from '../services/ProfileService.js'
import StatusCard from 'components/StatusCard';

import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Progress from '@material-tailwind/react/Progress';

import { NavLink } from 'react-router-dom';

class ListCustomers extends Component {
	
	constructor(props) {     
        super(props)
        this.state = {
            customers: [],
            message: null,
            customerSize: 0,
            promotionSize: 0,
			profileSize: 0,
			emailSize: 0
        }
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
				                <h2 className="text-white text-2xl">Customer List</h2>
				            </CardHeader>
				            <CardBody>
				                <div className="overflow-x-auto">
				                    <table className="items-center w-full bg-transparent border-collapse">
				                        

										<thead>
				                            <tr>

												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
				                                    Account ID
				                                </th>
				                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
				                                    Customer Name
				                                </th>
				                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
				                                    Email Address
				                                </th>
				                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
				                                    Registere Date
				                                </th>
				                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
				                                    Action
				                                </th>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
				                                    Profile Status
				                                </th>

				                            </tr>
				                        </thead>
				                        <tbody>

											{
                                			this.state.customers.map(
                                    				cust =>

												<tr>

												<th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
				                                    {cust.bankAccountId}
				                                </th>
				                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
				                                    {cust.firstName + " " + cust.lastName}
				                                </th>
				                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
				                                    {cust.emailAddress}
				                                </th>
				                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
				                                    {cust.registerDate}
				                                </th>

												<th className="border-b border-purple-200 align-right font-light text-sm whitespace-nowrap px-1 py-4 text-right">
				                                    
												<NavLink exact 
				                                    to={`update-customer?id=${cust.id}`}
				                                    className="flex items-center gap-4 text-medium text-purple-700 font-light px-1 py-3 rounded-lg"
				                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
				                                    >
				                                    Update
				                                </NavLink>

												<NavLink
				                                    to={`delete-customer?id=${cust.id}`}
				                                    className="flex items-center gap-4 text-medium text-purple-700 font-light px-1 py-3 rounded-lg"
				                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
				                                    >
				                                    Delete
				                                </NavLink>
				                                </th>

												{(cust.hasProfile === 'false' || cust.hasProfile == null) &&
												<th className="border-b border-gray-200 align-left font-light text-sm whitespace-nowrap px-1 py-4 text-left">
				                                    <Progress color="red" value="100" />
				                                </th>
												}

												{cust.hasProfile === 'true' &&
												<th className="border-b border-gray-200 align-left font-light text-sm whitespace-nowrap px-1 py-4 text-left">
				                                    <Progress color="green" value="100" />
				                                </th>
												}
				
				                            </tr>

                                 			  )
                            			  }
 
				                        </tbody>
				                    </table>
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

export default ListCustomers