import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators  } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

import  {ServiceBBDDService} from './../BBDD/service-bbdd.service'
import Login_usuario from './../DTO/login_user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



    public user_login: Login_usuario  = {   
      username:'',
      password:''
      
    }
    public validation={       
      nombre:true,
      password:true,
    
    }  

    public token:string='';    
    public res:boolean=true;    
    public login: FormGroup;
    public proceso:any;
    public respuesta:any;
    public cookieValue:any;

constructor(
  private serviceBBDDService:ServiceBBDDService,
  private cookieService:CookieService  
    ){  
      this.login = this.createFormGroup();  
    }

  
createFormGroup(){
    return new FormGroup({     
      nombre: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]{4,30}$')]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)]), 
          })
  }

  

  loginUsuario(user_login: Login_usuario){ 
    this.proceso = this.proceso+'  '+' loginUsuario() ';
    this.cookieService.delete('token');

    this.serviceBBDDService.postLogin(user_login).subscribe({
        next:(response:any) => {          
          console.log(response)
          this.cookieService.set('token',response.token);
        },
        error: (error:any) => {
          console.log(error)
        }
    })   

  };
 

  save(){
    this.proceso = this.proceso+'  '+' save() '
    let res = this.verifica(); 
    if(res ==true) {      
       this.loginUsuario(this.user_login)
    } 
    
  }

cancelar(){
    this.user_login.username ='';
    this.user_login.password =''; 
    this.login.reset();  
}







verifica(): any{
  this.proceso = this.proceso+'  '+' verifica() '
  this.res=true;


  if(this.login.controls['nombre'].invalid){    
    this.validation.nombre = false;
    this.res=false;
  }else{    
    this.validation.nombre = true;
    this.user_login.username = this.login.get('nombre')?.value;
  }
 
  if(this.login.controls['password'].invalid){    
    this.validation.password = false;
    this.res=false;
  }else{    
    this.validation.password = true;
    this.user_login.password = this.login.get('password')?.value;
  }
  
  return this.res;

}


}
