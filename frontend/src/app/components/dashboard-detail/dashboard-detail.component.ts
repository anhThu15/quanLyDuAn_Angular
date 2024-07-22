import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../../data/data.service';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [RouterOutlet, RouterLink , CommonModule , RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.css'
})
export class DashboardDetailComponent implements OnInit {
  constructor(private data:DataService, private router:Router, private route: ActivatedRoute){
    this.data.setApiUrl('http://localhost:3000/detail'),
    this.data.setApiUrlAnother('http://localhost:3000/detail/task'),
    this.data.setApiUrlAnother4('http://localhost:3000'),
    this.data.setApiUrlAnother3('http://localhost:3000/detail/task/add'),
    this.data.setApiUrlAnother6('http://localhost:3000/detail/task_detail/delete'),
    this.data.setApiUrlAnother5('http://localhost:3000/detail/task_detail/add')

  }

  id = this.route.snapshot.paramMap.get('id');
  room:any
  taskes:any

  ngOnInit(): void {
    this.loadDetailes();
    this.loadTaskes();
  }

  loadDetailes(){
    this.data.getOne(this.id).subscribe((data:any)=>{
      this.room = data;
    })
  }

  loadTaskes(){
    this.data.getOneAnother(this.id).subscribe((data:any)=>{
      console.log(data);
      this.taskes = data;
    })
  }



  formAddGroup = new FormGroup({
    id_room : new FormControl(this.id,[Validators.required]),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  onAddGroup(){
    console.log(this.formAddGroup.value);
    this.data.addItemAnother3(this.formAddGroup.value).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    })
  }
  deleteGroup(id:any){
    this.data.deleteItem(id).subscribe(()=> {
      console.log(id);
      window.location.reload();
    })
  }

  /////////////////////////////////////////

  myAddTaskDetail = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    user: new FormControl('',[Validators.required]),
    date: new FormControl(new Date().toLocaleString('sv-SE'),[Validators.required])
  })

  onTaskDetail(id:any){
    // console.log(idTask.id = id);
      const idTask = this.myAddTaskDetail.value
      idTask.id = id
      console.log(idTask);
      this.data.addItemAnother5(idTask).subscribe((data:any)=>{
        console.log(data);
        window.location.reload();
      })
  }

  deleteTaskDetail(id:any,id2:any){
    this.data.deleteItem6(id,id2).subscribe(()=>{
      console.log('xong gòi');
          window.location.reload();
    })
  }

  editTaskDetail(id:any,id2:any){
    this.data.getOneAnother4(id,id2).subscribe((data:any)=>{
      console.log(data);

    })
  }


  deleteRoom(id:any){
    this.data.deleteItem4(id).subscribe(()=> {
      console.log(id);
      window.location.reload();
      this.router.navigate(['/dashboard'])
    })
  }

}
