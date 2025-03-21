import 'react-native-gesture-handler';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

//V-290,paso 1.0, creamos el PdouctsApp
export const ProductsApp = () => {
  //V-292,paso 1.14
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  //Paso 1.40
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];

  return (
    <QueryClientProvider client={queryClient}>
      {/*Paso 1.15 ponemos el IconRegistry*/}
      <IconRegistry icons={EvaIconsPack} />
      {/*
         V-292,paso 1.13,envolvemos la applicacion de los themas de kitten*/}
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          /* V-295,Paso 1.39, le ponemos[theme={theme}], el tam acordado con esto nos evitamos
          un flash blanco*/
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
          }}>
          <AuthProvider>
            {/*V-291,paso 1.11,ponemos el stack navigator */}
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};
