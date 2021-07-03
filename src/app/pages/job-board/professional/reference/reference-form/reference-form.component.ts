import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reference } from '../../../../../models/job-board/reference';
import {MessageService as MessagePnService} from 'primeng/api';
import {MessageService} from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from '../../../../../models/app/catalogue';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
    selector: 'app-reference-form',
    templateUrl: './reference-form.component.html',
    styleUrls: ['./reference-form.component.scss']
})

export class ReferenceFormComponent implements OnInit {
    @Input() formReferenceIn: FormGroup;
    @Input() referencesIn: Reference[];
    @Output() referencesOut = new EventEmitter<Reference[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorAdd = new EventEmitter<number>();
    filteredInstitutions: any[];
    institutions: Catalogue[];

    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private messagePnService: MessagePnService,
         private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private sharedService: SharedService,
        private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getInstitution();
    }

    // Fields of Form
    
    get idField() {
        return this.formReferenceIn.get('id');
    }

  
    get institutionField() {
        return this.formReferenceIn.get('institution');
    }

    get positionField() {
        return this.formReferenceIn.get('position');
    }

    get contactNameField() {
        return this.formReferenceIn.get('contact_name');
    }

    get contactPhoneField() {
        return this.formReferenceIn.get('contact_phone');
    }

    get contactEmailField() {
        return this.formReferenceIn.get('contact_email');
    }


    // Submit Form
    onSubmit(flag = false) {
        if (this.formReferenceIn.valid) {
            if (this.idField.value) {
                this.updateReference(this.formReferenceIn.value);
            } else {
                this.storeReference(this.formReferenceIn.value, flag);
            }
        } else {
            this.markAllAsTouchedFormReference();
        }
    }
  
    // catalogues
    getInstitution() {
        const params = new HttpParams().append('type', 'REFERENCE_INSTITUTION');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.institutions = response['data'];
        //    console.log(this.institutions);
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeReference(reference: Reference, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('references', {reference}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveReference(response['data']);
            if (!flag) {
                this.displayOut.emit(false);
            }
            this.resetFormReference();

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }


    // Save in backend
    updateReference(reference: Reference) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('references/' + reference.id, {reference})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveReference(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveReference(reference: Reference) {
        const index = this.referencesIn.findIndex(element => element.id === reference.id);
        if (index === -1) {
            this.referencesIn.push(reference);
            this.paginatorAdd.emit(1);
        } else {
            this.referencesIn[index] = reference;
        }
        this.referencesOut.emit(this.referencesIn);
    }

    // Filter 
    filterInstitution(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const institution of this.institutions) {
            if (institution.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(institution);
            }
        }
        if (filtered.length === 0) {
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
                summary: 'Por favor seleccione un tipo del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
            });
            this.institutionField.setValue(null);
        }
        this.filteredInstitutions = filtered;
    }

     // Reset Forms
     resetFormReference() {
        this.formReferenceIn.reset();
    }

    // Mark as touched
    markAllAsTouchedFormReference() {
        this.formReferenceIn.markAllAsTouched();
    }
}