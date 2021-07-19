import { Teacher } from "../app/teacher";

export interface Research {
    id?: number,
    inv_auto_eval : number,
    inv_pares : number,
    inv_coodinador : number,
    total : number,
    teacher?: Teacher,
}
