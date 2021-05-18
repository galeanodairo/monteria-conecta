import { Component, OnInit } from '@angular/core';
import {EmpleadoService} from '../../services/empleado.service';
import {NgForm} from '@angular/forms'
import { empleado } from 'src/app/models/empleadoModel';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor(public servicioEmpleado:EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpledos();
  }
  addEmpleado(form:NgForm){
    if(form.value._id){
      this.servicioEmpleado.updateEmpleado(form.value).subscribe(
        res=>console.log(res),
        err=>console.error(err)
      );
      form.reset();
    }else{
      this.servicioEmpleado.crearEmpleado(form.value).subscribe(
        res=>{
          this.getEmpledos();
          form.reset();
        },
        err=>{
          console.error(err);
        }
      )
    }

  }
  editEmpleado(empleado:empleado){
    this.servicioEmpleado.datosEmpleado=empleado;
  }
  
  deleteEmpleado(id:string){
    const res=confirm('Desea borrar el empleado');
    if(res){
      this.servicioEmpleado.deleteEmpleado(id).subscribe(
        res=>{
          console.log(res);
          this.getEmpledos();
        },
        err=>console.error(err)
      );
    }
  }
  getEmpledos(){
    this.servicioEmpleado.getEmpleados().subscribe(
      res=>{
        this.servicioEmpleado.listaEmpleado=res;
      },
      err=>console.error(err)
    )
  }

}
