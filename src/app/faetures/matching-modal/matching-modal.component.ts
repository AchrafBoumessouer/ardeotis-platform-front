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
import { MatMenuModule } from "@angular/material/menu";
import { PositionnementService } from "../../services/position.service";

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
        MatMenuModule,
        MatTableModule,
        MatProgressBarModule,
        ɵInternalFormsSharedModule, MatCheckboxModule, ReactiveFormsModule, MatDialogActions, MatDialogModule, MatFormField, MatSelectModule, MatOptionModule]
})
export class MatchingModalComponent implements OnInit {
   
    matchings: any = []
    displayedColumns = ['consultant','score','matchedSkills','missingSkills','status','actions']

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MatchingModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private matching: MatchService,
        private position: PositionnementService,
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

    getAllowedStatus(currentStatus: string) {
        const transitions: Record<string, string[]> = {
            INTERET_EXPRIME:['PRESENTE_AU_CLIENT'],
            PRESENTE_AU_CLIENT:['ENTRETIEN_PLANIFIE','REFUSE'],
            ENTRETIEN_PLANIFIE:['RETOUR_CLIENT_EN_ATTENTE','REFUSE'],
            RETOUR_CLIENT_EN_ATTENTE:['VALIDE','REFUSE'],
            VALIDE:[],
            REFUSE:[],
        }
        return transitions[currentStatus] || [];

    }

    updateStatus(posID:string,status:string){
        this.position.updateStatus( posID,status).subscribe({
            next: () => {
                this.loadMatching()
            },
            error: () => {
                alert('transition status non autorisé')
            }
        })
    }

}