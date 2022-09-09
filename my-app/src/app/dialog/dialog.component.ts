import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  BoolList = ["On", "Off"]
  campaignForm !: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      campaignName : ['',Validators.required],
      Keywords : ['',Validators.required],
      bidAmount : ['',Validators.required],
      campaignFund : ['',Validators.required],
      status : ['',Validators.required],
      town : ['',Validators.required],
      radius : ['',Validators.required],
    })
  }
  addCampaign(){
    console.log(this.campaignForm.value)
  }

}
