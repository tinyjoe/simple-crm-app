import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { UserServiceService } from '../firebase-services/user-service.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  user: User = new User();
  birthDate!: Date;
  loading = false;

  constructor(public userService: UserServiceService) {}

  saveUser(): void {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let createdUser: User = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zip: this.user.zip,
      city: this.user.city,
    };
    console.log('New User: ', this.user);
    this.userService.addUser(createdUser);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
