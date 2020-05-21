import React from 'react';
import { View, Text, TextInput,
         TouchableOpacity, ScrollView, StyleSheet,
         Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';

import { windowWidth, windowHeight } from '../Constants';
import Fila from '../../dataStructures/filaEstaticaCircular';
import Elemento from '../../../components/FilaEst';
import Seta from '../../../assets/arrow.png';

const f = new Fila();

export default class SimulacaoFce extends React.Component{
    constructor(props){
        super(props);
        this.state = {valor: '', fila:f.fila, inicioFila: 0, fimFila: 0, apontador: null};
        this.enfileirar = this.enfileirar.bind(this);
        this.desenfileirar = this.desenfileirar.bind(this);
        this.atualizaValores = this.atualizaValores.bind(this);
        this.busca = this.busca.bind(this);
        this.reset = this.reset.bind(this);
    }

    /**
     * Utils: ValidInput() -> Verifica se o dado inserido pelo usuário é válido.
     *        AtualizaValores() -> Responsável por setar os estados.
     */

    validInput(){
        if(this.state.valor == ''){
            Toast.showWithGravity("Pelo menos um valor deve ser inserido no campo.",
            Toast.LONG, Toast.CENTER);
            return false;
        }
        else return true;
    }
    atualizaValores(){
        this.setState({
            valor: '',
            fila: f.fila,
            inicioFila: f.begin,
            fimFila: f.end,
            apontador: null
        });
    }


    /**
    * Métodos principais:
    * Utilizando a instância da classe Fila, os dados inseridos pelo usuário são enviados para a classe.
    * 
    *     enfileirar() -> é possível enviar os dados inseridos pelo usuário para a inserção
    *                     (ou não) na fila estática circular.
    *     desenfileirar() -> retira itens da fila.
    *     buscar() -> Busca o número inserido pelo usuário e retorna sucesso ou falha.
    *     limpa() -> remove todos os elementos e refaz apontamentos.
     */
    enfileirar(){
        if(this.validInput()){
            if(f.enfileira(this.state.valor)){
                this.atualizaValores();
            }
            else{
                Toast.showWithGravity("O sentinela foi alcançado.\nNão é possível inserir mais elementos.",
                Toast.LONG, Toast.CENTER);
            }
        }
    }

    desenfileirar(){
        if(f.desinfileira()[0]){
            this.atualizaValores();
        }
        else{
            Toast.showWithGravity("A fila não contém elementos.",
            Toast.LONG, Toast.CENTER);
        }
    }

    busca(){
        if(this.validInput()){
            let retornoBusca = f.busca(this.state.valor);
            if(retornoBusca >= 0){
                Toast.showWithGravity("Valor encontrado no index: " + retornoBusca,
                Toast.LONG, Toast.BOTTOM);
                    this._scrollView.scrollTo({
                      x: retornoBusca * (windowWidth*.15)
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

    reset(){
        f.limpa();
        this.atualizaValores();
        Toast.showWithGravity("A fila foi resetada\nO inicio será igual ao final da fila.",
        Toast.LONG, Toast.CENTER);
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
                        onPress={this.enfileirar}>
                            <Text style={Theme.btnTextStyle}>Enfileirar</Text>
                        </TouchableOpacity>
                    
                        <TouchableOpacity 
                        style={Theme.btnStyle}
                        onPress={this.desenfileirar}>
                                <Text style={Theme.btnTextStyle}>Desenfileirar</Text>
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
                        onPress={this.reset}>
                                <Text style={Theme.btnTextStyle}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={Theme.infoContainer}>
                    <Text style={{fontSize: RFValue(18)}}>Início da Fila:</Text>
                    <Text 
                    style={{fontSize: RFValue(18), fontWeight: 'bold'}}
                    >{this.state.inicioFila}</Text>
                    <Text style={{fontSize: RFValue(18)}}>Final da Fila:</Text>
                    <Text 
                    style={{fontSize: RFValue(18), fontWeight: 'bold'}}
                    >{this.state.fimFila}</Text>
                </View>
                <ScrollView
                horizontal
                style={{padding: 10, height: windowHeight*.5}}
                ref={view => this._scrollView = view}>
                    {
                        //Renderiza toda a fila.
                        this.state.fila.map( (valores, index) => {
                            return(
                                <View key={index}>
                                    <Elemento indexElemento={index}>{valores}</Elemento>
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
    imageArrow:{
        marginTop: windowHeight*.04,
        width: windowWidth*.13,
        height: windowHeight*.09
    }
}
);
