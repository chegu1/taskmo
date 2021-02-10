import React from 'react';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import JobCreateScreen from './screens/JobCreateScreen';
import UserSignup from './screens/UserSignUp';

const App = () => {
    return (
        <main className="py-3">
            <Container>
                <UserSignup />
                <HomeScreen />
                <JobCreateScreen />
            </Container>
        </main>
    )
}

export default App;