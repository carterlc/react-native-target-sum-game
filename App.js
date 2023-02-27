/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import Game from './Game';

class App extends React.Component {
    render() {
        return (
            <Game randomNumberCount={6} />
        );
    }
}
export default App;
