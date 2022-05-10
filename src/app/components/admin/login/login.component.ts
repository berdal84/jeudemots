import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login = '';
    this.password = '';
  }

  async submit() {
    // TODO: add a form, and checks before to send data
    await this.userService.login( this.login, this.password);

    const route = this.route.snapshot.queryParams['redirect'] || 'admin/dashboard';

    if( !await this.router.navigate([route]) )
    {
      console.error('Unable to navigate!');
    }
  }

  cancel() {

  }

}
