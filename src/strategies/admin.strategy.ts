import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Cliente, ClienteRelations} from '../models';
import {AutenticacionService} from '../services';



export class EstrategiaAdministrador implements AuthenticationStrategy{
  name: string = 'admin';

constructor(
  @service(AutenticacionService)
  public servicioAutenticacion: AutenticacionService
){

}
  GenerarClave() {
    throw new Error('Method not implemented.');
  }
  CifrarClave(clave: string) {
    throw new Error('Method not implemented.');
  }
  IdentificarCliente(usuario: string, clave: string): false | Promise<(Cliente & ClienteRelations) | null> {
    throw new Error('Method not implemented.');
  }
  GenerarTokenJWT(cliente: Cliente) {
    throw new Error('Method not implemented.');
  }
  ValidarTokenJWT(token: string) {
    throw new Error('Method not implemented.');
  }

async authenticate(request: Request): Promise<UserProfile | undefined>{
  let token = parseBearerToken(request);
  if(token){
    let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
    if(datos){
      if(datos.data){
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;

        }

      }else{
        throw new HttpErrors[401]("El Token incluido no es valido")
      }

    }else{
      throw new HttpErrors[401]("No se ha incluido el Token en la solicitud")

    }

  }

}
