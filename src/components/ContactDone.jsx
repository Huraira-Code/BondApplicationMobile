import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../API/API';
BASE_URL;
const ContactDone = ({id, name ,  callFunction, DoneFunction}) => {
  function handleClick() {
    callFunction(false);
  }

  function DoneSwitch() {
    console.log('this is doneswitch');
    DoneFunction();
  }
  const markAsDone = async id => {
    const token = await AsyncStorage.getItem('token'); // Replace with your key
    console.log(token);
    console.log('this is the result id coming from north', id);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/markasdone/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT in the headers
          },
        },
      );
      console.log('this is the response', response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: '40%',
        marginHorizontal: 10,
        padding: 20,
        flex: 1,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
      }}>
      <Material
        style={{color: '#FA8055'}}
        name="message-text-clock"
        size={40}></Material>
      <TouchableOpacity onPress={() => handleClick()}>
        <Entypo
          style={{position: 'relation', left: 140, fontSize: 30, bottom: 50}}
          name="cross"
          onPress={() => handleClick()}></Entypo>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 16,
          color: 'black',
          marginBottom: 10,
          marginTop: -25,
        }}>
        Got in touch with {name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-light',
          fontSize: 13,
          textAlign: 'left',
        }}>
        Mark the task as completed if you got in touch with the selected contact
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#FA8055',
          width: '100%',
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => {
          handleClick();
          markAsDone(id);
          DoneSwitch();
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins-light',
            color: 'white',
            fontSize: 14,
          }}>
          Mark as Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactDone;

const styles = StyleSheet.create({});
