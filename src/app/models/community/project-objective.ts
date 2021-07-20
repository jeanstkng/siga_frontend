import { Catalogue } from '../app/models.index';
import { Project } from '../community/models.index';

export interface ProjectObjective {
    id?: number;
    code?: string;
    description?: string;
    verification_means?: object | string;
    state?: boolean;
    project?: Project;
    type?: Catalogue;
    parent?: ProjectObjective;
    children?: ProjectObjective[];
}
