import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired,
    };
    handlePress = () => {
        console.log(this.props.nummber);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.random, this.props.isSelected && styles.selected]}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        height: 100,
        marginHorizontal: 20,
        marginVertical: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#776e65',
        borderColor: '#bbada0',
        borderWidth: 10,
        backgroundColor: '#eee4da',
        fontSize: 40,
    },

    selected: {
        opacity:0.3,
    },
});

export default RandomNumber;