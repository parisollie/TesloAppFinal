import { StyleSheet } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';

//V-294,Paso 1.25, creamos el archivo y definimos props.
interface Props {
  //Propiedades del icono
  name: string;
  color?: string;
  white?: boolean;
}

//V-294,Paso 1.26,desestrucramos las props
export const MyIcon = ({ name, color, white = false }: Props) => {

  //V-294,Paso 1.29, para poder cambiar el color del icono
  const theme = useTheme();
  //Si el icono esta en true
  if (white) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }

  //V-294,Paso 1.27
  return <Icon style={styles.icon} fill={color} name={name} />;
};

const styles = StyleSheet.create({
  //V-294,Paso 1.28
  icon: {
    width: 30,
    height: 30,
  },
});
