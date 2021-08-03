import { environment } from "src/environments/environment";

export class Offre {
    id: number;
    image: string;
    title: string;
    description: string;
    buttonlabel: string;
    button_color: string;
    link: string;
    loader: boolean = false;

    constructor(shop) {
        this.id = shop.id;
        this.image = shop.image ? `${environment.image_url}${shop.image}` : null;
        this.title = shop.title;
        this.description = shop.description;
        this.buttonlabel = shop.buttonlabel;
        this.button_color = shop.button_color;
        this.link = shop.url;
        this.loader = false;

    }
}


export class Service {
    id: number;
    image: string;
    title: string;
    link: string;

    constructor(serv) {
        this.id = serv.id;
        this.image = `${environment.image_url}${serv.image}`;
        this.title = serv.title;
        this.link = serv.link

    }
}