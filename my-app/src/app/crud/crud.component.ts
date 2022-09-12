import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CRUDComponent implements OnInit {
  displayedColumns: string[] = ['campaignName', 'keywords', 'bidAmount', 'campaignFund','status','town','radius','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private api: ApiService) { }
  /*Dialog window opener*/
  openDialog() {
    var resol = '35%';
    if (window.innerWidth <= 1390) {
      resol = '100%'
    }
    this.dialog.open(DialogComponent, {
      width:resol
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllCapaign();
      }
    })
  }
  /*Load and Reload all data to table*/
  getAllCapaign(){
    this.api.getCampaign()
    .subscribe({
      next:(res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err) =>{
        alert("Error while fetching the Records")
      }
    })
  }
  /*Data action options*/
  editCampaign(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllCapaign();
      }
    })
  }

  deleteCam(id:number){
    this.api.deleteCampaign(id)
    .subscribe({
      next:(res) =>{
        this.getAllCapaign();
      },
      error:()=>{
        alert("Error while deleting")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /*Disable CRUD Page button */
  disable(){
    const ele = document.getElementById('crud-button');
    ele!.style.visibility = 'hidden';
  }
  fundUpdater(){
    let first = this.getRandomArbitrary(1000,5000);
    let second = this.getRandomArbitrary(1000,5000);
  }

  getRandomArbitrary(min:any, max:any) {
    return Math.random() * (max - min) + min;
  }

  ngOnInit(): void {
    this.disable();
    this.getAllCapaign();
    setInterval(() => {
      this.fundUpdater();
    }, 3000)
  }
}
