import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Seção de imports para as páginas que compõem a aplicação.
import Home from './pages/home';
import Ldde from './pages/ldde';
import Fce from './pages/fec';
import SimulacaoFce from './pages/simFec';

//Configurador para o navegador de páginas.
const Stack = createStackNavigator();

export default function Routes(){
    return(
        //NavigationContainer garante a correta estruturação da navegação entre as páginas.
        <NavigationContainer>
            <Stack.Navigator>

                {/** Tela inicial da aplicação */ }
                <Stack.Screen options={{
                    headerShown:false
                }}                    
                    name ="home" component={Home}/>

                {/** Tela sobre a documentação de LDDE */ }
                <Stack.Screen options={{
                        headerStyle:{
                            backgroundColor: '#cde8d9',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTintColor: '#0c5053',
                        title: ''
                    }}
                    name ="ldde" component={Ldde}/>

                {/** Tela sobre a documentação da Fila Estática Circular */ }
                <Stack.Screen options={{
                        headerStyle:{
                            backgroundColor: '#cde8d9',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTintColor: '#0c5053',
                        title: ''
                    }}
                    name ="fce" component={Fce}/>

                {/** Tela da simulação sobre Fila Estatica Circular */ }
                <Stack.Screen options={{
                        headerStyle:{
                            backgroundColor: '#cde8d9',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTintColor: '#0c5053',
                        title: 'Simulação Fila Estática Circular'
                    }}
                    name ="simFce" component={SimulacaoFce}/>
            </Stack.Navigator>                 
        </NavigationContainer>
    );
}