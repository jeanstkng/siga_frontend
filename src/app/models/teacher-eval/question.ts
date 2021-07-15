import { Catalogue } from "../app/catalogue";
import { Status } from "../app/status";
import { EVALUATION_TYPES } from "src/environments/catalogues";



export interface Question{
    id: number;
    type_id?: Catalogue; 
    //evaluation_type?: Evaluation_Types;
    status_id?: Status;
    code: string;
    order: number;
    name: string;
    description: string;
    delete_at: null;
    create_at: string;
    update_at: string;
}
