import { Career } from "../app/career";
import { User } from "../auth/user";

export interface CommitmentLetter {
    id?: number;
    user?: User;
    career?: Career;
    //project?: Project;
    career_coordinator?: string;
    activity_date?: Date;
    activity_descripcion: string;
   // image?: string; confirmar tipo de dato
    
}
