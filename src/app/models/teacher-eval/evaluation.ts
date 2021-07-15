import { SchoolPeriod, Status, Teacher } from "../app/models.index";
import { EvaluationType } from "./evaluation-type";

export interface Evaluation {
    id: number;
    teacher?:Teacher;
    evaluation_type?:EvaluationType;
    school_period?:SchoolPeriod;
    status?:Status;
    result:number;
    double:number;
}