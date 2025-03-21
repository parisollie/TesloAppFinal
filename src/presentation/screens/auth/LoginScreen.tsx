import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { API_URL, STAGE } from '@env';

//V-295,Paso 1.33
interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

//V-290,paso 1.2,creamos el archivo
//Paso 1.34,tomamos el({ navigation }: Props)y ya podemos navegar
export const LoginScreen = ({ navigation }: Props) => {

  //Paso 2.23,tomamos el login del store
  const { login } = useAuthStore();
  //Paso 2.27,para saber cuando hago un posteo
  const [isPosting, setIsPosting] = useState(false)

  //V-300,paso 2.18
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  //Paso 1.17, para las dimensiones del telefono de toda la pantalla
  const { height } = useWindowDimensions();

  /*V-296,paso 1.46,para saber que funciona
   console.log({API_URL,stage:STAGE});*/

  //Paso 2.19
  const onLogin = async () => {
    //Paso 2.24
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    //paso 2.28
    setIsPosting(true);
    //Paso 2.25
    const wasSuccessful = await login(form.email, form.password);
    //Paso 2.29
    setIsPosting(false);

    if (wasSuccessful) return;

    //Paso 2.26
    Alert.alert('Error', 'Usuario o contraseña incorrectos');

  }

  /*Los Layout son como los View ,pero en kitten */

  return (
    //V-293,Paso 1.16
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          {/*Paso 1.18 */}
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/*Paso 1.19 Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            //Paso 2.21,ponemos el value
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            //Paso 1.31, ponemos el ícono del emai.
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />

          {/*Paso 1.20 Password */}
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            //Paso 2.22,ponemos el password
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            //Paso 1.32, ponemos el ícono
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>


        {/*Paso 1.21 Space, con esto vamos separando. */}
        <Layout style={{ height: 10 }} />

        {/*Paso 1.22 Button */}
        <Layout>
          <Button
            //Paso 2.30,
            disabled={isPosting}
            //V-294,Paso 1.30,ponemos el ícono
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            //appearance="ghost",desaparece el botón y sólo quedan las letras.
            //paso 2.20,ponemos el la función onLogin
            onPress={onLogin}>Ingresar</Button>

        </Layout>

        {/*Paso 1.23 Información para crear cuenta e irse a nueva ventana */}
        <Layout style={{ height: 50 }} />

        {/*Paso 1.24,not ienes cuenta */}
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            //Paso 1.35, ponemos el navigate para navegar a la siguiente pantalla.
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            {' '}
            crea una{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
