import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import PromotionService from '../services/PromotionService.js'
import StatusCard from 'components/StatusCard';

import Input from "@material-tailwind/react/Input";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import moment from 'moment'
//import Radio from "@material-tailwind/react/Radio"

//import Dropdown from "@material-tailwind/react/Dropdown"
//import DropdownItem from "@material-tailwind/react/DropdownItem"
//import DropdownLink from "@material-tailwind/react/DropdownLink"
//import DropdownButton from "@material-tailwind/react/DropdownButton"

//import DropdownThemeExample  from '../components/DropdownAndDropup';
//import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


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
                            


							<Card>
				            <CardHeader color="purple" contentPosition="none">
				                <div className="w-full flex items-center justify-between">
				                    <h2 className="text-white text-2xl">New Promotion</h2>
				                    
				                </div>
				            </CardHeader>
				            <CardBody>

				                <form onSubmit={this.handleSubmit}>

				                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
				                        Promotion Information
				                    </h6>
				                    <div className="flex flex-wrap mt-10">
				                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
				                            <Input
				                                type="text"
				                                color="purple"
				                                placeholder="Promotion Name"
												name="name"
				                            />
				                        </div>
				                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
				                            <Input
				                                type="text"
				                                color="purple"
				                                placeholder="Code"
												name="code"
				                            />
				                        </div>
				                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
				                            <Input
				                                type="text"
				                                color="purple"
				                                placeholder="Description"
												name="description"
				                            />
				                        </div>

										<div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
				                            <Input
				                                type="text"
				                                color="purple"
				                                placeholder="Start Date"
												name="startDate"
				                            />
				                        </div>
				                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
				                            <Input
				                                type="text"
				                                color="purple"
				                                placeholder="End Date"
												name="endDate"
				                            />
				                        </div>

										<div className="w-small lg:w-6/12 pl-4 mb-6 font-light">
											
											<Input
				                                type="text"
				                                color="purple"
				                                placeholder="Active"
												name="active"
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
                        			<p class={this.state.registeredSuccessfull === true ? 'text-purple-500 text-sm my-6 font-bold uppercase ...' : 'text-white'}>Promotion Registered Successfully!!!</p>	
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

export default DeletePromotion