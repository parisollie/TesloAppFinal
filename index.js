/**
 * @format
 */

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import { ProductsApp } from './src/ProductsApp';

//V-290,paso 1.1 
AppRegistry.registerComponent(appName, () => ProductsApp);
