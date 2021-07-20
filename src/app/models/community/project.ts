import { Catalogue, Career, SchoolPeriod, Location } from '../app/models.index';
import { User } from '../auth/models.index';
import { ProjectParticipant } from '../community/models.index';

export interface Project {
    id?: number;
    code?: string;
    title?: string;
    date?: string | Date;
    cycles?: object | string;
    lead_time?: number; // plazo de ejecucion
    delivery_date?: string | Date;
    start_date?: string | Date;
    end_date?: string | Date;
    description?: string;
    diagnosis?: string;
    justification?: string;
    direct_beneficiaries?: object | string;
    indirect_beneficiaries?: object | string;
    strategies?: object | string;
    bibliografies?: object | string;
    observations?: object | string;
    send_quipux?: object | string;
    receive_quipux?: object | string;
    state?: boolean;

    entity?: any;
    school_period?: SchoolPeriod;
    career?: Career;
    coverage?: Catalogue;
    location?: Location;
    frequency?: Catalogue;
    status?: Catalogue;
    created_by?: User;
    participants?: ProjectParticipant[];
}
