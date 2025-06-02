import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialog,
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
import { UserServiceService } from '../firebase-services/user-service.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  loading = false;
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

  constructor(private userService: UserServiceService) {}

  updateUser(): void {
    this.loading = true;
    let updatedUser: User = this.createUpdatedUser();
    this.userService.updateUser(this.userId, updatedUser);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

  private createUpdatedUser(): User {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zip: this.user.zip,
      city: this.user.city,
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
