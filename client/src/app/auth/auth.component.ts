import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../share/services/auth.service';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  person = {
    email: '',
    password: ''
  }


  constructor(private alertService: AlertService,
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    let result = !Object.values(this.person).every(o => o != '');
    if (result) {
      this.alertService.warn("Заповніть усі поля");
      return false;
    }
    this.authServ.login(this.person)
      .subscribe(data => {
        this.router.navigate(['/admin/dashboard'])
      },
        error => {
          console.error(error)
          this.alertService.error(error.error.message);
        })
    console.log(this.person)
    return false
  }

}
