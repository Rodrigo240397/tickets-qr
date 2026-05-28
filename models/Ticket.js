export default class Ticket {
  constructor(nombre, email, token,usada) {
    this.nombre = nombre;
    this.email = email;
    this.token = token;
    this.usada = usada;
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