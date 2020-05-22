import React from 'react';
import { View, Text, StyleSheet,
         TouchableOpacity, TextInput,
         ScrollView, ImageBackground, Image } from 'react-native';

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
import Seta from '../../../assets/arrow.png';

const ldde = new LDDE();

export default class SimLDDE extends React.Component{
    constructor(props){
        super(props);
        this.state = {valor: '', lista: [], apontador: null};
        this.atualizaValores = this.atualizaValores.bind(this);
        this.insereLDDE = this.insereLDDE.bind(this);
        this.removeLDDE = this.removeLDDE.bind(this);
        this.inputValido = this.inputValido.bind(this);
        this.busca = this.busca.bind(this);
        this.limpa = this.limpa.bind(this);
    }

    atualizaValores(){
        this.setState({
            valor: '',
            lista: ldde.transformaArray(),
            apontador: null
        });
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
    * Métodos principais:
    * Utilizando a instância da classe LDDE, os dados inseridos pelo usuário são enviados para a classe.
    * 
    *     insereLDDE() -> é possível enviar os dados inseridos pelo usuário para a inserção
    *                     (ou não) na LDDE.
    *     removeLDDE() -> retira itens da lista.
    *     buscar() -> Busca o número inserido pelo usuário e retorna sucesso ou falha.
    *     limpa() -> remove todos os elementos e refaz apontamentos.
     */
    insereLDDE(){
        if(this.inputValido()){
            ldde.insere(this.state.valor);
            this.atualizaValores();
        }
    }
    
    removeLDDE(){
        if(this.inputValido()){
            let response = ldde.remove(this.state.valor);
            if(response[0]){
                Toast.showWithGravity(response[1],
                Toast.LONG, Toast.CENTER);
                this.atualizaValores();
                
            }else{
                Toast.showWithGravity(response[1],
                    Toast.LONG, Toast.CENTER);
            }
        }
    }

    busca(){
        if(this.inputValido()){
            let retornoBusca = ldde.busca(this.state.valor);
            if(retornoBusca >= 0){
                Toast.showWithGravity("Valor encontrado no index: " + retornoBusca,
                Toast.LONG, Toast.BOTTOM);
                    this._scrollView.scrollTo({
                      x: retornoBusca * (windowWidth*.5)
                    });
                    this.setState({apontador: retornoBusca});
            }
            else{
                Toast.showWithGravity("O valor não foi encontrado",
                Toast.LONG, Toast.CENTER);
                this.setState({apontador: null});
            }
        }
    }
    
    limpa(){
        ldde.limpa();
        this.atualizaValores();
    }

    render(){
        return(
            <View>
               <View style={Theme.mainContainer}>
                    <TextInput
                    placeholder = 'Insira o elemento'
                    placeholderTextColor = '#31736f'
                    keyboardType = 'number-pad'
                    style={Theme.inputUser}
                    onChangeText={text => this.setState({valor: text})}
                    value={this.state.valor}
                    />
                    
                    <View
                    style={{
                        marginTop: windowHeight*.03, justifyContent: 'center',
                        flexDirection: 'row'}}>
                        <TouchableOpacity 
                        style={Theme.btnStyle}
                        onPress={this.insereLDDE}>
                            <Text style={Theme.btnTextStyle}>Inserir</Text>
                        </TouchableOpacity>
                    
                        <TouchableOpacity 
                        style={Theme.btnStyle}
                        onPress={this.removeLDDE}>
                                <Text style={Theme.btnTextStyle}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                    style={{
                        marginTop: windowHeight*.03, justifyContent: 'center',
                        flexDirection: 'row'}}>
                        <TouchableOpacity 
                        style={Theme.btnStyle}
                        onPress={this.busca}>
                                <Text style={Theme.btnTextStyle}>Buscar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={Theme.btnStyle}
                        onPress={this.limpa}>
                                <Text style={Theme.btnTextStyle}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={Theme.tamanhoLista}>Tamanho da lista: {this.state.lista.length}</Text>
                </View>
                <ScrollView
                style={Theme.scrollViewStyle}
                ref={view => this._scrollView = view}
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
                                <View key={index}>
                                    <View style={Theme.container}>
                                            <ImageBackground source={x} style={Theme.image}>
                                                <Text style={Theme.txtStyle}>{item[1]}</Text>
                                            </ImageBackground>
                                    </View>
                                    {(this.state.apontador === index)?
                                            <Image source={Seta} style={Theme.imageArrow}/>:null}
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
        height: windowHeight*.31,
        backgroundColor: '#cde8d9',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    btnStyle:{
        //Flex
        alignItems: 'center',
        //Style
        backgroundColor: '#31736f',
        width: windowWidth*.4,
        marginLeft: windowWidth*.02,
        borderRadius: 20,
        padding: 10
    },
    btnTextStyle:{
        fontSize: RFValue(18),
        color: '#FFF'
    },
    inputUser:{
        textAlign: 'center',
        fontSize: RFValue(20),
        marginLeft: windowWidth*.05,
        borderBottomWidth: 2,
        borderBottomColor: '#31736f',
        width: windowWidth*.9,
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
        fontSize: RFValue(18),
        letterSpacing: 1
    },
    image:{
        flex: 1,
        resizeMode: 'center'
    },
    txtStyle:{
        alignSelf: 'center',
        position: 'relative',
        marginRight: windowWidth*.16,
        marginTop: windowHeight*.02,
        fontSize: RFValue(24),
        color: '#FFF',
        fontWeight: "bold"
    },
    scrollViewStyle:{
        padding: 10,
        marginTop: windowHeight*.02,
        height: windowHeight*.25
    },
    imageArrow:{
        marginTop: windowHeight*.01,
        width: windowWidth*.13,
        height: windowHeight*.09,
        marginLeft: windowWidth*.1
    }
}
);