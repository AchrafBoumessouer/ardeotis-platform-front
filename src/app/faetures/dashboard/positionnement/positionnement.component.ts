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
import { PositionnementService } from '../../../services/position.service';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
     
    
  ],
  templateUrl: './positionnement.component.html',
  styleUrls: ['./positionnement.component.scss']
})
export class PositionnementComponent implements OnInit {
  private iconService = inject(IconService);
  private positionnementService = inject(PositionnementService);
  private dialog = inject(MatDialog)
  totalElements = 0;
  pageSize = 10 ;
  pageIndex = 0;

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }
  ngOnInit():void{
  
  }

  loadPositionnement(){
    this.positionnementService.getPositionnement().subscribe({
      next:data => {
        this.positionnement = data;
        this.filterPositionnement = data
      },
      error: () => alert(' erreur chargement posi')
    })
  }
  
  positionnement: any = [];
  filterPositionnement: any = [];
  historique:any[] = [];
  consultantFilter = '';
  missionFilter = '';
  statutFilter = '';
  selectedPositionnement = null;
 applyFilters() {
  this.filterPositionnement = this.positionnement.filter((p : any) => (!this.consultantFilter || JSON.stringify(p).toLowerCase().includes(this.consultantFilter.toLowerCase())) &&
(!this.missionFilter || JSON.stringify(p).toLowerCase().includes(this.missionFilter.toLowerCase())) && 
(!this.statutFilter || p.status === this.statutFilter || p.status === this.statutFilter));
 }

changeStatus(p:any,status:string){
  this.positionnementService.updateStatus(p.id,status).subscribe({
    next:() =>{
      p.status = status;
      p.status = status;
    },
    error: () => alert('error')
  })
}

showHistorique(p:any){
this.selectedPositionnement = p 
this.positionnementService.getHistoriquePositionnement(p.id).subscribe({
  next: data => this.historique = data,
  error:() => alert('error')
})
}

closeHistoque(){
  this.selectedPositionnement= null;
  this.historique = []
}

}
