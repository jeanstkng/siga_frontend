import { Career } from "../app/career";
import { User } from "../auth/user";

export interface Assignment {
    id?: number;
    user?: User;
    career?: Career;
    date_request?: Date;
    level?: string;
    observation?: string;
    status?: string;
}
