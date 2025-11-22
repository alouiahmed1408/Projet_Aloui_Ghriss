import { Component, inject, OnInit } from '@angular/core';
import { Compte } from '../../model/compte';
import { ClientsService } from '../../services/clients-service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {
  formValid = true;
  clients: Compte[] = [];
  private readonly clientService: ClientsService = inject(ClientsService)
  clientForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  private authService = inject(AuthService);
  private router = inject(Router);
  onSubmit(remember: boolean) {

    if (!this.formValid) return;

    const clientData = {
      ...this.clientForm.value,
      role: "Client"
    };

    this.clientService.addClient(clientData).subscribe(
      newClient => {

        this.clients.push(newClient);

        if (remember) {
          this.authService.login(
            newClient.username,
            newClient.password,
            'Client'
          ).subscribe(() => this.router.navigate(['/repas']));
        }

        this.onResetForm();
      }
    );
  }


  onResetForm() {
    this.clientForm.reset();
    this.clientForm.get('id')?.setValue((this.clients.length + 1).toString())
    this.favRepas.clear();
  }
  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      client => {
        this.clients = client;
        this.clientForm.get('id')?.setValue((this.clients.length + 1).toString())

      }
    )
    this.clientForm = this.fb.nonNullable.group({
      id: [8],
      username: ["", [Validators.required, Validators.pattern("^([A-Z][a-z]+)(\\s[A-Z][a-z]+)*$")]],
      nomClient: ["", [Validators.required, Validators.pattern('[A-Z][a-z]*')]],
      prenom: ["", [Validators.required, Validators.pattern("^([A-Z][a-z]+)(\\s[A-Z][a-z]+)*$")]],
      age: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      fav_repas: this.fb.array([]),
      photoClient: [""],
      nombrevisite: [0],
      ClientFidéle: ["false"],
    })
  }
  public get favRepas() {
    return this.clientForm.get('fav_repas') as FormArray;
  }

  public get NomInvalide() {
    return this.clientForm.get('nomClient');
  }
  public NomNonValide() {
    return this.NomInvalide?.errors?.['pattern'];
  }
  public get prenomInvalide() {
    return this.clientForm.get('prenom');
  }
  public PrenomNonValide() {
    return this.prenomInvalide?.errors?.['pattern'];
  }
  public get ageInvalide() {
    return this.clientForm.get('age');
  }
  public ageNonValide() {
    return this.ageInvalide?.errors?.['min'] || this.ageInvalide?.errors?.['max'];
  }
  public get usernameInvalide() {
    return this.clientForm.get('username');
  }
  public usernameNonValide() {
    return this.usernameInvalide?.errors?.['pattern'];
  }
  public get passwordInvalide() {
    return this.clientForm.get('password');
  }
  public passwordNonValide() {
    return this.passwordInvalide?.errors?.['minlength'];
  }
  public get confirmPasswordInvalide() {
    return this.clientForm.get('confirmPassword');
  }
  public confirmPasswordNonValide() {
    return this.confirmPasswordInvalide?.value !== this.passwordInvalide?.value
  }
  onRememberToggle(isChecked: boolean) {
    if (isChecked && this.clientForm.valid) {

      localStorage.setItem("state", "connected_Client");

      localStorage.setItem("username", this.clientForm.get('username')?.value);

      this.router.navigate(['/repas']);
    }
  }

}
