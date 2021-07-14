import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from '../../../../../models/job-board/language';
import { MessageService } from '../../../../shared/services/message.service';
import { MessageService as MessagePnService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from '../../../../../models/app/catalogue';
import { SharedService } from '../../../../shared/services/shared.service';
@Component({
    selector: 'app-language-form',
    templateUrl: './language-form.component.html',
    styleUrls: ['./language-form.component.scss']
})

export class LanguageFormComponent implements OnInit {
    @Input() formLanguageIn: FormGroup;
    @Input() languagesIn: Language[];
    @Output() languagesOut = new EventEmitter<Language[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredIdioms: any[];
    idioms: Catalogue[];
    filteredWrittenLevels: any[];
    writtenLevels: Catalogue[];
    filteredSpokenLevels: any[];
    spokenLevels: Catalogue[];
    filteredReadLevels: any[];
    readLevels: Catalogue[];

    constructor(private formBuilder: FormBuilder,
        public messageService: MessageService,
        private messagePnService: MessagePnService,
        private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private sharedService: SharedService,
        private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getIdioms();
        this.getWrittenLevels();
        this.getSpokenLevels();
        this.getReadLevels();


    }

    // Fields of Form
    get idField() {
        return this.formLanguageIn.get('id');
    }

    get idiomField() {
        return this.formLanguageIn.get('idiom');
    }

    get writtenLevelField() {
        return this.formLanguageIn.get('written_level');
    }

    get spokenLevelField() {
        return this.formLanguageIn.get('spoken_level');
    }

    get readLevelField() {
        return this.formLanguageIn.get('read_level');
    }

    // Submit Form
    onSubmit(flag = false) {
        if (this.formLanguageIn.valid) {
            if (this.idField.value) {
                this.updateLanguage(this.formLanguageIn.value);
            } else {
                this.storeLanguage(this.formLanguageIn.value, flag);
            }
        } else {
            this.formLanguageIn.markAllAsTouched();
        }
    }

    // Idiom of catalogues
    getIdioms() {
        this.appHttpService.getCatalogues('LANGUAGE_IDIOM').subscribe(response => {
            this.idioms = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    // Types of catalogues
    getWrittenLevels() {
        this.appHttpService.getCatalogues('LANGUAGE_WRITTEN_LEVEL').subscribe(response => {
            this.writtenLevels = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    // Types of catalogues
    getSpokenLevels() {
        this.appHttpService.getCatalogues('LANGUAGE_SPOKEN_LEVEL').subscribe(response => {
            this.spokenLevels = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }



    // Types of catalogues
    getReadLevels() {
        this.appHttpService.getCatalogues('LANGUAGE_READ_LEVEL').subscribe(response => {
            this.readLevels = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeLanguage(language: Language, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('languages', { language }).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveLanguage(response['data']);
            if (flag) {
                this.formLanguageIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateLanguage(language: Language) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('languages/' + language.id, { language })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveLanguage(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveLanguage(language: Language) {
        const index = this.languagesIn.findIndex(element => element.id === language.id);
        if (index === -1) {
            this.languagesIn.push(language);
        } else {
            this.languagesIn[index] = language;
        }
        this.languagesOut.emit(this.languagesIn);
    }



    // Filter idiom of languages
    filterIdiom(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const idiom of this.idioms) {
            if (idiom.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(idiom);
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
            this.idiomField.setValue(null);
        }
        this.filteredIdioms = filtered;
    }


    // Filter written Level of languages
    filterWrittenLevel(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const writtenLevel of this.writtenLevels) {
            if (writtenLevel.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(writtenLevel);
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
            this.writtenLevelField.setValue(null);
        }
        this.filteredWrittenLevels = filtered;
    }
    //filtro
    filterSpokenLevel(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const spokenLevel of this.spokenLevels) {
            if (spokenLevel.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(spokenLevel);
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
            this.spokenLevelField.setValue(null);
        }
        this.filteredSpokenLevels = filtered;
    }

    // Filter type of skills
    filterReadLevel(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const readLevel of this.readLevels) {
            if (readLevel.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(readLevel);
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
            this.readLevelField.setValue(null);
        }
        this.filteredReadLevels = filtered;
    }
    test(event) {
        event.markAllAsTouched();
    }

    resetFormLanguage() {
        this.formLanguageIn.reset();
    }

    markAllAsTouchedFormLanguage() {
        this.formLanguageIn.markAllAsTouched();
    }


}