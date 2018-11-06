import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  user = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService) {
  }
  
  esqueciMinhaSenha() {
    const toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    if (this.form.form.valid){
      this.authService.resetPassword(this.user.email)
      .then(()=>{
        toast.setMessage('Foi enviado um e-mail para redefinição da senha.');
        toast.present();
        this.navCtrl.pop();
      })
      .catch(err => {
        if(err.code == "auth/invalid-email") {
          toast.setMessage('o email digitado é inválido.');
        }
        else if(err.code == "auth/user-not-found") {
          toast.setMessage('Usuário não encontrado.');
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
