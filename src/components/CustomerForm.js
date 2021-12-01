import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import React, { useState } from 'react';
import axios from 'axios'

export default function SettingsForm() {
	
  const [on, setOn] = useState(false);
  const lightOn = () => setOn(true);
  const { useEffect } = React;

   useEffect(() => {
  // Load Originals
  axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


  // Get other categories with the same pattern here

}, []);

	
    return (
        
    );
}
