import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomButton from '../../components/OwnButton';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Index = () => {
  const navigation = useNavigation();
  const handleUsersPress = () => {
    navigation.navigate('Users');
  };

  const handleRandomUserPress = () => {
    console.log('Random user');
  };
  return (
    <View style={{...styles.home, width: windowWidth, height: windowHeight}}>
      <CustomButton title="User list" onPress={handleUsersPress} />
      <CustomButton title="Randomize user" onPress={handleRandomUserPress} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  home: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#C6BFEA',
  },
});
