import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/app/teacher';
import { DetailEvaluation } from 'src/app/models/teacher-eval/detail-evaluation';
import { Evaluation } from 'src/app/models/teacher-eval/evaluation';
import { TeacherEvalHttpService } from 'src/app/services/teacher-eval/teacher-eval-http.service';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css']
})
export class GeneratePDFComponent implements OnInit {

  teachers: Teacher [];
  teacher : Teacher;
  evaluations : Evaluation [];
  evaluation : Evaluation;
  /* PDF */
  /* Cabecera */
  nameTeacher: string;
  periodo : string;
  date : string;
/* Cabecera */

/* Docente */
  autoEvaD : number;
  evaEstD: number;
  evaParesD: number;
  evaCorD: number;
  equiAutoD : number;
  equiEstD: number;
  equiParesD : number;
  equiCorD : number;
  totalDocencia : number;
  equiTotalDoc : any; 
/* Docente */

/* Gestion y Direccion Docente */
autoEvaGD : number;
evaHet: number;
evaParesGD: number;
evaCorGD: number;
equiautoEvaGD : number;
equievaHet: number;
equievaParesGD: number;
equievaCorGD: number;
totalGesDoc : number;
equiTotaGeslDoc : number; 

/* Gestion y Direccion Docente */
 
/* Credits*/
extraCredits : any;
/* Credits*/

/* Investigacion */
  inv_auto_eval : any;
  inv_pares : any;
  inv_coodinador : any;
  equiAuto : any;
  equiPares : any;
  equiCoor : any;
  sumaEqui : any;
  total : any;
  investigacion : any;
/* Investigacion */
  calificacionFinal : number;
  
  
  constructor(
    private teacherEval: TeacherEvalHttpService,
    private router: Router
  ) { 
      this.teachers = [];
      this.evaluations = [];
  }

  ngOnInit(): void {
    this.getTeachers();
    this.date = moment(new Date()).format('DD-MM-yyyy');
    console.log(moment(new Date()).format('DD-MM-yyyy'));
  }

  getTeachers() {
  
    this.teacherEval.getTeacher('evaluation/teachers')
    .subscribe(response  =>{
       this.teachers = response['data'];
      
      console.log(response )
      
    },
      () => console.log('error')
      );
  }

  getEvaluations(id : string){
    this.teacherEval.getEvaluation(id).subscribe(
      response => {
        const datos =  this.evaluations = response['data'];
        console.log(response)
        /* Cabecera */
        const names =  this.evaluations = response['data'];
        this.nameTeacher = names[0].nameTeacher;
        

        const periodo =  this.evaluations = response['data'];
        this.periodo = periodo[0].periodo;
        
        /* Cabecera */

        /* Docente */
        const doc1 = this.evaluations = response['data'];
        this.autoEvaD = doc1[0].result
        

        const doc2 = this.evaluations = response['data'];
        this.evaEstD = doc2[1].result
        

        const doc3 = this.evaluations = response['data'];
        this.evaParesD = doc3[2].result
        

        const doc4 = this.evaluations = response['data'];
        this.evaCorD = doc4[3].result
        

        const equiD1 = this.evaluations = response['data'];
        this.equiAutoD = equiD1[0].percentage
        

        const equiD2 = this.evaluations = response['data'];
        this.equiEstD = equiD1[1].percentage
        

        const equiD3 = this.evaluations = response['data'];
        this.equiParesD = equiD1[2].percentage
        

        const equiD4 = this.evaluations = response['data'];
        this.equiCorD = equiD1[3].percentage
        

        const totalDocencia = this.evaluations = response['data'];
        this.totalDocencia = (parseFloat(equiD1[0].percentage)+parseFloat(equiD1[1].percentage)+parseFloat(equiD1[2].percentage)+parseFloat(equiD1[3].percentage))
        

       const equitotal = (this.totalDocencia * 0.7)
       this.equiTotalDoc = equitotal
        /* Docente */


        /* Investigacion */
          const invAE = this.evaluations = response['data'];
          this.inv_auto_eval = (parseFloat(invAE[0].inv_auto_eval) )

          const invPares = this.evaluations = response['data'];
          this.inv_pares = (parseFloat(invPares[0].inv_pares) )

          const invCor = this.evaluations = response['data'];
          this.inv_coodinador = (parseFloat(invCor[0].inv_coodinador) )
          console.log(this.inv_coodinador)

          this.equiAuto = (this.inv_auto_eval * 0.20)

          this.equiPares = (this.inv_pares * 0.50)

          this.equiCoor = (this.inv_coodinador * 0.30)

          this.sumaEqui = (this.equiAuto + this.equiPares + this.equiCoor)

          this.total = (this.sumaEqui * 0.5)
        /* Investigacion */

        /* Gestion y Direccin Docente 
        
        */

        const gestion1 = this.evaluations = response['data'];
        this.autoEvaGD = gestion1[4].result
        

        const gestion2 = this.evaluations = response['data'];
        this.evaHet = gestion1[5].result
        

        const gestion3 = this.evaluations = response['data'];
        this.evaParesGD = gestion1[6].result
        

        const gestion4 = this.evaluations = response['data'];
        this.evaCorGD = gestion1[7].result
        

        const equiGD =  this.evaluations = response['data'];
        this.equiautoEvaGD = equiGD[4].percentage
        

        const equiGD2 =  this.evaluations = response['data'];
        this.equievaHet = equiGD2[5].percentage
        

        const equiGD3 =  this.evaluations = response['data'];
        this.equievaParesGD = equiGD3[6].percentage
        

        const equiGD4 =  this.evaluations = response['data'];
        this.equievaCorGD = equiGD4[7].percentage
        

        const totalGesDoce = this.evaluations = response['data'];
        this.totalGesDoc = (parseFloat(equiGD[4].percentage)+parseFloat(equiGD[5].percentage)+parseFloat(equiGD[6].percentage)+parseFloat(equiGD[7].percentage))
        

        const equitotalGes = (this.totalGesDoc * 0.25)
        this.equiTotaGeslDoc = equitotalGes

        /* Gestion y Direccin Docente 
 
        */

        const extraCredits = this.evaluations = response['data'];
        this.extraCredits = parseFloat(extraCredits[0].extraCredits)

        const investigacion = this.evaluations = response['data'];
        this.investigacion = (parseFloat(investigacion[0].investigation) * 0.5);

        const final = (this.equiTotaGeslDoc + this.equiTotalDoc + this.extraCredits + this.investigacion)
        this.calificacionFinal = final 
        
      }
      
    )
  }


  getPDF(){

    html2canvas(document.getElementById('htmlData')).then(function(canvas) {
    canvas.getContext('2d');
     var HTML_Width = canvas.width;
    var HTML_Height = canvas.height;
    var top_left_margin = 25;
    var PDF_Width = HTML_Width+(top_left_margin*4);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*4);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    console.log(canvas.height+"  "+canvas.width);
    
    
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
    
    
    for (var i = 1; i <= totalPDFPages; i++) { 
    pdf.addPage(PDF_Width, PDF_Height);
    let margin=-(PDF_Height*i)+(top_left_margin*4);
    if(i>1)
    {
    margin=margin+i*8;
    }
    console.log(top_left_margin);
    console.log(top_left_margin);
    console.log(-(PDF_Height*i)+(top_left_margin*4));
    pdf.addImage(imgData, 'JPG', top_left_margin, margin,canvas_image_width,canvas_image_height);
    
    }
    
        pdf.save(`${new Date().toISOString()}_docente.pdf`);
           });
    };
   
}

