import { SchoolPeriod } from "../app/school-period";
import { Status } from "../app/status";
import { Teacher } from "../app/teacher";
import { EvaluationType } from "./evaluation-type";

export interface Evaluation {
    id?: number,
    result: number,
    percentage: number,
    teacher?: Teacher,
    evaluationType? : EvaluationType,
    schoolPeriod? : SchoolPeriod,
    status? : Status
}
