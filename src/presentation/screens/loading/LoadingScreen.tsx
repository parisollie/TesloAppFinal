import { Layout, Spinner } from '@ui-kitten/components';


//V-290,paso 1.5,creamos el archivo
export const LoadingScreen = () => {
  return (
    //V-303,Paso 2.40, cargamos el circulo que gira
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Spinner status="primary" size="large" />

    </Layout>
  )
}