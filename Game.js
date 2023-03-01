/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };

    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    }

    gameStatus = 'PLAYING';

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    //SHUFFLE NUMBERS
    shuffledRandomNumbers = shuffle(this.randomNumbers);

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            }, () => {
                if (this.state.remainingSeconds === 0) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000)
    }

    //RESET GAME

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedIds !== this.state.selectedIds ||
            nextState.remainingSeconds === 0
            ) {
            this.gameStatus = this.calcGameStatus(nextState);
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    };

    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if(nextState.remainingSeconds === 0) {
            return 'LOST';
        }
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
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                            key={index}
                            id={index}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNumber}
                        />
                    )}
                </View>
                {this.gameStatus !== 'PLAYING' && (
                <Button title="Play Again" onPress={this.props.onPlayAgain}/>
                )}
                <Text>
                    {this.state.remainingSeconds}
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
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal: 20,
    },

    STATUS_PLAYING: {
        borderWidth: 10,
        borderColor: 'white',
    },
    STATUS_WON: {
        borderWidth: 10,
        borderColor: 'green',
    },
    STATUS_LOST: {
        borderWidth: 10,
        borderColor: 'red',
    },
});
export default Game;
