import { environment } from "src/environments/environment";

export class Notification {
    id: number;
    title: string;
    message: string;
    date_sent: Date;
    image: string;
    link: string;
    
    constructor(notif) {
        this.image = `${environment.image_url}${notif.image}`;
        this.id = notif.id;
        this.title = notif.title;
        this.date_sent = notif.date_sent;
        this.message = notif.message;
        this.link = notif.link;
    }

}