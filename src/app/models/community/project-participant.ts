import { User } from '../auth/models.index';
import { Catalogue } from '../app/models.index';
import { Project } from '../community/models.index';

export interface ProjectParticipant {
    id?: number;
    start_date?: string | Date;
    end_date?: string | Date;
    schedule_job?: string;
    position?: string;
    working_hours?: number;
    functions?: object | string;
    state?: boolean;

    project?: Project;
    // SOLO DOCENTE
    type?: Catalogue;
    // DOCENTES, ESTUDIANTES, COORDINADORES, RECTOR.
    // END POINT PARA AUTOMATICO RECTOR
    user?: User;
}