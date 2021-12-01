import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import ListCustomers from 'pages/ListCustomers';
import SearchCustomer from 'pages/SearchCustomer';
import RegisterCustomer from 'pages/RegisterCustomer.jsx';
import ListPromotions from 'pages/ListPromotions';
import RegisterPromotion from 'pages/RegisterPromotion.jsx';
import SendPromotion from 'pages/SendPromotion';
import ListProfiles from 'pages/ListProfiles';
import GenerateProfile from 'pages/GenerateProfile.jsx';
import Login from 'pages/Login';
import Reports from 'pages/Reports';
import Footer from 'components/Footer';
import AuthenticatedRoute from 'components/AuthenticatedRoute.jsx'

import 'assets/styles/tailwind.css';

function App() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/login" component={Login}/>
                    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
                    <AuthenticatedRoute exact path="/customers" component={ListCustomers} />
					<AuthenticatedRoute exact path="/register-customer" component={RegisterCustomer} />
					<AuthenticatedRoute exact path="/search" component={SearchCustomer} />
					<AuthenticatedRoute exact path="/generate-profile" component={GenerateProfile} />
					<AuthenticatedRoute exact path="/profiles" component={ListProfiles} />
                    <AuthenticatedRoute exact path="/promotions" component={ListPromotions} />
					<AuthenticatedRoute exact path="/register-promotion" component={RegisterPromotion} />
					<AuthenticatedRoute exact path="/send-promotion" component={SendPromotion} />
					<AuthenticatedRoute exact path="/reports" component={Reports} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
