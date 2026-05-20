// angular import
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from "@angular/material/table";
// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { ConsultantResponseDto, ConsultantService } from '../../../services/consultant.service';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from "@angular/material/paginator";
import { PageEvent } from "@angular/material/paginator";
import { ConsultantModalComponent } from '../../modal/consultant-modal.component';
import { MissionResponseDto, MissionService } from '../../../services/mission.service';
import { MissionModalComponent } from '../../mission-modal/mission-modal.component';
import { MatFormField, MatInput } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInput, FormsModule,
    MatFormField,
    MatSelectModule,
    MatButtonModule
],
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  private iconService = inject(IconService);
  private missionService = inject(MissionService);
  private dialog = inject(MatDialog)
  totalElements = 0;
  pageSize = 10 ;
  pageIndex = 0;
  filters = {
    status: '',
    client:'',
    skill:''
  }

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }

  ngOnInit():void{
    this.loadMissions()
  }

  resetFilters(){
    this.filters = {
      status:'',
      skill: '',
      client:''
    }
    this.pageIndex = 0
    this.loadMissions()
  }

  applyFilters(){
    this.pageIndex = 0;
    this.loadMissions()
  }
  loadMissions(){
    this.missionService.getAll(this.pageIndex,this.pageSize,this.filters).subscribe(res => {
      this.missions = res.content;
      this.pageSize = res.size;
      this.pageIndex = res.number;
      this.totalElements = res.totalElements
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
    'endDate',
    'actions'
  ]

  openAddModal(): void {
  const dialogRef = this.dialog.open(MissionModalComponent,{
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
 const dialogRef = this.dialog.open(MissionModalComponent,{
    width: '600px',
    data: {
      mode: 'VIEW',
      mission: mission
    }
  })
 }

 openEditModal(mission:MissionResponseDto): void{
const dialogRef = this.dialog.open(MissionModalComponent,{
    width: '600px',
    data: {
      mode: 'EDIT',
      mission: mission
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
    this.missionService.archive(mission.id).subscribe({
      next: () => {
        this.loadMissions()
      }
    })
  }
 }

  onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadMissions();
 }
}
