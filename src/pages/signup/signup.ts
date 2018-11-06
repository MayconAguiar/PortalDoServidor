import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,     
    private toastCtrl: ToastController,
    private authService: AuthService) {
  }

  createAccount() {
    if (this.form.form.valid) {

      const toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
      this.authService.createUser(this.user)
      .then((user: any) => {
        toast.setMessage('Usuário criado com sucesso.');
        toast.present();
        this.navCtrl.pop();
      })
      .catch(err => {
        if (err.code == "auth/email-already-in-use") {
          toast.setMessage('O email digitado já está em uso.');

        } else if(err.code == "auth/invalid-email") {
          toast.setMessage('o email digitado é inválido.');
        }
        else if(err.code == "auth/operation-not-allowed") {
          toast.setMessage('Não está habilitado criar usuários.');
        }
        else if(err.code == "auth/weak-password") {
          toast.setMessage('A senha digitada é muito fraca.');
        }        
        toast.present();
      });
      
      
    }
  }

}
