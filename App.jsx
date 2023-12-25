/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from './src/actions/getUsers.action';

function App() {
  const {users} = useSelector(state => state.getUserReducer);
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const renderUserItem = ({item}) => (
    <View style={{flexDirection: 'row', padding: 10}}>
      <Image
        source={{uri: item.picture?.thumbnail || item?.picture?.medium}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <View style={{marginLeft: 10}}>
        <Text>{`${item?.name?.first} ${item?.name?.last}`}</Text>
        <Text>{item?.location?.city}</Text>
        <Text>{item?.email}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Hello World 12345</Text>
      <FlatList
        data={JSON.parse(users)}
        renderItem={renderUserItem}
        keyExtractor={item => item.login?.uuid}
      />
    </SafeAreaView>
  );
}

export default App;
