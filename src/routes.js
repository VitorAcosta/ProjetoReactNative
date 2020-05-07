import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Seção de imports para as páginas que compõem a aplicação.
import Home from './pages/home';
import Ldde from './pages/ldde';
import Fce from './pages/fec';

//Configurador para o navegador de páginas.
const Stack = createStackNavigator();

export default function Routes(){
    return(
        //NavigationContainer garante a correta estruturação da navegação entre as páginas.
        /**
         * No <Stack.navigator> podemos utilizar, na opção screenOptions, o headerShown=false que
         * desabilita a barra entre as telas. 
         */
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{
                    headerShown:false
                }}                    
                    name ="home" component={Home}/>

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
            </Stack.Navigator>                 
        </NavigationContainer>
    );
}