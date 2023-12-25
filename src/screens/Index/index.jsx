import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Index = () => {
  const navigation = useNavigation();
  const {users, success} = useSelector(state => state.getUserReducer);
  const [usersState, setUsersState] = useState(null);
  useEffect(() => {
    if (success && users) {
      setUsersState(JSON.parse(users));
    }
  }, [users, success]);
  const handleUsersPress = () => {
    navigation.navigate('Users');
  };

  const handleRandomUserPress = () => {
    if (usersState && usersState.length > 0) {
      const randomIndex = Math.floor(Math.random() * usersState.length);
      const randomUser = usersState[randomIndex];
      const id = randomUser.login.uuid;
      navigation.navigate('User', {id});
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'right',
    });
  }, [navigation]);
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
