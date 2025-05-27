import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { UserServiceService } from '../firebase-services/user-service.service';
import { get } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user: User = new User();
  userList: User[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getUsersList();
    }, 2000);
  }

  openAddUserDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersList(): User[] {
    return this.userService.users;
  }

  goToUserDetail(id: string | undefined): void {
    this.router.navigate(['/user', id]);
  }
}
