import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../firebase-services/user-service.service';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { Observable } from 'rxjs';
import {
  doc,
  docData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string | null = '';
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: 0,
    street: '',
    zip: 0,
    city: '',
  };
  user$!: Observable<User>;
  birthDay: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private dialog: MatDialog,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.getUserId();
    let loadedUser = await this.userService.getUserById(this.userId);
    this.user = this.createNewUser(loadedUser);
    this.birthDay = formatDate(loadedUser.birthDate, 'dd.MM.yyyy', 'en-US');
  }

  private getUserId() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    const userRef: DocumentReference = doc(
      this.firestore,
      `users/${this.userId}`
    );
    this.user$ = docData(userRef) as Observable<User>;
  }

  private createNewUser(user: User) {
    return new User({
      id: this.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      street: user.street,
      zip: user.zip,
      city: user.city,
    });
  }

  openEditDialog() {
    const editDialog = this.dialog.open(DialogEditUserComponent);
    editDialog.componentInstance.user = this.createNewUser(this.user);
    editDialog.componentInstance.userId = this.userId;
  }
}
