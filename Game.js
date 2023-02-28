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
import RandomNumber from './RandomNumber';
class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.string.isRequired,
    };

    state = {
        selectedNumbers:[0,4],
    }

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
        target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

        isNumberSelected = (numberIndex) => {
            return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
        }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                {this.randomNumbers.map((randomNumber, index) =>
                <RandomNumber key ={index} number={randomNumber} isSelected={this.isNumberSelected(index)}/>
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
});
export default Game;
