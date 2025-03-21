import { tesloApi } from '../../config/api/tesloApi';
import { User } from '../../domain/entities/user';
import type { AuthResponse } from '../../infrastructure/interfaces/auth.responses';

//Paso 2.6
const returnUserToken = (data: AuthResponse) => {
  //Regresamos el usario
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  }

  //Paso 2.7
  return {
    user: user,
    token: data.token,
  }
}


//V-298,paso 2.0,autenticacion del ogin
export const authLogin = async (email: string, password: string) => {
  //Paso 2.8
  email = email.toLowerCase();

  //Paso 2.1
  try {
    //Paso 2.2,para hacer la autenticacion
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    //Paso 2.4,retornamos el dato
    return returnUserToken(data);


  } catch (error) {
    console.log(error);
    return null;
  }
};

//V-302,paso 2.35 checar que el token este bien 
export const authCheckStatus = async () => {

  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);

  } catch (error) {
    console.log({ error });
    return null;
  }

}
