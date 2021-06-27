import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  students: Student[] = []; // error could come due to initialization
  editStudent: Student = {};
  removeStudent: Student = {};

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      (s: Student[]) => {
        this.students = s;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addStudent(addForm: NgForm): void {
    document.getElementById('add-close-button')?.click();
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateStudent(student: Student): void {
    document.getElementById('edit-close-button')?.click();
    this.studentService.updatetudent(student).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteStudent(studentId: number): void {
    document.getElementById('delete-close-button')?.click();
    this.studentService.deleteStudent(studentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchStudents(key: string): void {
    // this.getStudents();
    const result: Student[] = [];
    for(const student of this.students) {
      if(student.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(student);
      }
    }
    this.students = result;
    console.log(this.students);
    if(result.length === 0 || !key) this.getStudents();
  }

  public openModal(student: Student, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') button.setAttribute('data-target', '#addStudentModal');
    else if(mode === 'edit') {
      button.setAttribute('data-target', '#editStudentModal');
      this.editStudent = student;
    }
    else if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteStudentModal');
      this.removeStudent = student;
    }
    console.log(mode);
    container?.appendChild(button);
    button.click();
  }
}
