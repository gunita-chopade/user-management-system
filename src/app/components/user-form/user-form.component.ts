import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // ✅ Needed for routerLink, Router, ActivatedRoute
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId!: number;

  roles: string[] = ['Admin', 'User'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEditMode = true;
      const user = this.userService.getUserById(this.userId);
      if (user) {
        this.userForm.patchValue(user);
      }
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData: User = {
      id: this.isEditMode ? this.userId : new Date().getTime(),
      ...this.userForm.value
    };

    if (this.isEditMode) {
      this.userService.updateUser(userData);
    } else {
      this.userService.addUser(userData);
    }

    this.router.navigate(['/users']);
  }
}
