import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators  } from '@angular/forms';

import Registro_user from '../DTO/registroUser'
import  {ServiceBBDDService} from './../BBDD/service-bbdd.service'

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent {

  public registro_user: Registro_user = {
    email: '',
    username:'',
    password:'',
    roles:[]
  }
  public user_validation={
    email: true,
    nombre:true,
    password:true,
    rol:true
  }


  
  public res:boolean=true;
  
  public crear_user: FormGroup;


constructor(
  private serviceBBDDService:ServiceBBDDService
){  
  this.crear_user = this.createFormGroup();  
}

  
createFormGroup(){
    return new FormGroup({     
      email: new FormControl('',[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      nombre: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]{4,30}$')]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]), 
      rol: new FormControl('',[Validators.required])  
    })
  }

  


  save(){
    //Arturo@gmail.com_Password1*
      let res = this.verifica();
      
      if(res ==true)
      {
        this.serviceBBDDService.postCrearUser(this.registro_user).subscribe({
          next:(response:any) => {  
           
            console.log(response)
          
          },
          error: (error:any) => {
            console.log(error)
          }
        });
      }    
    }



cancelar(){   
    this.registro_user.email ='';
    this.registro_user.username ='';
    this.registro_user.password ='';
    this.registro_user.roles;
    this.crear_user.reset();    
  }






verifica(): any{

  this.res=true;

              if(this.crear_user.controls['email'].invalid){    
                this.user_validation.email = false;
                this.res=false;
              }else{    
                this.user_validation.email = true;
                this.registro_user.email = this.crear_user.get('email')?.value;
              }

              if(this.crear_user.controls['nombre'].invalid){    
                this.user_validation.nombre = false;
                this.res=false;
              }else{    
                this.user_validation.nombre = true;
                this.registro_user.username = this.crear_user.get('nombre')?.value;
              }
            
              if(this.crear_user.controls['password'].invalid){    
                this.user_validation.password = false;
                this.res=false;
              }else{    
                this.user_validation.password = true;
                this.registro_user.password = this.crear_user.get('password')?.value;
              }
                
              if(this.crear_user.get('rol')?.value ==''){   
                this.user_validation.rol = false;
                this.res=false;
              }else{    
                this.user_validation.rol = true;
                this.registro_user.roles = [this.crear_user.get('rol')?.value];
              }

  
          return this.res;

}


}
