import React from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import UserSignup from './screens/UserSignUp';
import EmployeeDashboard from './screens/EmployeeDashboard';
import JobCreateScreen from './screens/JobCreateScreen';
import UserDashboard from './screens/UserDashboard';
import Activate from './screens/Activate';
// import AppliedJobs from './screens/AppliedJobs'


const App = () => {
    const userStatus = useSelector((state) => state.userActivate);
    const { loading, userInfo } = userStatus;
    return (

        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Job Portals</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        {
                            userInfo && userInfo.user ?
                                (
                                    <Nav.Link href="/">{userInfo.user.email}</Nav.Link>
                                ) :
                                <Nav.Link href="signup">Login</Nav.Link>
                        }
                        {/* {
                            userInfo && userInfo.user ?
                                (
                                    <Nav.Link href="/appliedjobs">Applied Jobs</Nav.Link>) :
                                ''
                        } */}
                        {
                            userInfo && userInfo.user ?
                                (
                                    <Nav.Link href="/">Logout</Nav.Link>) :
                                ''
                        }
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            <main className="py-3">
                <Container>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/auth/activate/:token" exact component={Activate} />
                            <Route path="/employerdashboard" exact component={EmployeeDashboard} />
                            <Route path="/userdashboard" exact component={UserDashboard} />
                            {/* <Route path="/appliedjobs" exact component={AppliedJobs} /> */}
                            <Route path="/createjobs" exact component={JobCreateScreen} />
                            <Route path="/signup" exact component={UserSignup} />
                            <Route path="/" component={HomeScreen} />
                        </Switch>
                    </BrowserRouter>
                </Container>
            </main>
        </>
    )
}

export default App;