import { create } from 'zustand';
import { User } from '../../../domain/entities/user';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authCheckStatus, authLogin } from '../../../actions/auth/auth';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';


//V-299,Paso 2.9
export interface AuthState {
  //Paso 2.11Ponemos las propiedades, estado de la autenticacion
  status: AuthStatus;
  token?: string;
  user?: User;

  //Paso 2.12,regresamos un valor booleano
  login: (email: string, password: string) => Promise<boolean>;
  //V-302,Paso 2.38 para checar que el token sea correcto.
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

//Pas 2.13,ponemos el set y get 
export const useAuthStore = create<AuthState>()((set, get) => ({
  //Paso 2.14, el estado inicials era chequeking por defecto
  status: 'checking',
  token: undefined,
  user: undefined,

  //Paso 2.15
  login: async (email: string, password: string) => {
    //Tomamos la respues que viene del await
    const resp = await authLogin(email, password);
    if (!resp) {
      //Sabemos que no esta atutenticado el usuario
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      //Paso 2.16
      return false;
    }
    //Imprimimos la respuesta
    //console.log({ resp });

    //V-301,paso 2.34
    await StorageAdapter.setItem('token', resp.token);
    /*Checar que se guardo el token
    const storeToken = await StorageAdapter.getItem('token');
    console.log({storeToken});*/


    //Paso 2.17 Si todo sale bien y tenemos una respuesta
    set({ status: 'authenticated', token: resp.token, user: resp.user });


    return true;
  },

  //Paso 2.39
  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },

  //V-304,Paso 2.43
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  }


}))

