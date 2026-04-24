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

 openViewModal(consultant:ConsultantResponseDto): void{
  console.log('ddd')
 }

 openEditModal(consultant:ConsultantResponseDto): void{
  console.log('ddd')
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
