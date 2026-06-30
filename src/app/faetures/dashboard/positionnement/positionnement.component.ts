// angular import
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialog } from '@angular/material/dialog';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from "@angular/material/paginator";
import {finalize} from 'rxjs'

import { PositionnementService } from '../../../services/position.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,   
  ],
  templateUrl: './positionnement.component.html',
  styleUrls: ['./positionnement.component.scss']
})
export class PositionnementComponent implements OnInit {
  private iconService = inject(IconService);
  private positionnementService = inject(PositionnementService);
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar);
  private titleService = inject(Title);
  loading = false;
  totalElements = 0;
  pageSize = 10 ;
  pageIndex = 0;

  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }

  ngOnInit():void{
  this.titleService.setTitle('Positionnement')
  this.loadPositionnement()
  }

  loadPositionnement(){
    this.loading = true;
    this.positionnementService.getPositionnement()
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next:data => {
        this.positionnement = data;
        this.filterPositionnement = data
        this.cd.detectChanges()
      },
      error: () => {
        this.snackBar.open('errrur lors de chargement des positionnement','Fermer',{duration: 3000})
        alert(' erreur chargement posi')
      }
    })
  }
  
  positionnement: any = [];
  filterPositionnement: any = [];
  historique:any[] = [];
  consultantFilter = '';
  missionFilter = '';
  statutFilter = '';
  selectedPositionnement:any = null;
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
      this.snackBar.open('Statut modifie avec succées','Fermer',{duration:3000})
    },
    error: () => {
      this.snackBar.open('Erreur lors de la modification','Fermer',{duration:3000})
      alert('Transition de statut non autorisée')
    }
  })
}

showHistorique(p:any){
this.selectedPositionnement = p 

this.positionnementService.getHistoriquePositionnement(p.id).subscribe({
  next: data => {this.historique = data
    this.cd.detectChanges()
  },
  error:() => {
    this.snackBar.open('Erreur de chargement','Fermer',{duration:3000})
    alert('error')
  }
})
}

closeHistoque(){
  this.selectedPositionnement = null;
  this.historique = []
}

}
