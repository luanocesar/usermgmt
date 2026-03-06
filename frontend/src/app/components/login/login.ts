import { Component, signal, inject, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.html',
  styleUrl: 'login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  // Outputs
  onLogin = output<string>();

  // States
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Forms
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  handleLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;

    this.authService.login({ 
      email: email || '', 
      password: password || '' 
    }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.onLogin.emit(response.user.name);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    });
  }
}