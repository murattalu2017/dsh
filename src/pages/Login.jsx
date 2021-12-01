import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";

class LoginPage extends Component {

    constructor(props) {
        
        super(props)

        this.state = {
            username: 'cbap',
            password: 'admin',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this)
		this.handleChangePassword = this.handleChangePassword.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChangeUsername = event => {
    	this.setState({ username: event.target.value });
    };

    handleChangePassword = event => {
    	this.setState({ password: event.target.value });
    };

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/dashboard`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        
		return (

			<>
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                        <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">

                            <Card>
					            <CardHeader color="lightBlue" size="small">
					                <H5 color="white">Login</H5>
					            </CardHeader>
					
					            <CardBody>
					                <div className="mt-4 mb-8 px-4">
					                    <InputIcon
					                        type="text"
					                        color="lightBlue"
					                        placeholder="Username"
					                        iconName="account_circle"
											outline={true}
                							value={this.state.username} 
											onChange={this.handleChangeUsername}
					                    />
					                </div>
					                <div className="mb-4 px-4">
					                    <InputIcon
					                        type="password"
					                        color="lightBlue"
					                        placeholder="Password"
					                        iconName="lock"
											outline={true}
                							value={this.state.password} 
											onChange={this.handleChangePassword}
					                    />
					                </div>
					            </CardBody>
					            <CardFooter>
					                
									<div className="flex justify-center">
					                    <Button
					                        color="lightBlue"
					                        buttonType="link"
					                        size="lg"
					                        ripple="dark"
											onClick={this.loginClicked}
					                        >
					                        Sign In
					                    </Button>
					                </div>

									<div className={this.state.hasLoginFailed === true ? 'w-full flex-grow lg:flex lg:items-center lg:w-auto flex justify-center' : 'text-white'}>
                        				<p class={this.state.hasLoginFailed === true ? 'text-blue-400 text-sm my-6 font-bold uppercase ...' : 'text-white'}>Username or Password not Correct</p>	
                    				</div>

					            </CardFooter>

					        </Card>
                    
                        </div>
                    </div>
                </div>
            </div>
        </>

        )
    }
}

export default LoginPage