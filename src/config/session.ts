import { User } from '../models/user'
import { Storage } from '@ionic/storage';

export class Session{
	user = new User;
	storage = new  Storage

	constructor(){}

	create(user){
		//this.storage.ready().then(() => {
			
       	this.storage.set('user', user );
			//console.log(this.storage)

     	//});
	}

	remove(){
		this.storage.remove('user');
	}

	currentUser(){

         console.log("Verificar current user")
       return this.storage.get('user')
	}

}