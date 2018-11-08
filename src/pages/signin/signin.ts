import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  user = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService) {
  }

  novoUsuario() {
    this.navCtrl.push(SignupPage);
  }

  esqueciMinhaSenha() {
    this.navCtrl.push(ResetpasswordPage);
  }

  signin() {

    const toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    if (this.form.form.valid){
      this.authService.signin(this.user)
      .then(()=> this.navCtrl.setRoot(HomePage))
      .catch(err => {
        if(err.code == "auth/invalid-email") {
          toast.setMessage('o email digitado é inválido.');
        }
        else if(err.code == "auth/user-disabled") {
          toast.setMessage('Usuário desabilitado.');
        }
        else if(err.code == "auth/user-not-found") {
          toast.setMessage('Usuário não encontrado.');
        }
        else if(err.code == "auth/wrong-password") {
          toast.setMessage('Senha inválida.');
        }
        else {
          toast.setMessage('Ocorreu um problema.');
          console.log(err);
        }
        toast.present();
      });


    }
  }
}
