export class Forme {
    id: number;
    field: string;
    label: string;
    default_value: string;
    type: string;
    is_required: boolean;
    json_value: any;
    value: any;
    table_location: string;
    pattern: string;
    message: string;

    constructor(form) {
        this.type = form.type;
        this.field = form.field;
        this.label = form.label
        this.json_value = form.json_value;
        this.default_value = form.default_value;
        this.is_required = form.is_required == 1 ? true : false;
        this.table_location = form.table_location;
        this.pattern = form.pattern;
        this.message = form.message;
    }
}


export interface ErrorItem {
    email: any;
    date: any;
    checkbox: any;
    password: any;
  }