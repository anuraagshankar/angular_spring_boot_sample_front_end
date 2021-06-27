import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiServerUrl}/student`);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiServerUrl}/student/add`, student);
  }

  public updatetudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiServerUrl}/student/update`, student);
  }

  public deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/student/delete/${id}`);
  }
}
