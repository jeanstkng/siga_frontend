import { User } from "../auth/user";

export interface Assignment {
    id?: number;
    user?: User;
    academic_period?: string;
    date_request?: Date;
    level?: string;
    observation?: string;
    status?: string;
}
