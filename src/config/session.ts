import { User } from '../models/user'
import { Storage } from '@ionic/storage';

export class Session{
	user = new User;
	storage = new Storage(null)

	constructor(){}

	create(user){
    this.storage.set('user', user );
	}

	remove(){
		this.storage.remove('user');
	}

	currentUser(){
   	return this.storage.get('user')
	}

}