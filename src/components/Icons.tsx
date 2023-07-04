import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

type props = {
  name:string
}

const Icons = (props:props) => {
  switch (props.name){
    case 'circle' :
      return(
         <FontAwesome name="circle-o" size={80} color="#79CADC" />)
      break;
    case 'cross' :
      return <FontAwesome name="close" size={80} color="#3A98D4" />
      break;
    case 'edit' :
      return <FontAwesome name="square" size={80} color="#fff" />
      break;
  }

}

export default Icons