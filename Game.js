/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.string.isRequired,
    };
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
        target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                {this.randomNumbers.map((randomNumber, index) =>
                <Text style={styles.random} key={index}>{randomNumber}</Text>
                )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#faf8ef',
        flex: 1,
        paddingTop: 30,
    },


    target: {
        fontSize: 60,
        marginHorizontal: 50,
        textAlign: 'center',
        color:'##776e65',
        fontWeight: 'bold',
    },

    randomContainer: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal:20,
        
    },

    random: {
        backgroundColor: '#999',
        width: 100,
        height:100,
        marginHorizontal: 20,
        marginVertical: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#776e65',
        borderColor:'#bbada0',
        borderWidth: 10,
        backgroundColor: '#eee4da',
        fontSize:40,
    },
});
export default Game;
