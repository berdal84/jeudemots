import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router ) { }

  ngOnInit(): void {
    this.login = '';
    this.password = '';
  }

  submit() {
    // TODO: add a form, and checks before to send data
    this.userService.login( this.login, this.password);
    this.router.navigate(['private']);
  }

  cancel() {

  }

}
