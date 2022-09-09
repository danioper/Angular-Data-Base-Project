import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent implements OnInit {

  constructor(private dialog:MatDialog) { }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
  ngOnInit(): void {
  }

}
