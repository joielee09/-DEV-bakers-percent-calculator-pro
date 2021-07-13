import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, TextInput, Image, Alert, Modal } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Text = styled.Text`
  font-size: 15px;
  font-family : 'PoorStory';
`;

const AlertModalWrapper = styled.View`
  height: ${HEIGHT*0.1}px;
  width: ${HEIGHT*0.2*1.6}px;
  background-color: #fff;
  margin-top: ${HEIGHT*0.15}px;
  margin-right: auto;
  margin-left: auto;
`;
const AlertModalTextContainer = styled.View`
  background-color: lightyellow;
  flex:1;
  align-items:center;
  marginTop: ${HEIGHT*0.03}px;
`;

export default ModalComponent = (cur) => {
    console.log("input cur in Modal: ", cur)

    const [visible, setVisible] = useState(cur[0])

    const loadAssets = () => {}
    const onFinish = () => setVisible(true)
    
    return visible?(
        <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        >
        <AlertModalWrapper>
        <Pressable
            onPress={
            ()=> setVisible(!visible)
            }
        >
        <AlertModalTextContainer><Text>{cur[1]}</Text></AlertModalTextContainer>
        </Pressable>
        </AlertModalWrapper>
        </Modal>
    ) : (
        <AppLoading 
            startAsync={loadAssets}
            onFinish={onFinish}
            onError={console.warn}
        />
    )
}

