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

class GenerateProfile extends Component {

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

        this.handleChangeUsername = this.handleChangeUsername.bind(this)
		this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
		this.handleChangeLastName = this.handleChangeLastName.bind(this)
		this.handleChangeEmailAddress = this.handleChangeEmailAddress.bind(this)
		this.handleChangeAddresssLine = this.handleChangeAddresssLine.bind(this)
		this.handleChangeCity = this.handleChangeCity.bind(this)
		this.handleChangeState = this.handleChangeState.bind(this)
		this.handleChangeCountry = this.handleChangeCountry.bind(this)
		this.handleChangeZipCode = this.handleChangeZipCode.bind(this)
		this.handleChangeRegisterDate = this.handleChangeRegisterDate.bind(this)
		this.handleChangeHasProfile = this.handleChangeHasProfile.bind(this)
		this.handleChangeFacebookId = this.handleChangeFacebookId.bind(this)
		this.handleChangeTwitterId = this.handleChangeTwitterId.bind(this)
		this.handleChangeInstagramId = this.handleChangeInstagramId.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername = event => {
    	this.setState({ username: event.target.value });
    };

    handleChangeFirstName = event => {
    	this.setState({ firstName: event.target.value });
    };

    handleChangeLastName = event => {
    	this.setState({ lastName: event.target.value });
    };

    handleChangeEmailAddress = event => {
    	this.setState({ emailAddress: event.target.value });
    };

    handleChangeAddresssLine = event => {
    	this.setState({ addresssLine: event.target.value });
    };

    handleChangeCity = event => {
    	this.setState({ city: event.target.value });
    };

    handleChangeState = event => {
    	this.setState({ state: event.target.value });
    };

    handleChangeCountry = event => {
    	this.setState({ country: event.target.value });
    };

    handleChangeZipCode = event => {
    	this.setState({ zipCode: event.target.value });
    };

    handleChangeRegisterDate = event => {
    	this.setState({ registerDate: event.target.value });
    };

    handleChangeHasProfile = event => {
    	this.setState({ hasProfile: event.target.value });
    };

    handleChangeFacebookId = event => {
    	this.setState({ facebookId: event.target.value });
    };

    handleChangeTwitterId = event => {
    	this.setState({ twitterId: event.target.value });
    };

    handleChangeInstagramId = event => {
    	this.setState({ instagramId: event.target.value });
    };

    refreshCustomers() {
       
 		let username = AuthenticationService.getLoggedInUserName()
        
		CustomerService.retrieveAllCustomers(username)
            .then(
                response => {
                    console.log(response);
                    //this.setState({ todos: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        CustomerService.deleteCustomer(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/todos/${id}`)
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        CustomerService.retrieveCustomer(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        
        let errors = {}
        
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
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
					                        Settings
					                    </Button>
					                </div>
					            </CardHeader>
					            <CardBody>
									
									<form onSubmit={this.handleSubmit}>
					                    
										<h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
					                        Search Information
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
					                        search
					                    	</Button>
					
					                    </div>
					                </form>

									<div className={this.state.registeredSuccessfull === false ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto flex justify-center' : 'text-white'}>
                        				<p class={this.state.registeredSuccessfull === false ? 'text-purple-500 text-sm my-6 font-bold uppercase ...' : 'text-white'}> Customer Not Found!!!</p>	
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