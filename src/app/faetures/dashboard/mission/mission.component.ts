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
import { MatPaginatorModule } from "@angular/material/paginator";
import { PageEvent } from "@angular/material/paginator";
import { ConsultantModalComponent } from '../../modal/consultant-modal.component';
import { MissionResponseDto, MissionService } from '../../../services/mission.service';
import { MissionModalComponent } from '../../mission-modal/mission-modal.component';
import { MatchingModalComponent } from '../../matching-modal/matching-modal.component';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
     
    
  ],
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  private iconService = inject(IconService);
  private missionService = inject(MissionService);
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar);
  private titleService = inject(Title);
  totalElements = 0;
  pageSize = 10 ;
  pageIndex = 0;

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }
  ngOnInit():void{
    this.titleService.setTitle('Positionnement')

    this.loadMissions()
  }
  loadMissions(){
    this.missionService.getAll(this.pageIndex,this.pageSize).subscribe(res => {
      this.missions = res.content;
      this.pageSize = res.size;
      this.pageIndex = res.number;
      this.totalElements = res.totalElements
      this.cd.detectChanges()
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
        this.snackBar.open('mission crée avec succées','Fermer',{duration:3000})
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
        this.snackBar.open('mission mis à jour avec succées','Fermer',{duration:3000})
        this.loadMissions()
      })
    }
  })
 }

  openMatchingModal(mission:any): void{
const dialogRef = this.dialog.open(MatchingModalComponent,{
    width: '1000px',
    data: {
      mission: mission
    }
  })

 }

 openDeleteModal(mission:MissionResponseDto): void {
  const confirmed = confirm(`Supprimer ${mission.client} ${mission.title}`)
  if(confirmed) {
    this.missionService.archive(mission.id).subscribe({
      next: () => {
        this.snackBar.open('mission suprimmée avec succées','Fermer',{duration:3000})
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
