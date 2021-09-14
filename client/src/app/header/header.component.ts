import { Component, OnInit } from '@angular/core';
import { AuthService } from '../share/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authServ.logout()
  }
  isAuthenticated() {
    return this.authServ.isAuthenticated()
  }
}
