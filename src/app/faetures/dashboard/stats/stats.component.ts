// angular import
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
// icons
import { IconService } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import {  ConsultantService } from '../../../services/consultant.service';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialog } from '@angular/material/dialog';

import { DashboardService, DashboardStats } from '../../../services/dashboard.service';

@Component({
  selector: 'app-stats',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
     
    
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  private iconService = inject(IconService);
  private consultantService = inject(ConsultantService);
   private dashService = inject(DashboardService);
  private dialog = inject(MatDialog)
  loading = false;
  stats?:DashboardStats;


  // constructor
  constructor(private cd: ChangeDetectorRef) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  
  }
  ngOnInit():void{
   this.loadStats();
  }

  
  displayedColumns: string[] = [
    'consultant',
    'mission',
    'status',
    'lastStatusUpdatedAt'
  ]

 refresh(){
  this.loadStats();
 }
 
  loadStats() {
    this.dashService.getKPI().subscribe({
      next:(data) => {
        this.stats = data;
        this.loading = false
      },
      error: (error) => {
        this.loading = false
      }
    })
  }
}
