import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private data:DataService, private router:Router, private authService : AuthService ){
    this.data.setApiUrl('http://localhost:3000')
  }

  id_user = this.authService.getUserInfo();
  rooms:any
  loger:any
  user: any = null;
  ngOnInit(): void {
    this.loadRoom();
    this.checkUser();
  }


  loadRoom(){
    this.data.getOne(this.id_user._id).subscribe((data:any)=>{
      this.rooms = data
      console.log(data);
    })
  }

  formAddRoom = new FormGroup({
    name : new FormControl ('',[Validators.required]),
    background : new FormControl ('',[Validators.required]),
    member : new FormControl ('',[Validators.required]),
    description : new FormControl ('',[Validators.required]),
    id_user: new FormControl(this.id_user._id,[Validators.required])
  })

  onAddRoom(){
    if(this.formAddRoom.valid){
      this.data.addItem(this.formAddRoom.value).subscribe((data:any)=>{
        console.log(this.formAddRoom.value);
        // this.router.navigate(['/dashboard'])
        window.location.reload();
      })
    }
  }



  checkUser() {
    this.user = this.authService.getUserInfo()
    if(this.user==null)
    this.authService.user$.subscribe((data) => {
    this.user = data;
    // console.log(thisuser._id);
  });

  }
  logOut() {
    this.authService.logout();
    this.user=null
  }


}
