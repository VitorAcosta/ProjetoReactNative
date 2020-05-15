import React from 'react';
import { View, Text, TextInput,
         TouchableOpacity, FlatList, StyleSheet,
         ToastAndroid } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { windowWidth, windowHeight } from '../Constants';
import Fila from '../../dataStructures/filaEstaticaCircular';
import Elemento from '../../../components/FilaEst';

const f = new Fila();

export default class SimulacaoFce extends React.Component{
    constructor(props){
        super(props);
        this.state = {valor: '', fila:[]};
        this.enfileirar = this.enfileirar.bind(this);
    }
    /**
     * Método que chama o enfileirar da classe Fila, concretizando o funcionamento.
     */
    enfileirar(){
        if(!this.state.valor == ''){
            if(f.enfileira(this.state.valor)){
                console.log(f.fila);
                this.setState({fila: f.fila});
            }
        }
        else{
            ToastAndroid.showWithGravity("Pelo menos um valor deve ser inserido no campo.",
             ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }

    render(){
        return(
            <View>
                <View style={Theme.mainContainer}>
                    <TextInput
                    placeholder = 'Insira o elemento'
                    placeholderTextColor = '#31736f'
                    style={Theme.inputUser}
                    onChangeText={text => this.setState({valor: text})}
                    />
                    <TouchableOpacity 
                    style={Theme.btnStyle}
                    onPress={this.enfileirar}>
                            <Text style={Theme.btnTextStyle}>Enfileirar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={Theme.btnStyleDeQueue}>
                            <Text style={Theme.btnTextStyle}>Desenfileirar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={this.state.fila}
                horizontal
                style={{height: windowHeight*.3}}
                renderItem={({item}) => 
                    <Elemento index={this.state.fila.indexOf(item)}>{item}</Elemento>}
                    keyExtractor={item => item}
                >

                </FlatList>
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
    btnStyle:{
        //Flex
        alignItems: 'center',
        //Style
        backgroundColor: '#31736f',
        width: windowWidth*.3,
        marginTop: -windowHeight*.06,
        marginLeft: windowWidth*.60,
        borderRadius: 20,
        padding: 10
    },
    btnStyleDeQueue:{
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
    inputUser:{
        fontSize: RFValue(20),
        marginLeft: windowWidth*.05,
        borderBottomWidth: 2,
        borderBottomColor: '#31736f',
        width: windowWidth*.5,
        color: '#31736f'
    }
}
);