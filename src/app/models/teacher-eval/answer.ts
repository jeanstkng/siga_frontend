import {Status} from '../app/models.index';

export interface Answer {
    id: number;
    code: string;
    name: string;
    order: number;
    value: string;
    status?:Status;
}