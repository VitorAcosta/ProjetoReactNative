import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {windowHeight,windowWidth} from '../src/pages/Constants';
import { RFValue } from 'react-native-responsive-fontsize';



export default class InfoContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={Theme.section}>
                <Text style={Theme.titleDoc}>
                    {this.props.tituloSecao}
                </Text>
                <Text style={Theme.paragraph}>
                    {this.props.conteudoSecao}
                </Text>
                <Text style={[Theme.paragraph, {fontWeight: 'bold'}]}>
                    {this.props.complexidade}
                </Text>
                {(this.props.pseudoExists === true)?
                <Text style={[Theme.paragraph, {fontWeight: 'bold'}]}>
                    Pseudocódigo:
                </Text> : null}
                <Text style={Theme.paragraph}>
                    {this.props.pseudo}
                </Text>
            </View>
        )
    }

}

const Theme = StyleSheet.create(
    {
        section:{
            alignSelf: 'center',
            elevation: 10,
            backgroundColor: '#cde8d9',
            width: windowWidth*.90,
            marginTop: windowHeight*.05
        },
        paragraph:{
            fontSize: RFValue(16),
            color:'#051c08',
            letterSpacing: 1,
            textAlign: 'justify',
            paddingLeft: windowWidth*.05,
            paddingRight: windowWidth*.05
        },
        titleDoc:{
            fontSize: RFValue(20),
            fontWeight: 'bold',
            color: '#095e60',
            textShadowColor: 'rgba(0, 0, 0, 0.35)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 5,
            marginLeft: windowWidth*.05,
            marginBottom: windowHeight*.02,
            marginTop: windowHeight*.05,
        }
    }
);