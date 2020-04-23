import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private updateZombies$ = new Subject<any>();
  zombiesObservable = this.updateZombies$.asObservable();

  private updateCerebros$ = new Subject<any>();
  cerebrosObservable = this.updateCerebros$.asObservable();
  id: any;
  flavor: any;
  iq: any;
  description: any;
  picture: any;
  logeado = false;
  logedUser: any;
  zombie = ['id', 'Nombre', 'Email', 'usuario'];
  cerebro = ['id', 'Sabor', 'IQ', 'Descripcion', 'Imagen', 'usuario'];

  // tslint:disable-next-line: variable-name
  constructor(private _client: HttpClient) { }

  async obtenerZombies() {
    const zombies = await this._client.get<any>(apiUrl + 'zombies');
    this.updateZombies$.next(zombies);
    return zombies;
  }

  agregarZombie(nombre: string, email: string, tipo: string, usuario: string) {
    const nuevoZombie = {
      name: nombre,
      email,
      type: tipo,
      usuario
    };

    return this._client.post(apiUrl + 'zombies/nuevo', nuevoZombie);
  }
  actualizarZombie(nombre: string, email: string, tipo: string, usuario: string, id: string) {
    const Zombie = {
      name: nombre,
      email,
      type: tipo,
      usuario
    };
    return this._client.put(`${apiUrl}zombies/edit/${id}`, Zombie);
  }

  eliminarZombie(id) {
    return this._client.delete(`${apiUrl}zombies/delete/${id}`);
  }

  async obtenerCerebros() {
    const cerebros = await this._client.get<any>(apiUrl + 'cerebros');
    return this.updateCerebros$.next(cerebros);
  }

  agregarCerebro(sabor: string, descripcion: string, iq: string, imagen: string, usuario: string) {
    const nuevoCerebro = {
      flavor: sabor,
      description: descripcion,
      iq,
      picture: imagen,
      usuario
    };
    return this._client.post(apiUrl + 'cerebros/nuevo', nuevoCerebro);
  }

  actualizarCerebro(sabor: string, descripcion: string, iq: any, imagen: string, usuario: string, id: any) {
    const Cerebro = {
      flavor: sabor,
      description: descripcion,
      iq,
      picture: imagen,
      usuario
    };
    return this._client.put(`${apiUrl}cerebros/edit/${id}`, Cerebro);
  }

  eliminarCerebro(id) {
    return this._client.delete(`${apiUrl}cerebros/delete/${id}`);
  }

  registrarUsuario(nombre, email, contraseña, tipo, imagen) {
    const nuevoUser = {
      name: nombre,
      email,
      password: contraseña,
      type: tipo,
      picture: imagen
    };
    return this._client.post(apiUrl + 'usuarios/nuevo', nuevoUser);
  }

  login(email, contraseña) {
    const usuario = {
      email,
      password: contraseña
    };
    return this._client.post(apiUrl + 'usuarios/login', usuario);
  }
  Usuario() {
    return this._client.get(apiUrl + 'usuarios/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('resultado'))
    });
  }

  agregarPedido(sabor: string, entrega: string, cantidad: string, fechaPedido: string, fechaEntrega: string, usuario: string) {
    const nuevoPedido = {
      flavor: sabor,
      entrega,
      cantidad,
      fechaPedido,
      fechaEntrega,
      usuario
    };
    return this._client.post(apiUrl + 'pedidos/nuevo', nuevoPedido);
  }
}
