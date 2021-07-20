import { User } from '../../auth/user';
import {Catalogue} from '../../app/models.index';
export interface Authorities {
    id?:number;
    user?: User;
    type?: Catalogue;
    
}
