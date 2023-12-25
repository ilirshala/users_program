/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers} from '../../actions/getUsers.action';

const Users = () => {
  const dispatch = useDispatch();
  const [search, onChangeSearch] = useState('');
  const {users} = useSelector(state => state.getUserReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const renderUserItem = ({item}) => (
    <TouchableOpacity style={styles.userItem}>
      <Image
        source={{uri: item.picture?.thumbnail || item?.picture?.medium}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <View style={{marginLeft: 10}}>
        <Text>{`${item?.name?.first} ${item?.name?.last}`}</Text>
        <Text>{item?.location?.city}</Text>
        <Text>{item?.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.users}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearch}
        value={search}
        placeholder="Search user"
      />
      <FlatList
        data={JSON.parse(users)}
        renderItem={renderUserItem}
        keyExtractor={item => item.login?.uuid}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  users: {
    flex: 1,
    backgroundColor: '#C6BFEA',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#7A7AEE',
  },
  userItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginTop: 10,
    borderRadius: 10,
    width: '90%',
    margin: 'auto',
    marginHorizontal: 20,
  },
});
