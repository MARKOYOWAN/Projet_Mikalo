import { environment } from "src/environments/environment";

export class Evenenement {
    id: number;
    id_device: number;
    image: string;
    title: string;
    description?: string;
    buttonlabel?: string;
    button_color?: string;
    link?: string;
    participation: boolean;
    membre: boolean;
    message: string;
    condition: string
    participe: boolean

    constructor(event) {
        if (event) { 
            this.id = event.id;
            this.id_device = event.id_device;
            this.image = event.image ? `${environment.image_url}${event.image}` : null;
            this.title = event.title;
            this.description = event.description;
            this.buttonlabel = event.buttonlabel;
            this.button_color = event.button_color;
            this.link = event.url;
            this.participation = event.participation;
            this.membre = event.membre;
            this.message = event.message;
            this.condition = event.label_condition;
            this.participe = event.participe;
        }
    }
}
