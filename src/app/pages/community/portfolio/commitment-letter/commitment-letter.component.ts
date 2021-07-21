import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Career } from 'src/app/models/app/career';
import { User } from 'src/app/models/auth/user';
import { CommitmentLetter } from 'src/app/models/community/commitmentLetter';
import { Paginator } from 'src/app/models/setting/paginator';
import { MessageService } from 'src/app/services/app/message.service';
import { CommunityHttpService } from 'src/app/services/community/community-http.service';

@Component({
  selector: 'community-commitment-letter',
  templateUrl: './commitment-letter.component.html',
  styleUrls: ['./commitment-letter.component.scss']
})
export class CommitmentLetterComponent implements OnInit {
  paginator: Paginator;
  commitmentLetter: CommitmentLetter[];
  formCommitmentLetter: FormGroup;
  user: User;
  career: Career;


  constructor(private communityHttpService: CommunityHttpService,
    private spinnerService: NgxSpinnerService,
    public messageService: MessageService,
    private formBuilder: FormBuilder) {

      this.paginator = { current_page: 1, per_page: 2 };

     }

  ngOnInit() {
    this.getCommitmentLetter (this.paginator);
   // this.buildFormCommitmentLetter(); 
  }

  // Formulario carta compromiso vinculacion
  buildFormAssignment() {
    this.formCommitmentLetter = this.formBuilder.group({
      user: this.formBuilder.group({
        first_name: [null, [Validators.required]],
        second_name: [null, [Validators.required]],
        first_lastname: [null, [Validators.required]],
        second_lastname: [null, [Validators.required]],
        identification: [null, [Validators.required]],
        
        
      }),
      career: this.formBuilder.group({

        name: [null, [Validators.required]],

      }),

      //level: [null, [Validators.required]],
    });
    console.log(this.formCommitmentLetter['controls']['user']);
  }
  onSubmit() {
    //  mostrar registros
    if (this.formCommitmentLetter.valid) {
      this.getCommitmentLetter(this.formCommitmentLetter.value);
    } else {
      this.formCommitmentLetter.markAllAsTouched();

    }

    // crear registro
    if (this.formCommitmentLetter.valid) {
     // this.storeAssignment(this.formAssignment.value);
    } else {
      this.formCommitmentLetter.markAllAsTouched();

    } /**/

  }
  getCommitmentLetter(paginator: Paginator) {
    this.spinnerService.show();
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
    this.communityHttpService.get('commitment-letter', params).subscribe(
      response => {
        this.spinnerService.hide();
        this.formCommitmentLetter.patchValue(response['data']);
        this.commitmentLetter = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      });

  }
  storeCommitmentLetter() {  // revisar metodo de guardar y el boton 
    const params = new HttpParams()
    this.communityHttpService.store('commitmentLetter', params).subscribe(
      response => {
        this.spinnerService.hide();
        this.formCommitmentLetter.patchValue(response['data']);
        this.commitmentLetter = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      });
  }
// campos editables de fk 
get firstName() {
  return this.formCommitmentLetter['controls']['user'].get('first_name');
}
get secondName() {
  return this.formCommitmentLetter['controls']['user'].get('second_name');
}
get firstLastname() {
  return this.formCommitmentLetter['controls']['user'].get('first_lastname');
}
get secondLastname() {
  return this.formCommitmentLetter['controls']['user'].get('second_lastname');
}
get identification() {
  return this.formCommitmentLetter['controls']['user'].get('identification');
}

// campos editables de fk career
get name() {
  return this.formCommitmentLetter['controls']['career'].get('name');
}

// campos propios de la tabla.

/*get level() {
  return this.formCommitmentLetter.get('level');
}*/

}
