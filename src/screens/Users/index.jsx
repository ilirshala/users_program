/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Users = () => {
  const navigation = useNavigation();
  const [search, onChangeSearch] = useState('');
  const [filteredBySearch, setFilteredBySearch] = useState([]);
  const [usersState, setUsersState] = useState(null);
  const {users, isLoading, success} = useSelector(
    state => state.getUserReducer,
  );
  const [isOrange, setIsOrange] = useState(false);

  const handleColorToggle = () => {
    setIsOrange(prevState => !prevState);
  };

  const handleUserDetails = id => {
    navigation.navigate('User', {id});
  };

  useEffect(() => {
    if (success && users) {
      setUsersState(JSON.parse(users));
    }
  }, [users, success]);

  useEffect(() => {
    if (usersState) {
      setFilteredBySearch(usersState);
    }
  }, [usersState]);

  const handleSearchUser = text => {
    onChangeSearch(text);

    if (usersState) {
      const filtered = usersState?.filter(
        user =>
          user.name.first.toLowerCase().includes(text.toLowerCase()) ||
          user.name.last.toLowerCase().includes(text.toLowerCase()) ||
          (user.location.city &&
            user.location.city.toLowerCase().includes(text.toLowerCase())),
      );
      setFilteredBySearch(filtered);
    }
  };

  const renderUserItem = ({item}) => (
    <TouchableOpacity
      style={{
        ...styles.userItem,
        backgroundColor: isOrange ? 'orange' : '#f4f4f4',
      }}
      onPress={() => handleUserDetails(item.login.uuid)}>
      <Image
        source={{uri: item.picture?.thumbnail || item?.picture?.medium}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <View style={{marginLeft: 10}}>
        <Text
          style={{
            color: 'black',
          }}>{`${item?.name?.first} ${item?.name?.last}`}</Text>
        <Text style={{color: 'black'}}>{item?.location?.city}</Text>
        <Text style={{color: 'black'}}>{item?.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.users}>
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearchUser}
          value={search}
          placeholder="Search user"
        />
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isOrange ? 'orange' : '#f4f4f4'},
          ]}
          onPress={handleColorToggle}>
          <Text
            style={{
              ...styles.buttonText,
              color: isOrange ? 'white' : 'orange',
            }}>
            {isOrange ? 'Normal' : 'Orange'}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredBySearch}
          renderItem={renderUserItem}
          keyExtractor={item => item.login?.uuid}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>No users found</Text>
          )}
        />
      )}
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
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '90%',
    margin: 'auto',
    marginHorizontal: 20,
  },
  searchHeader: {
    flexDirection: 'row',
  },
  button: {
    height: 40,
    margin: 12,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});
