import { Component } from '@angular/core';
import {AuthHttpService} from '../services/AuthHttp.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authservice:AuthHttpService, private router:Router) {}
  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  confirmPassword: string = '';
  email: string = '';
  password: string = '';
  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const fullName = `${this.firstName} ${this.lastName}`;

    this.authservice.register(fullName, this.email, this.password, this.age).subscribe({
      next:(response)=>{
        alert("Registration successful!");
        this.router.navigate(['/login']);
      },
      error:(error)=>{
          console.error(error)
        }
      }
    );
  }}
