import { environment } from "src/environments/environment";
import { Carrousel } from "./carousel";

export class Banner {
    id: number;
    title: string;
    banner: string;
    products?: Array<Carrousel>; 
    image_active: boolean; 
    text_active: boolean;
    text: string;

    constructor(ban) { 
        this.title = ban.title;
        this.banner = ban.banner ? `${environment.image_url}${ban.banner}` : null;
        this.products = ban.products; 
        this.text_active = ban.text_active;
        this.image_active = ban.image_active;
        this.text = ban.text;
    }
}

