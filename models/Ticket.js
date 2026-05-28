import {v4 as uuidv4} from 'uuid';

export default class Ticket {
  constructor(nombre, email, token = null, usada = false) {
    this.nombre = nombre;
    this.email = email;
    this.token = token;
    this.usada = usada;
  }
  
  generarToken() {
    if (!this.token) {
      this.token = uuidv4();
    }
  }

  marcarUsada() {
    this.usada = true;
  }

  // Getters
  getNombre() {
    return this.nombre;
  }

  getEmail() {
    return this.email;
  } 

  getToken() {
    return this.token;
  }

  getUsada() {
    return this.usada;
  }

}