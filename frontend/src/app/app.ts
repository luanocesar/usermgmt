import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Login } from './components/login/login'
import { Home } from './components/home/home'
import { AuthService } from './services/auth.service';
import { jwtInterceptorProvider } from './services/jwt.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Login, Home, HttpClientModule],
  providers: [jwtInterceptorProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app.html',
  styleUrl: 'app.css'
})
export class App {
  private authService = inject(AuthService);

  // Signal: Uma variável inteligente que avisa o Angular para atualizar a tela
  isLoggedIn = signal(this.authService.isAuthenticated());

  onLoginSuccess(username: string) {
    this.isLoggedIn.set(true);
  }

  onLogoutSuccess() {
    this.isLoggedIn.set(false);
  }
}