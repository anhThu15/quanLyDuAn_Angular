import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl!:string;
  private apiUrlAnother!:string;
  private apiUrlAnother3!:string;
  private apiUrlAnother4!:string;
  private apiUrlAnother5!:string;
  private apiUrlAnother6!:string;
  constructor(private http:HttpClient) { }

  setApiUrl(value:string){
    this.apiUrl=value
    }
  setApiUrlAnother(value:string){
    this.apiUrlAnother=value
    }
  setApiUrlAnother3(value:string){
    this.apiUrlAnother3=value
    }
    setApiUrlAnother4(value:string){
      this.apiUrlAnother4=value
      }
      setApiUrlAnother5(value:string){
        this.apiUrlAnother5=value
        }
        setApiUrlAnother6(value:string){
          this.apiUrlAnother6=value
          }

  getAll(){
    return this.http.get(this.apiUrl)
    }
  getOneAnother(id:any){
    return this.http.get(`${this.apiUrlAnother}/${id}`)
    }
  getOneAnother3(id:any){
    return this.http.get(`${this.apiUrlAnother3}/${id}`)
    }
    getOneAnother4(id:any,id2:any){
      return this.http.get(`http://localhost:3000/detail/task_detail/update/${id}/${id2}`)
      }
  getOne(id:any){
    return this.http.get(`${this.apiUrl}/${id}`)
    }
  addItem(item:any){
    return this.http.post(`${this.apiUrl}/add`,item)
    }
    addItemAnother3(item:any){
      return this.http.post(`${this.apiUrlAnother3}`,item)
      }
      addItemAnother5(item:any){
        return this.http.post(`${this.apiUrlAnother5}`,item)
        }
  updateItem(item:any,id:any){
    return this.http.put(`${this.apiUrl}/${id}`,item)
    }
  deleteItem(id:any){
    return this.http.get(`${this.apiUrlAnother}/delete/${id}`)
    }
    deleteItem4(id:any){
      return this.http.get(`${this.apiUrlAnother4}/delete/${id}`)
      }
      deleteItem6(id:any,id2:any){
        return this.http.delete(`${this.apiUrlAnother6}/${id}/${id2}`)
        }


  // user login - sigin
  login(data:any){
    return this.http.post(`${this.apiUrl}`,data);
  }
  sigin(data:any){
    return this.http.post(`${this.apiUrl}`,data);
  }
  // task detail
  getAllTaskDetails(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlAnother3}/${id}`);
  }
}
