/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TargetSum</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
    },
});

export default App;
