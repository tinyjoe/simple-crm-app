import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.class';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  users: User[] = [];

  unsubUsers;

  firestore = inject(Firestore);

  constructor() {
    this.unsubUsers = this.subUsersList();
  }

  async addUser(user: User) {
    let docRef = collection(this.firestore, 'users');
    await addDoc(docRef, user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  subUsersList() {
    const q = query(collection(this.firestore, 'users'));
    return onSnapshot(q, (list) => {
      list.forEach((element) => {
        this.users.push(this.setUserObject(element.data(), element.id));
      });
    });
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zip: obj.zip || '',
      city: obj.city || '',
    };
  }
}
