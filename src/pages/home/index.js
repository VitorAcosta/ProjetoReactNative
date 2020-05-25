import React, {useRef} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import { View, Text, ScrollView,
         StyleSheet, Image,
         Animated, TouchableOpacity } from 'react-native';

import {windowWidth, windowHeight, cardInfo} from '../Constants';


export default function Home({navigation}){
  const scrollX = useRef(new Animated.Value(0)).current;

  return(
    <View style={Theme.cardContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: {
                 contentOffset: {
                   x: scrollX
                  }
                }                
              }],
              {useNativeDriver: false} 
              )
          }
          scrollEventThrottle={1}
        >
        { /**
            * Renderização dos cards, percorrendo todos os dados no objeto cardInfo.
            * Através do map acessamos cada valor individualmente, sendo possível renderizar
            * todas informações dos cards. 
            */
          cardInfo.map( (values, index) => {
          return(
            <View style={Theme.cardStructure} key={values.id}>
              <Image source={values.image} style={Theme.image}/>  
              <View style={Theme.headerStyle}>
                <Text style={Theme.cardTitle}>{values.title}</Text>
                <Text style={Theme.cardSubtitle}>{values.subtitle}</Text>
              </View>
              <Text style={Theme.paragraph}>{values.text}</Text>
              {
                /**
                 * Verificação da necessidade de renderizar o botão no card.
                 */
              (values.btnOn === true)? 
                <TouchableOpacity
                onPress={() => navigation.navigate(values.toScreen)}
                style={Theme.btnStyle}>
                  <Text style={Theme.btnTextStyle}>{values.textBtn}</Text>
                </TouchableOpacity>
                :null}
          </View>
          )
        })
        }
        </ScrollView>
        <View style={
          {flexDirection: 'row', justifyContent: 'center', backgroundColor: '#98c6a9', marginBottom: windowHeight*.05}
          }>
          {cardInfo.map( (values, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1)
              ],
              outputRange: [14, 22, 14],
              extrapolate: 'clamp',
              useNativeDriver: false
            });
            return(
              <Animated.View
                key={(index)}
                style={
                [ Theme.dotsStyle,
                { width: width }
                ]}
              />
            )
          })}
        </View>
      </View>
  );
}

const Theme = StyleSheet.create(
  {    
    cardContainer:{
      flex:1,
      backgroundColor: '#98c6a9',
      width: windowWidth,
      height: windowHeight
    },  
    cardStructure:{
      //Style
      backgroundColor: '#cde8d9',
      width: windowWidth*.90,
      height: windowHeight*.70,
      borderRadius: 22,
      marginHorizontal: windowWidth*.05,
      marginTop: windowHeight*.10,
      //Flexbox config
      flex: 1,
      alignItems: 'center'
    },
    image: {
      width: windowWidth*.90,
      height: windowHeight*.30,
      resizeMode: 'center',
      padding: 20,
      opacity: 0.9
    },
    headerStyle:{
      //Style
      width: windowWidth*.90,
      padding: 10,
      backgroundColor: 'rgba(54,116,105,0.3)',
      marginBottom: '5%',
      position: "absolute",
      marginTop: '40%'
    },
    cardTitle:{
      //Style
      fontSize: RFValue(26),
      fontWeight: 'bold',
      color: '#FFF',
      textShadowColor: 'rgba(0, 0, 0, 0.35)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5
    },
    cardSubtitle:{
      //Style
      fontSize: RFValue(20),
      fontWeight: 'bold',
      color: '#FFF'
    },
    paragraph:{
      //Style
      fontSize: RFValue(18),
      textAlign: "center",
      color: '#085253',
      marginTop: '15%'
    },
    dotsStyle:{
      //Style
      width: 14,
      height: 14,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#085253',
      backgroundColor: '#cde8d9',
      marginHorizontal: 10
    },
    btnStyle:{
      //Flexbox
      alignItems: 'center',
      //Style
      position: 'absolute',
      backgroundColor: '#31736f',
      borderRadius: 18,
      padding: 10,
      width: windowWidth*.6,
      marginTop: windowHeight*.66
    },
    btnTextStyle:{
      fontSize: RFValue(18),
      color: '#FFF'
    }
  }
);