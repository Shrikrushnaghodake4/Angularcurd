import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../shared/api.service';
import { PersonModel } from './Person-dashboard.model';


@Component({
  selector: 'person-dashboard',
  templateUrl: './person-dashboard.component.html',
  styleUrls: ['./person-dashboard.component.css']
})
export class PersonDashboardComponent implements OnInit {
formValue !:FormGroup;
personModelObj : PersonModel = new PersonModel();
personData ! : any;
showAdd ! : boolean;
showUpdate ! : boolean;
  constructor(private formbuilder:FormBuilder, private api : ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      email:[''],
      dob:[''],
      age:[''],
      country:[''],
      avatar:['']
    })
    this.getAllPerson();
  }
clickAddPerson(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}
  postPersonDetails(){
    this.personModelObj.name = this.formValue.value.name;
    this.personModelObj.email = this.formValue.value.email;
    this.personModelObj.dob = this.formValue.value.dob;
    this.personModelObj.age = this.formValue.value.age;
    this.personModelObj.country = this.formValue.value.country;
    this.personModelObj.avatar = this.formValue.value.avatar;

    this.api.postPerson(this.personModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success("Completed")
      // alert("Person Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();

      this.formValue.reset();
      this.getAllPerson();
    },
    err=>{
      alert("Something Went wrong");
    })
  }
getAllPerson(){
  this.api.getPerson()
  .subscribe((res :any) => {
    this.personData = res;
  })
}

deletePerson(row : any){
  this.api.deletePerson(row.id)
  .subscribe(res=>{
    alert("Person Deleted")

    this.getAllPerson();
  })
}
onEdit(row : any){
  this.showAdd = false;
  this.showUpdate = true;
  this.personModelObj.id = row.id;
  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['dob'].setValue(row.dob);
  this.formValue.controls['age'].setValue(row.age);
  this.formValue.controls['country'].setValue(row.country);
  this.formValue.controls['avatar'].setValue(row.avatar);
}
updatePersonDetails(){
  this.personModelObj.name = this.formValue.value.name;
  this.personModelObj.email = this.formValue.value.email;
  this.personModelObj.dob = this.formValue.value.dob;
  this.personModelObj.age = this.formValue.value.age;
  this.personModelObj.country = this.formValue.value.country;
  this.personModelObj.avatar = this.formValue.value.avatar;
  this.api.updatePerson(this.personModelObj, this.personModelObj.id)
  .subscribe (rev=>{
  alert("Updated Successfully");
  let ref = document.getElementById('cancel')
  ref?.click();

  this.formValue.reset();
  this.getAllPerson();

})
}
}
