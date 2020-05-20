import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {windowHeight, windowWidth} from '../src/pages/Constants';

/**
 * Classe que gera um componente referente à lista estática circular,
 * permitindo a visualização de seu funcionamento na página de simulação.
 */
export default class Elemento extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={Theme.container}>
                <Text style={Theme.valorFila}>{this.props.children}</Text>
                <Text style={Theme.indexFila}>{this.props.indexElemento}</Text>
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
            backgroundColor: '#31736f',
            borderWidth: 1,
            borderColor: "#FFF",
            margin: 2
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