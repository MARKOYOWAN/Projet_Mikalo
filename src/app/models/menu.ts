export class Menu {
    id: number;
    title: string;
    name_page: string;
    link: string;
    icon: string;


    constructor(ban) {
        this.title = ban.title;
        this.name_page = ban.name_page;
        this.link = ban.link;
        this.icon = ban.icon
    }
}