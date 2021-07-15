import {Status} from '../app/models.index';

export interface EvaluationType {
    id: number;
    parent?:EvaluationType;
// children?:Array<EvaluationType>;
    code: string;
    name: string;
    percentage: number;
    global_percentage: number;
    status?:Status;
}
