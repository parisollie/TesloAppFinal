import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductScreen } from '../screens/product/ProductScreen';

//paso 1.9
export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: { productId: string };
};
//paso 1.8,codigo del state navigator
const Stack = createStackNavigator<RootStackParams>();

//V-295,Paso 1.41
const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

//V-291,paso 1.7,creamos el archivo
export const StackNavigator = () => {
  return (
    <Stack.Navigator
      //paso 1.10,ponemos las rutas
      initialRouteName="LoadingScreen"
      //Paso 1.12,ponemos el headerShown en false
      screenOptions={{
        headerShown: false,
        //Paso 1.42, esto es para manera global
        // cardStyleInterpolator: fadeAnimation,
      }}>
      <Stack.Screen
        //Paso 1.43,le ponemos el  cardStyleInterpolator: fadeAnimation
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
