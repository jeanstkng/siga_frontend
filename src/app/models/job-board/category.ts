
export interface Category{
    id?: number;
    parent_id?: Category;
    code?: string;
    name?: string;
    icon?: null;
    children?: Category[];   

}



