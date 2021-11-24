import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <H6 color="blueGray">Customer Analytics</H6>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/customers"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="settings" size="2xl" />
                                    Customers
                                </NavLink>
                            </li>
							<li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/register"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="list_alt" size="2xl" />
                                    Register Customer
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <NavLink
                                    to="/search"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="fingerprint" size="2xl" />
                                    Search
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/promotions"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="map" size="2xl" />
                                    Promotions
                                </NavLink>
                            </li>
							<li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/newpromotion"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="list_alt" size="2xl" />
                                    Register Promotion
                                </NavLink>
                            </li>
							<li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/profiles"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="account_circle" size="2xl" />
                                    Profiles
                                </NavLink>
                            </li>
							<li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/generateprofile"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="account_circle" size="2xl" />
                                    Generate Profile
                                </NavLink>
                            </li>
							<li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/reports"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                    >
                                    <Icon name="web" size="2xl" />
                                    Reports
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}
