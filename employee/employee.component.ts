import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { employeeData } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  formValue!: FormGroup;
  employeemodelobj: employeeData = new employeeData();
  allEmployeeData: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      mobile: [''],
      address: [''],
    });
    this.getAllData();
  }
  addEmp() {
    this.employeemodelobj.name = this.formValue.value.name;
    this.employeemodelobj.mobile = this.formValue.value.mobile;
    this.employeemodelobj.address = this.formValue.value.address;

    this.api.postEmployee(this.employeemodelobj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee records added sucessfully');
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Record not added ');
      }
    );
  }
  getAllData() {
    this.api.getEmployee().subscribe((res) => {
      this.allEmployeeData = res;
    });
  }
  deleteEmpTo(data: any) {
    this.api.deleteEmployee(data.id).subscribe((res) => {
      alert('Employee record deleted sucessfully');
      this.getAllData();
    });
  }
}
