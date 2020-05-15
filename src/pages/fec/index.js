import React from 'react';
import { View, Text, ScrollView,
         StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {windowHeight,windowWidth} from '../Constants';

export default class Fec extends React.Component{
    render(){
        return(
            <View>
                <View style={Theme.mainContainer}>
                    <Text style={Theme.title}>Fila Estática Circular</Text>
                    <Text style={Theme.description}></Text>
                    <TouchableOpacity 
                    style={Theme.btnStyle}
                    onPress={() => this.props.navigation.navigate('simFce')}>
                        <Text style={Theme.btnTextStyle}>Simular</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={Theme.information}>
                    <Text style={Theme.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin et est felis. Curabitur ultricies erat a massa imperdiet,
                    a consequat ante dignissim. Nullam non laoreet lorem.
                    Praesent consectetur, lorem id feugiat ultrices, arcu justo porta mi,
                    auctor mattis dui ex vitae tortor. Mauris quis faucibus neque,
                    nec blandit justo.
                    </Text>
                </ScrollView>
            </View>
        )
    }
}

const Theme = StyleSheet.create(
    {
        mainContainer:{
            //Style
            width: windowWidth,
            height: windowHeight*.21,
            backgroundColor: '#cde8d9',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
        },
        title:{
            fontSize: RFValue(26),
            alignSelf: 'center',
            fontWeight: 'bold',
            color: '#095e60',
            textShadowColor: 'rgba(0, 0, 0, 0.35)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 5
        },
        description:{
            fontSize: RFValue(20),
            alignSelf: 'center',
            color: '#2f5b5c'
        },
        btnStyle:{
            //Flex
            alignItems: 'center',
            //Style
            backgroundColor: '#31736f',
            width: windowWidth*.3,
            marginTop: windowHeight*.02,
            marginLeft: windowWidth*.60,
            borderRadius: 20,
            padding: 10
        },
        btnTextStyle:{
            fontSize: RFValue(18),
            color: '#FFF'
        },
        information:{
            marginTop: windowHeight*.05
        },
        paragraph:{
            fontSize: RFValue(16),
            color:'#051c08',
            fontWeight: 'bold',
            letterSpacing: 1,
            textAlign: 'justify',
            paddingLeft: windowWidth*.05,
            paddingRight: windowWidth*.05
        }
    }
);