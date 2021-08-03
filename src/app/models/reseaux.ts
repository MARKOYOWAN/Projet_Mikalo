export class Sociaux {
    id: number;
    name: string;
    icon: string;
    link: string;

    constructor(resaux) { 
        this.name = resaux.name;
        this.icon = resaux.icon;
        this.link = resaux.link;
    }
}