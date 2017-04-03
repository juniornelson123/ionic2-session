import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { HomePage } from '../home/home';

import { User } from '../../models/user';
import { Session } from '../../config/session';

import { LoginService } from '../../providers/login-service'

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	form: FormGroup;
	user = new User;
	session = new Session;

	  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private loginService: LoginService) {

	  	this.initForm()
	  }

	  ionViewDidLoad() {
	    console.log('ionViewDidLoad LoginPage');
	  }

	  login(){
	  	
	  	this.user._id = 1
	  	this.user.name = "junior"
	  	this.user.email = this.form.value.email
	  	this.user.password = this.form.value.password
	  	this.user.token = "1234"
	  	this.user.status = "active"
		
		this.loginService.signIn(this.user.email, this.user.password).subscribe(user => {
			console.log(user)
	  		console.log("criando login")
	  		this.session.create(user)
	  		this.navCtrl.setRoot(HomePage);
		}, erro =>{
	  		console.log("erro login")
			console.log(erro)
		})
	  	//console.log(this.session)
	  	//console.log(this.user)
	  }

	  currentUser(){

	  	this.session.currentUser().then((val) => {
         this.user = val
       	})
	  }

	  remove(){
	  	this.session.remove()
	  }

	  isAuthenticated(){
	  	let user
	  	this.session.currentUser().then((val) => {
         user = val
       })

	  	return user

	  }

    private initForm() {
	    this.form = this.formBuilder.group({
	      password: ['', [
	        Validators.required,
	        Validators.minLength(3)
	      ]],
	      email: ['', [
	        Validators.required
	        //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
	      ]]
	});
  }

}
