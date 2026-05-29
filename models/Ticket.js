import { v4 as uuidv4 } from 'uuid';
import {generateQR} from "../utils/qr.js"

export default class Ticket {
  constructor(nombre, email, token = null, usada = false) {
    this.nombre = nombre;
    this.email = email;
    this.token = token;
    this.usada = usada;
  }

  // Un ticket es valido cuando tiene token y no ha sido usado
  esValido() {
    return this.token && !this.usada;
  }
  
  async generarQR() {
    const text = this.urlValidacion();
    let qr = await generateQR(text);
    return qr;
  }

  urlValidacion() {
    return `http://localhost:3000/validate/${this.token}`;
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