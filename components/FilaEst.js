import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {windowHeight, windowWidth} from '../src/pages/Constants';


export default class Elemento extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.index);
    }
    render(){
        return(
            <View style={Theme.container}>
                <Text style={Theme.valorFila}>{this.props.children}</Text>
                <Text style={Theme.indexFila}>{this.props.index}</Text>
            </View>
        );
    }
}

const Theme = StyleSheet.create(
    {
        container:{
            alignItems: 'center',
            width: windowWidth*.15,
            height: windowHeight*.09,
            backgroundColor: '#31736f'
        },  
        indexFila:{
            marginTop: windowHeight*.04,        
            fontSize: RFValue(18),
            color: '#000000'
        },
        valorFila:{
            marginTop: windowHeight*.02,
            fontSize: RFValue(18),
            fontWeight: 'bold',
            color: '#FFF'
        }
    }
)