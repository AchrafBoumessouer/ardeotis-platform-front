// angular import
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";
// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { ConsultantResponseDto, ConsultantService } from '../../../services/consultant.service';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialog } from '@angular/material/dialog';
import { ConsultantModalComponent } from '../../modal/consultant-modal.component';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
     
    
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  private iconService = inject(IconService);
  private consultantService = inject(ConsultantService);
  private dialog = inject(MatDialog)

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }
  ngOnInit():void{
    this.loadConsultants()
  }
  loadConsultants(){
    this.consultantService.getAll().subscribe(res => {
      this.consultants = res;
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
        this.loadConsultants()
      }
    })
  }
 }

 
}
