import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { ClientsService } from '../../services/clients-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';

const API_URL = "http://localhost:3000/clients";
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn implements OnInit {
  private readonly authService: AuthService = inject(AuthService);

  private readonly http: HttpClient = inject(HttpClient);
  logInForm!: FormGroup;
  private readonly clientsService: ClientsService = inject(ClientsService);
  fb: FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  errorMessage!: string;
  ngOnInit(): void {
    this.logInForm = this.fb.nonNullable.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  onSubmitLogIn() {
    this.errorMessage = "";

    const username = this.logInForm.get('username')?.value;
    const password = this.logInForm.get('password')?.value;

    this.clientsService.getClients().subscribe((clients) => {

      const found = clients.find(c =>
        c.username === username &&
        c.password === password
      );

      if (!found) {
        this.errorMessage =
          'Client non trouvé. Veuillez vérifier votre nom d’utilisateur et votre mot de passe.';
        return;
      }
      const role: 'Admin' | 'Client' =
        found.role === 'Admin' ? 'Admin' : 'Client';

      found.nombrevisite = (found.nombrevisite ?? 0) + 1;
      this.http.put(`${API_URL}/${found.id}`, found).subscribe();

      this.authService.login(username, password, role).subscribe(() => {


        this.router.navigate(['/repas']);


      });

    });
  }


}





