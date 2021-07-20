import {Location} from '../app/location';

export interface BeneficiaryInstitution {
    id?: number;
    logo?: string;
    ruc?: number;
    files?: File[];
    name?: string;
    address?: string;
    location?: Location;
    parroquia?: string; // con calles
    function?: string;
    state?: boolean; // todos llevan state
    // VERIFICAR COMO Y DE DONDE VIENE LA INOFORMACION
    // nombre representante legal
    // ruc o ccedula representante legal
}
