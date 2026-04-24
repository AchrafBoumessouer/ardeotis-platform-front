// project import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  imports: [RouterModule,FormsModule],
  standalone: true,
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
 email = '';
 password = '';
 constructor( private router: Router, private authService: AuthService ) {}

onLogin() {
  this.authService.login(this.email,
    this.password
  ).subscribe({
    next: (res) => {
     localStorage.setItem('token', res.token);
     this.router.navigate(['/dashboard/default']);
    },
    error: (err) => {
      console.error('Email or password incorrect')

    }
  })
}
}
