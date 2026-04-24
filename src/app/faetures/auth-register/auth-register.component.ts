// Angular import
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-register',
  imports: [RouterModule,FormsModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})
export class AuthRegisterComponent {
   email = '';
   password = '';
   firstName = '';
   lastName = '';
 constructor( private router: Router, private authService: AuthService ) {}

onRegister() {
  this.authService.register(this.email,
    this.password,this.firstName,this.lastName
  ).subscribe({
    next: (res) => {
     localStorage.setItem('token', res.token);
     this.router.navigate(['/dashboard/default']);
    },
    error: (err) => {
      console.error('credentials incorrect')

    }
  })
}

}
