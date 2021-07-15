import {EvaluationType} from './models.index';
import {Catalogue, Status} from '../app/models.index';

export interface Question {
    id: number;
    code: string;
    order: number;
    name: string;
    description: string;
    evaluation_type?: EvaluationType;
    type?:Catalogue;
    status?:Status;
}
