import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../firebase-services/user-service.service';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, MatCardModule, MatIconModule],
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
  birthDay: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
    });
    let loadedUser = await this.userService.getUserById(this.userId);
    this.user = new User({
      id: this.userId,
      firstName: loadedUser.firstName,
      lastName: loadedUser.lastName,
      email: loadedUser.email,
      birthDate: loadedUser.birthDate,
      street: loadedUser.street,
      zip: loadedUser.zip,
      city: loadedUser.city,
    });
    this.birthDay = formatDate(loadedUser.birthDate, 'dd.MM.yyyy', 'en-US');
  }
}
