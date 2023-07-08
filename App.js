import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Login from './components/auth/Login';
import Home from './components/base/Home';
import Profile from './components/base/Profile';
import AddTransaction from './components/base/subcomponent/AddTransaction';
import Detail from './components/base/subcomponent/Detail';
import UpdateTransaction from './components/base/subcomponent/UpdateTransaction';
import UpdateProfile from './components/base/subcomponent/UpdateProfile';


//tab navigator

const App = () => {
  const Stack = createNativeStackNavigator();
 
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ADD" component={AddTransaction} options={{
          headerTitle:"Add New Entry"
        }}/>
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="Update" component={UpdateTransaction}/>
        <Stack.Screen name="UpdateProfile" component={UpdateProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
