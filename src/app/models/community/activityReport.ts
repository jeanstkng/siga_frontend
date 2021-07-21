import { Career } from "../app/career";
import { User } from "../auth/user";

export interface ActivityReport {
    id?: number;
    user?: User;
    career?: Career;
    // instituto?: (poner nombre tabla)
    // fundacion?:
    // level?:
}
