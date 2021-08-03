export class marque {
    id: number;
    image: string;
    name: string;
    lien: string;

    constructor(mr) { 
        this.id = mr.id;
        this.image = mr.image;
        this.lien = mr.lien;
    }
}