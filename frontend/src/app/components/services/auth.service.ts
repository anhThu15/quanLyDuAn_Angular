// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class AuthService {
private jwtHelper = new JwtHelperService();
constructor(private http: HttpClient, private router:Router) {}
private isAuthenticated = false;
// Khởi tạo BehaviorSubject với giá trị khởi đầu là null
private userSubject = new BehaviorSubject<any>(null);
  // Để component khác có thể đăng ký và lắng nghe sự thay đổi
  user$ = this.userSubject.asObservable();
  login(email: string, password: string) {
  const user={
  'email':email,
  'password':password
  }
  // Gửi yêu cầu đăng nhập đến API
  this.http.post('http://localhost:3000/users/login', user).subscribe(
  (response: any) => {
  // Nhận JWT token từ phản hồi và lưu vào localStorage
  const token = response.access_token;
  localStorage.setItem('login', token);
  // Có dữ liệu mới thông báo cho header thay đổi
  this.userSubject.next(this.getUserInfo());
  // Đánh dấu đã chứng thực thành công
  this.isAuthenticated = true;
  // Tiếp tục xử lý sau khi chứng thực thành công, ví dụ: chuyển hướng đến trang product
  this.router.navigate(['/dashboard']);
  });
  }

  sigin(user: any){
    console.log(user);
    const userData = { ...user, role: 'user' };
    return this.http.post(`http://localhost:3000/users/sigin`,userData);
  }

  logout(){
  // Xóa token khỏi localStorage
  localStorage.removeItem('login');
  // Có dữ liệu mới thông báo cho header thay đổi
  this.userSubject.next(null);
  // Đánh dấu đã đăng xuất
  this.isAuthenticated = false;
  // Tiếp tục xử lý sau khi đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
  this.router.navigate(['/login']);
  }


  getUserInfo():any{
  let result:any=null
  try {
  let token: any = localStorage.getItem('login');
  const decodedToken = this.jwtHelper.decodeToken(token);
  // Trả về thông tin người dùng từ token
  result=decodedToken
  // console.log(result);
  } catch (error) {
  console.error('Error decoding token:', error);
  }
  return result.user
  }

  isLoggedIn(): boolean {
  const token = localStorage.getItem('login');
  let result:boolean=false
  try{
  // Kiểm tra token có tồn tại, hợp lệ và chưa hết hạn
  result=!!token && !this.jwtHelper.isTokenExpired(token);
  }catch{}
  return result
  }
  }
