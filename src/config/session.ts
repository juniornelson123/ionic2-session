import { User } from '../models/user'
import { Storage } from '@ionic/storage';

export class Session{
	user = new User;
	storage = new Storage(null)

	constructor(){}

	create(user){
		localStorage.setItem("currentUser", JSON.stringify(user))
    //this.storage.set('user', user );
	}

	remove(){
		localStorage.removeItem("currentUser")
    
		//this.storage.remove('user');
	}

	currentUser(){
   	return JSON.parse(localStorage.getItem("currentUser"))
     
   	//this.storage.get('user')
	}

}