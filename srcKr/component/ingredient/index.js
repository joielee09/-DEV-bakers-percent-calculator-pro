import React from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, Pressable } from 'react-native';

import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

// background-Color: blue;
const Wrapper = styled.View`
  height: 0px;
  width: ${WIDTH*0.8}px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px;
  background-Color: lightyellow;
`;
const Text = styled.Text`
  font-size: 15px;
  font-family: 'PoorStory';
  width: ${WIDTH*0.18}px;
`;
const NameText = styled.Text`
  font-size: 15px;
  font-family: 'PoorStory';
  width: ${WIDTH*0.22}px;
`;

const Ingredient = ( cur ) => {
  // console.log("cur: ", cur);

  const loadAssets = () => {}
  const onFinish = () => {}
  // const [loaded, setLoaded] = useState(false);


  const deleteItem = () => {
    store.dispatch({
      type: 'deleteIgd',
      value: cur.cur.inputName
    })
    if (cur.cur.flourInput && cur.cur.inputGram) {
      flourStore.dispatch({
        type:'removeFlour',
        value:{
          "flour":cur.cur.inputGram
        }
      })
    }
  }
  
  const [loaded] = Font.useFonts({
    'PoorStory': require('../../../assets/fonts/Delius-Regular.ttf'),
    'PoorStory': require('../../../assets/fonts/PoorStory-Regular.ttf'),
  });

  if(loaded){
  return (
    <Wrapper>
      <NameText>{cur.cur.inputName}</NameText>
      <Text>{cur.cur.inputGram}(g)</Text>
      <Text>{cur.cur.percentage}(%)</Text>
      <Text>{cur.cur.targetGram}(g)</Text>



    </Wrapper>
  )} else {
    return(
      <AppLoading 
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
}

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);