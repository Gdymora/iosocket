import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../share/services/auth.service';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  person = {
    name: '',
    login: '',
    email: '',
    password: ''
  }


  constructor(private alertService: AlertService,
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    let result = !Object.values(this.person).every(o => o != '');
    if (result) {
      this.alertService.warn("Заповніть усі поля");
      return false;
    }
    this.authServ.register(this.person)
      .subscribe(data => {
        this.alertService.success("Реєстрація пройшла успішно")
        this.router.navigate(['/auth'])
      },
        error => {
          console.error(error)
          this.alertService.error(error.error.message);
        })
    console.log(this.person)
    return false
  }

}
