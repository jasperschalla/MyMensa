import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './components/Home';
import { Food } from "./components/Food";

const Stack = createNativeStackNavigator();

export default function App() {

  const headerOptions = {
    headerStyle:{
      backgroundColor: "#2E2E31",
    },
    headerTintColor:"#fff"
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{...headerOptions,title:"Mensa"}}     
        >
        </Stack.Screen>
        <Stack.Screen
        name="Food"
        component={Food}
        options={({ route }) => ({...headerOptions,title:route.params.name})}   
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
