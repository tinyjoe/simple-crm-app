import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.class';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  async updateUser(userId: string | null, user: Partial<User>) {
    const docRef = this.getUserDocRef(userId);
    await updateDoc(docRef, user)
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        console.log('User updated');
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
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zip: obj.zip || '',
      city: obj.city || '',
    };
  }

  getCleanJson(user: User): {} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      street: user.street,
      zip: user.zip,
      city: user.city,
    };
  }

  async getUserById(userId: string | null): Promise<any> {
    const documentRef = doc(this.firestore, `users/${userId}`);
    const documentSnap = await getDoc(documentRef);
    return documentSnap.exists() ? documentSnap.data() : null;
  }

  getUserDocRef(userId: string | null): DocumentReference {
    return doc(this.firestore, `users/${userId}`);
  }
}
