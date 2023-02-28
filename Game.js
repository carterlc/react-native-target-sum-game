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
        randomNumberCount: PropTypes.number.isRequired,
    };

    state = {
        selectedIds: [],
    }

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };
    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
        // console.warn(sumSelected);
    };
    render() {
        const gameStatus = this.gameStatus();
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) =>
                        <RandomNumber 
                            key={index}
                            id={index}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(index)}
                            onPress={this.selectNumber}
                            />
                    )}
                </View>
                <Text>
                    {gameStatus}
                </Text>
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
        fontWeight: 'bold',
        color: '#776e65',
    },

    randomContainer: {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal: 20,
    },
});
export default Game;
