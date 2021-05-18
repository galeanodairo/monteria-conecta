import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {empleado} from '../models/empleadoModel'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  URL_API="http://localhost:4000/api/employees";
  listaEmpleado:empleado[]=[];
  datosEmpleado:empleado={
    cargo: '',
    nombre: '',
    oficina: '',
    salario: 0
  }

  constructor(private http:HttpClient){
    
  }
  
  crearEmpleado(empleado:empleado){
    return this.http.post(this.URL_API, empleado);
  }
  getEmpleados(){
    return this.http.get<empleado[]>(this.URL_API);    
  }
  updateEmpleado(empleado:empleado){
    return this.http.put(`${this.URL_API}/${empleado._id}`, empleado);
  }
  deleteEmpleado(id:string){
    return this.http.delete(`${this.URL_API}/${id}`)
  }
}
