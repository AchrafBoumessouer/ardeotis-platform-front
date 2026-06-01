import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { MatchService } from "../../services/matching.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";

export type ModalMode = 'ADD' | 'EDIT' | 'VIEW';

@Component({
    selector: 'app-match-modal',
    templateUrl: './matching-modal.component.html',
    styleUrls: ['./match-modal.component.scss'],
    standalone:true,
    providers:     [
        provideNativeDateAdapter()
    ],
    imports: [MatDialogContent, 
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,
        MatInputModule, 
        MatChipsModule,
        MatTableModule,
        MatProgressBarModule,
        ɵInternalFormsSharedModule, MatCheckboxModule, ReactiveFormsModule, MatDialogActions, MatDialogModule, MatFormField, MatSelectModule, MatOptionModule]
})
export class MatchingModalComponent implements OnInit {
   
    matchings: any = []
    displayedColumns = ['consultant','score','matchedSkills','missingSkills']

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MatchingModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private matching: MatchService,
        private cdr:ChangeDetectorRef
    ) {
       
    }

    ngOnInit() {
     this.loadMatching()
    }
    loadMatching(): void{
        console.log(this.data)
        this.matching.match(this.data.mission.id).subscribe({
            next: (data) => {
                this.matchings = data
                this.cdr.detectChanges()
            }
        })
    }

     close() {
        this.dialogRef.close()
    }

}