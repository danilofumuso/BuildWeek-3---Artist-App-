import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      userName: ['', Validators.required],
      profilePic: [''],
      bio: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formData: Partial<iUser> = this.registerForm.value;
      this.authSvc.register(formData).subscribe((res) => {
        this.router.navigate(['/auth/login']);
        alert('registrazione effettuata correttamente');
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  // Utility method to show validation errors
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Il get f() è un "getter" che fornisce un modo diretto per accedere ai controlli del form
  get f() {
    return this.registerForm.controls;
  }
}
