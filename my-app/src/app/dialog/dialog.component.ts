import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { keywordProducts } from '../models/product';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  BoolList = ["On", "Off"] /* property*/ 
  campaignForm !: FormGroup;
  dialogBtn : string = "Save"
  options: string[] = keywordProducts;
  
  filteredOptions: Observable<string[]> | undefined;
  constructor(private formBuilder: FormBuilder,
              private api:ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef: MatDialogRef<DialogComponent>
              ) { }
  
  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
      campaignName : ['',Validators.required],
      keywords : ['',Validators.required],
      bidAmount : ['',Validators.required],
      campaignFund : ['',Validators.required],
      status : ['',Validators.required],
      town : ['',Validators.required],
      radius : ['',Validators.required]
    });

    if(this.editData){
      this.dialogBtn = "Update";
      this.campaignForm.controls['campaignName'].setValue(this.editData.campaignName);
      this.campaignForm.controls['keywords'].setValue(this.editData.keywords);
      this.campaignForm.controls['bidAmount'].setValue(this.editData.bidAmount);
      this.campaignForm.controls['campaignFund'].setValue(this.editData.campaignFund);
      this.campaignForm.controls['status'].setValue(this.editData.status);
      this.campaignForm.controls['town'].setValue(this.editData.town);
      this.campaignForm.controls['radius'].setValue(this.editData.radius);
    }

    this.filteredOptions = this.campaignForm.get('keywords')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  addCampaign(){
    if(!this.editData){
      if(this.campaignForm.valid){
        this.api.postCampaign(this.campaignForm.value)
        .subscribe({
          next:(res) =>{
            alert("Product added succesfully")
            this.campaignForm.reset();
            this.dialogRef.close('save');
          },
        error:()=>{
          alert("Errpr while adding the product")
        }
          })
        }
    }else{
      this.updateCampaign()
    }
  }
  updateCampaign(){
    this.api.updateCampaign(this.campaignForm.value,this.editData.id)
    .subscribe({
      next:(rest) =>{
        alert("Product updated Succesfully");
        this.campaignForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating");
      }
    })
  }
  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayVal='';
  
  input = document.getElementById('keywordID');
  ul = document.querySelector("div ul");
  tags = [""];

  remove(element: any, tag: any){
    let index  = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    element.parentElement.remove();
    this.countTags();
}
  addTag(x:any) {
    let tag = x.target.value.replace(/\s+/g, ' ');
    if(tag.length > 1 && !this.tags.includes(tag)){
      if(this.tags.length < 4){
          tag.split(',').forEach((tag: string) => {
              this.tags.push(tag);
              this.createTag();
          });
      }
  }
  x.target.value = "";
}
createTag(){
  this.ul?.querySelectorAll("li").forEach(li => li.remove());
  this.tags.slice().reverse().forEach(tag =>{
    let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
    this.ul?.insertAdjacentHTML("afterbegin", liTag);
  })
  this.countTags();
}

countTags(){
  this.input?.focus();
}

  removeBtn(){
    this.tags.length = 0;
    this.ul?.querySelectorAll("li").forEach(li => li.remove());
    this.countTags();
  };
  
}



function remove(){
  
}




