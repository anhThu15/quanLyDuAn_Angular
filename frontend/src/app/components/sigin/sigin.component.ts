import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.css'
})
export class SiginComponent implements OnInit {
  constructor(private data:DataService, private router:Router, private authServices: AuthService){
    // this.data.setApiUrl('http://localhost:3000/users/sigin')
  }

  ngOnInit(): void {

  }


  formSigin = new FormGroup({
    name : new FormControl('',(Validators.required)),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    role: new FormControl('user',[Validators.required])
  })

  onSigin(){
    console.log(this.formSigin.value);
    if(this.formSigin.valid){
      this.authServices.sigin(this.formSigin.value).subscribe((data:any)=>{
        this.router.navigate(['login']);
      });
    }
  }
}
