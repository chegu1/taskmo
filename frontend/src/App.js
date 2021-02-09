import React from 'react';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import JobCreateScreen from './screens/JobCreateScreen';

const App = () => {
    return (
        <main className="py-3">
            <Container>
                <HomeScreen />
                <JobCreateScreen />
            </Container>
        </main>
    )
}

export default App;