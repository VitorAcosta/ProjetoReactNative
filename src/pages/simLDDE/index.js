import React from 'react';
import { View, Text, StyleSheet,
         TouchableOpacity, TextInput,
         ScrollView, ImageBackground } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import { windowHeight, windowWidth } from '../Constants';

import LDDE from '../../dataStructures/LDDE';

/**
 * Imagens a serem renderizadas
 */
import ESF from '../../../assets/elementoSemFilhos.png';
import ESE from '../../../assets/elementoSemFilhoEsq.png';
import ESD from '../../../assets/elementoSemFilhoDir.png';
import EG from '../../../assets/elementoGeral.png';

const ldde = new LDDE();

export default class SimLDDE extends React.Component{
    constructor(props){
        super(props);
        this.state = {valor: '', lista: []};
        this.insereLDDE = this.insereLDDE.bind(this);
        this.removeLDDE = this.removeLDDE.bind(this);
        this.inputValido = this.inputValido.bind(this);
    }

    inputValido(){
        if(!this.state.valor == ''){
            /**
             * Verificação se há vírgula no número.
             * A vírgula ainda funciona, entretanto o número é truncado, tirando a precisão.
             */
            if(this.state.valor.indexOf(',') != -1){
                Toast.showWithGravity("Insira Floats utilizando ponto e tente novamente.",
                    Toast.LONG, Toast.CENTER);
                    return false;
            }
            else return true;
        }
        else if (this.state.valor == '') {
            Toast.showWithGravity("Insira um valor válido!",
            Toast.LONG, Toast.CENTER);
            return false;
        }
        else return true;
    }

    /**
     * Método que insere, por meio da classe LDDE.js, o valor digitado pelo usuário na lista.
     */
    insereLDDE(){
        if(this.inputValido()){
            ldde.insere(this.state.valor);
            this.setState({
                    valor: '',
                    lista: ldde.transformaArray()
            });
        }
    }

    /**
     * Método que remove, por meio da classe LDDE.js, o valor digitado pelo usuário na lista.
     */
    removeLDDE(){
        if(this.inputValido()){
            let response = ldde.remove(this.state.valor);
            if(response[0]){
                Toast.showWithGravity(response[1],
                Toast.LONG, Toast.CENTER);
                this.setState({
                    valor: '',
                    lista: ldde.transformaArray()
                });
            }else{
                Toast.showWithGravity(response[1],
                    Toast.LONG, Toast.CENTER);
            }
        }
    }

    render(){
        return(
            <View>
                <View style={Theme.mainContainer}>
                    <TextInput
                    placeholder = 'Insira o elemento'
                    placeholderTextColor = '#31736f'
                    keyboardType='numeric'
                    style={Theme.inputUser}
                    onChangeText={text => this.setState({valor: text})}
                    value={this.state.valor}
                    />
                    <TouchableOpacity 
                    style={Theme.btnStyle}
                    onPress={this.insereLDDE}>
                            <Text style={Theme.btnTextStyle}>Inserir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={Theme.btnStyleRemove}
                    onPress={this.removeLDDE}>
                            <Text style={Theme.btnTextStyle}>Remover</Text>
                    </TouchableOpacity>
                </View>
                <Text style={Theme.tamanhoLista}>Tamanho da lista: {this.state.lista.length}</Text>
                <ScrollView
                style={Theme.scrollViewStyle}
                horizontal>
                    {
                        this.state.lista.map( (item, index) => {
                            var x;
                            if(item[0] == false && item[2] == false){
                                x = ESF;
                            }
                            else if(item[0] == false && item[2] == true){
                                x = ESE;
                            }
                            else if(item[0] == true && item[2] == false){
                                x = ESD;
                            }
                            else{
                                x = EG;
                            }
                            return(
                                <View key={index} style={Theme.container}>
                                    <ImageBackground source={x} style={Theme.image}>
                                        <Text style={Theme.txtStyle}>{item[1]}</Text>
                                    </ImageBackground>
                                </View>
                            )
                        })
                    }
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
    btnStyleRemove:{
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
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: windowWidth*.06
    },
    container:{
        width: windowWidth*.5,
        height: windowHeight*.1,
        marginLeft: windowWidth*.03
    },
    tamanhoLista:{
        alignSelf:'center',
        fontSize: RFValue(18)
    },
    image:{
        flex: 1,
        resizeMode: 'center'
    },
    txtStyle:{
        position: 'relative',
        marginLeft: windowWidth*.14,
        marginTop: windowHeight*.02,
        fontSize: RFValue(24),
        color: '#FFF',
        fontWeight: "bold"
    },
    scrollViewStyle:{
        padding: 10,
        marginTop: windowHeight*.1
    }
}
);