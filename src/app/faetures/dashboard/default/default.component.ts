// angular import
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { PageEvent } from "@angular/material/paginator";
// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { ConsultantResponseDto, ConsultantService } from '../../../services/consultant.service';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialog } from '@angular/material/dialog';
import { ConsultantModalComponent } from '../../modal/consultant-modal.component';
import { MissionService } from '../../../services/mission.service';
import {  MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
     
    
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  private iconService = inject(IconService);
  private consultantService = inject(ConsultantService);
  private missionService = inject(MissionService);
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar);
  totalElements = 0;
  pageSize = 10 ;
  pageIndex = 0;

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }
  ngOnInit():void{
    this.loadConsultants()
  }
  loadConsultants(){
    this.consultantService.getAll(this.pageIndex,this.pageSize).subscribe(res => {
      this.consultants = res.content;
      this.pageSize = res.size;
      this.pageIndex = res.number;
      this.totalElements = res.totalElements
       this.snackBar.open('Statut modifie avec succées','Fermer',{duration:3000})

      this.cd.detectChanges();
    }
    );
  }
  consultants: any = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'status',
    'available',
    'actions'
  ]

  openAddModal(): void {
  const dialogRef = this.dialog.open(ConsultantModalComponent,{
    width: '600px',
    data: {
      mode: 'ADD',
      consultant: null
    }
  })
  dialogRef.afterClosed().subscribe(result =>{
    if (result) {
      this.consultantService.create(result).subscribe(() => {
        this.loadConsultants()
      })
    }
  })
 }


 openViewModal(consultant:ConsultantResponseDto): void{
 const dialogRef = this.dialog.open(ConsultantModalComponent,{
    width: '600px',
    data: {
      mode: 'VIEW',
      consultant: consultant
    }
  })
 }

 openEditModal(consultant:ConsultantResponseDto): void{
const dialogRef = this.dialog.open(ConsultantModalComponent,{
    width: '600px',
    data: {
      mode: 'EDIT',
      consultant: consultant
    }
  })
  dialogRef.afterClosed().subscribe(result =>{
    if (result) {
      console.log('edit',result)
      this.consultantService.update(result.id, result).subscribe(() => {
         this.snackBar.open('Statut modifie avec succées','Fermer',{duration:3000})
        this.loadConsultants()
      })
    }
  })
 }

 openDeleteModal(consultant:ConsultantResponseDto): void {
  const confirmed = confirm(`Supprimer ${consultant.firstName} ${consultant.lastName}`)
  if(confirmed) {
    this.consultantService.delete(consultant.id).subscribe({
      next: () => {
         this.snackBar.open('consultant suprimmée avec succées','Fermer',{duration:3000})
        this.loadConsultants()
      }
    })
  }
 }

 onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadConsultants();
 }

 
}
