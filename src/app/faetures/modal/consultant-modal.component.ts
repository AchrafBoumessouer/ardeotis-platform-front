import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";

export type ModalMode = 'ADD' | 'EDIT' | 'VIEW';

@Component({
    selector: 'app-consultant-modal',
    templateUrl: './consultant-modal.component.html',
    standalone:true,
    imports: [MatDialogContent,MatChipsModule, CommonModule,MatInputModule, ɵInternalFormsSharedModule, MatCheckboxModule, ReactiveFormsModule, MatDialogActions, MatDialogModule, MatFormField, MatSelectModule, MatOptionModule]
})
export class ConsultantModalComponent implements OnInit {
    form!: FormGroup;
    mode: ModalMode;
    consultant: any;
    skills: string[] = []

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ConsultantModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.mode = data.mode;
        this.consultant = data.consultant;
    }

    ngOnInit() {
        this.form = this.fb.group({
         firstName:[this.consultant?.firstName || '',Validators.required],
         lastName:[this.consultant?.lastName || '',Validators.required],
         email:[this.consultant?.email || '',Validators.required],
         status:[this.consultant?.status || '',Validators.required],
        skills:[this.consultant?.skills || []],
         available:[this.consultant?.available || ''],
        })
        if (this.mode === 'VIEW') {
            this.form.disable();
        }
    }

    save() {
        if( this.form.invalid) return ;
        this.dialogRef.close({
            ...this.consultant,
            ...this.form.value
        })
    }

    close() {
        this.dialogRef.close()
    }

    get title() {
        if (this.mode === 'ADD') return 'Ajouter consultant';
        if (this.mode === 'EDIT') return 'Modifier consultant';
        return 'Details consultant';
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