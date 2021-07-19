export interface Planification {
  id?:number;
  date_start?:Date;
  date_end?:Date;
  course_id?:number;
  needs?:string;
  teacher_responsable_id?:number;
  status_id?:number;
}