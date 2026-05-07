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
import { MissionResponseDto, MissionService } from '../../../services/mission.service';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
     
    
  ],
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  private iconService = inject(IconService);
  private missionService = inject(MissionService);
  private dialog = inject(MatDialog)

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }
  ngOnInit():void{
    this.loadMissions()
  }
  loadMissions(){
    this.missionService.getAll().subscribe(res => {
      this.missions = res;
      this.cd.detectChanges();
    }
    );
  }
  missions: any = [];
  displayedColumns: string[] = [
    'id',
    'client',
    'title',
    'status',
    'startDate',
    'endDate'
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
      this.missionService.create(result).subscribe(() => {
        this.loadMissions()
      })
    }
  })
 }


 openViewModal(mission:MissionResponseDto): void{
 const dialogRef = this.dialog.open(ConsultantModalComponent,{
    width: '600px',
    data: {
      mode: 'VIEW',
      consultant: mission
    }
  })
 }

 openEditModal(mission:MissionResponseDto): void{
const dialogRef = this.dialog.open(ConsultantModalComponent,{
    width: '600px',
    data: {
      mode: 'EDIT',
      consultant: mission
    }
  })
  dialogRef.afterClosed().subscribe(result =>{
    if (result) {
      console.log('edit',result)
      this.missionService.update(result.id, result).subscribe(() => {
        this.loadMissions()
      })
    }
  })
 }

 openDeleteModal(mission:MissionResponseDto): void {
  const confirmed = confirm(`Supprimer ${mission.client} ${mission.title}`)
  if(confirmed) {
    this.missionService.delete(mission.id).subscribe({
      next: () => {
        this.loadMissions()
      }
    })
  }
 }

 
}
