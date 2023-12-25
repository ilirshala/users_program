import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const User = ({route}) => {
  const {users} = useSelector(state => state.getUserReducer);
  const {id} = route.params;
  const [findedUser, setFindedUser] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const findedUserById = JSON.parse(users)?.find(
      user => user.login.uuid === id,
    );
    if (findedUserById) {
      setFindedUser(findedUserById);
    } else {
      setError(true);
    }
  }, [id]);
  return (
    <View style={styles.user}>
      {error ? (
        <Text>Not found any user with this id: {id}</Text>
      ) : (
        <>
          <Image
            source={{
              uri: findedUser.picture?.thumbnail,
            }}
            style={styles.userImage}
          />
          <View style={styles.userInformation}>
            <View style={styles.information}>
              <Text style={styles.description}>First name</Text>
              <Text style={styles.detail}>{findedUser?.name?.first}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.description}>Last name</Text>
              <Text style={styles.detail}>{findedUser?.name?.last}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.description}>Username</Text>
              <Text style={styles.detail}>{findedUser?.login?.username}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.description}>Country/City</Text>
              <Text style={styles.detail}>
                {findedUser?.location?.country},{findedUser?.location?.city}
              </Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.description}>State/Province</Text>
              <Text style={styles.detail}>{findedUser?.location?.state}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.description}>Postcode</Text>
              <Text style={styles.detail}>
                {findedUser?.location?.postcode}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  user: {
    flex: 1,
    backgroundColor: '#C6BFEA',
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 200,
    marginTop: 20,
    marginBottom: 50,
  },
  userInformation: {
    flex: 1,
    width: '100%',
  },
  information: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '90%',
    marginHorizontal: 16,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#7A7AEE',
  },
  detail: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
});
