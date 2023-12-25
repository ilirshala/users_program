/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Index from './src/screens/Index';
import Users from './src/screens/Users';
import User from './src/screens/User';
import {getUsers} from './src/actions/getUsers.action';
import {useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7A7AEE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{title: 'Index'}}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={({navigation, route}) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.container}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          options={({navigation, route}) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.container}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            ),
          })}
          name="User"
          component={User}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#615FCF',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
