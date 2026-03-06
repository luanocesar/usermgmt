import { Component, signal, computed, inject, ChangeDetectionStrategy, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'home.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes zoom-in { from { transform: scale(0.95); } to { transform: scale(1); } }
    .animate-in { animation: fade-in 0.2s ease-out, zoom-in 0.2s ease-out; }
  `]
})
export class Home implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  onLogout = output<void>();
  currentUser = signal('');
  users = signal<User[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showModal = signal(false);
  editingId = signal<string | null>(null);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['']
  });

  ngOnInit() {
    // Obter nome do usuário logado
    this.authService.userName.subscribe(name => {
      if (name) {
        this.currentUser.set(name);
      }
    });

    // Delay para garantir que o token foi salvo no localStorage
    setTimeout(() => {
      this.loadUsers();
    }, 500);
  }

  loadUsers() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erro ao carregar usuários');
        this.isLoading.set(false);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.onLogout.emit();
  }

  openForm(user?: User) {
    if (user) {
      this.editingId.set(user.id.toString());
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    } else {
      this.editingId.set(null);
      this.userForm.reset();
    }
    this.showModal.set(true);
  }

  closeForm() {
    this.showModal.set(false);
    this.editingId.set(null);
    this.userForm.reset();
  }

  saveUser() {
    // When editing, password is optional, so validate accordingly
    if (this.editingId() && this.userForm.get('name')?.invalid) return;
    if (this.editingId() && this.userForm.get('email')?.invalid) return;
    if (!this.editingId() && this.userForm.invalid) return;

    this.isLoading.set(true);
    const { name, email, password } = this.userForm.value;
    const currentEditingId = this.editingId();

    if (currentEditingId) {
      const updateData: any = {
        name: name!,
        email: email!
      };
      if (password && password.trim()) {
        updateData.password = password;
      }
      this.userService.updateUser(currentEditingId, updateData).subscribe({
        next: () => {
          this.loadUsers();
          this.closeForm();
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || 'Erro ao atualizar usuário';
          this.errorMessage.set(errorMsg);
          this.isLoading.set(false);
        }
      });
    } else {
      this.userService.createUser({
        name: name!,
        email: email!,
        password: password!
      }).subscribe({
        next: () => {
          this.loadUsers();
          this.closeForm();
        },
        error: (err) => {
          this.errorMessage.set('Erro ao criar usuário');
          this.isLoading.set(false);
        }
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Deseja realmente excluir este usuário?')) {
      this.isLoading.set(true);
      this.userService.deleteUser(id.toString()).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          this.errorMessage.set('Erro ao excluir usuário');
          this.isLoading.set(false);
        }
      });
    }
  }
}