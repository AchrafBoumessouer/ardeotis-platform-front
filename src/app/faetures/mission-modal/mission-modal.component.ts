import { Component, Inject, OnInit } from "@angular/core";
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

export type ModalMode = 'ADD' | 'EDIT' | 'VIEW';

@Component({
    selector: 'app-mission-modal',
    templateUrl: './mission-modal.component.html',
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
        ɵInternalFormsSharedModule, MatCheckboxModule, ReactiveFormsModule, MatDialogActions, MatDialogModule, MatFormField, MatSelectModule, MatOptionModule]
})
export class MissionModalComponent implements OnInit {
    form!: FormGroup;
    mode: ModalMode;
    mission: any;
    skills: string[] = []

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MissionModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.mode = data.mode;
        this.mission = data.mission;
    }

    ngOnInit() {
        this.form = this.fb.group({
         client:[this.mission?.client || '',Validators.required],
         title:[this.mission?.title || '',Validators.required],
         startDate:[this.mission?.startDate || '',Validators.required],
         status:[this.mission?.status || '',Validators.required],
         skills:[this.mission?.skills || []],
         endDate:[this.mission?.endDate || ''],
        })
        if (this.mode === 'VIEW') {
            this.form.disable();
        }
    }

    save() {
        if( this.form.invalid) return ;
        this.dialogRef.close({
            ...this.mission,
            ...this.form.value
        })
    }

    close() {
        this.dialogRef.close()
    }

    get title() {
        if (this.mode === 'ADD') return 'Ajouter mission';
        if (this.mode === 'EDIT') return 'Modifier missio,';
        return 'Details mission';
    }

    addSkill(skill:string){
        const value = skill.trim()
        if(value && !this.skills.includes(value)){
            this.skills.push(value);
            this.form.patchValue({skills: this.skills})
        }
    }

    removeSkill(skill:string){
        this.skills = this.skills.filter(s => s !== skill)
        this.form.patchValue({
            skills: this.skills
        })
        
    }
}