import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Customers from 'pages/Customers';
import Search from 'pages/Search';
import Register from 'pages/Register';
import Promotions from 'pages/Promotions';
import NewPromotion from 'pages/NewPromotion';
import Profiles from 'pages/Profiles';
import GenerateProfile from 'pages/GenerateProfile';
import Reports from 'pages/Reports';
import Footer from 'components/Footer';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/customers" component={Customers} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/search" component={Search} />
                    <Route exact path="/promotions" component={Promotions} />
					<Route exact path="/newpromotion" component={NewPromotion} />
                    <Route exact path="/profiles" component={Profiles} />
					<Route exact path="/generateprofile" component={GenerateProfile} />
					<Route exact path="/reports" component={Reports} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
