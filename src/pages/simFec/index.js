import React from 'react';
import { View, Text, TextInput,
         TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';

import { windowWidth, windowHeight } from '../Constants';
import Fila from '../../dataStructures/filaEstaticaCircular';
import Elemento from '../../../components/FilaEst';

const f = new Fila();

export default class SimulacaoFce extends React.Component{
    constructor(props){
        super(props);
        this.state = {valor: '', fila:f.fila, inicioFila: 0, fimFila: 0};
        this.enfileirar = this.enfileirar.bind(this);
        this.desenfileirar = this.desenfileirar.bind(this);
        this.atualizaValores = this.atualizaValores.bind(this);
        this.busca = this.busca.bind(this);
    }

    /**
     * Método que define os estados de todos os valores envolvidos na simulação.
     */
    atualizaValores(){
        this.setState({
            fila: f.fila,
            inicioFila: f.begin,
            fimFila: f.end
        });
    }

    /**
     * Método que chama o enfileirar da classe Fila, concretizando o funcionamento.
     */
    enfileirar(){
        //Se o valor inserido pelo usuário é válido
        if(!this.state.valor == ''){
            //Se é possível enfileirar o novo valor
            if(f.enfileira(this.state.valor)){
                this.setState({valor: ''});
                this.atualizaValores();
            }
            else{
                Toast.showWithGravity("O sentinela foi alcançado.\nNão é possível inserir mais elementos.",
                Toast.LONG, Toast.CENTER);
            }
        }
        else{
            Toast.showWithGravity("Pelo menos um valor deve ser inserido no campo.",
            Toast.LONG, Toast.CENTER);
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

    render(){
        return(
            <View>
                <View style={Theme.mainContainer}>
                    <TextInput
                    placeholder = 'Insira o elemento'
                    placeholderTextColor = '#31736f'
                    style={Theme.inputUser}
                    onChangeText={text => this.setState({valor: text})}
                    value={this.state.valor}
                    />

                    <TouchableOpacity 
                    style={Theme.btnStyle}
                    onPress={this.enfileirar}>
                            <Text style={Theme.btnTextStyle}>Enfileirar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={Theme.btnStyleDeQueue}
                    onPress={this.desenfileirar}>
                            <Text style={Theme.btnTextStyle}>Desenfileirar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[Theme.btnStyle,
                    {
                    marginBottom: windowHeight*.01,
                    marginLeft: windowWidth*.20}]}
                    onPress={this.busca}>
                            <Text style={Theme.btnTextStyle}>Buscar</Text>
                    </TouchableOpacity>
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
                style={{padding: 10, height: windowHeight*.5}}>
                    {
                        //Renderiza toda a fila.
                        this.state.fila.map( (valores, index) => {
                            return(
                                <Elemento key={index} indexElemento={index}>{valores}</Elemento>
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
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: windowWidth*.06
    }
}
);
