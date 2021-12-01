import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import React from 'react';
//import axios from 'axios'
//import { JPA_API_URL } from '../Constants'
//const React = require('react');

import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";

import H5 from "@material-tailwind/react/Heading5";

export default function SettingsForm() {

    return (

			<Card>
            <CardHeader color="lightBlue" size="small">
                <H5 color="white">Login</H5>
            </CardHeader>

            <CardBody>
                <div className="mt-4 mb-8 px-4">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="First Name"
                        iconName="account_circle"
						value={this.state.value} 
						onChange={this.handleChange}
                    />
                </div>
                <div className="mb-8 px-4">
                    <InputIcon
                        type="email"
                        color="lightBlue"
                        placeholder="Email Address"
                        iconName="email"
                    />
                </div>
                <div className="mb-4 px-4">
                    <InputIcon
                        type="password"
                        color="lightBlue"
                        placeholder="password"
                        iconName="lock"
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
            </CardFooter>
        </Card>

    );
}
