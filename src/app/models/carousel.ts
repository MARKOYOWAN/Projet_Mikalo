import { environment } from "src/environments/environment";

export class Carrousel {
        id: number;
        name: string;
        price: string;
        image: string;
        size: Size;
        link: string;
        colors: Array<string>;
        reduction: number;
        solde: string;
        id_attribute: number;
        loader: boolean = false;
        img_couleur: string;
        reference : string;
        card: string;

        constructor(ban) {
                const http = (environment.production) ? "https://" : "http://";
                this.image = `${http}${ban.domain}${ban.physical_uri}${ban.size_md}/${ban.image}`;
                this.name = ban.name;
                this.link = ban.link;
                // this.colors = ban.colors.split(',');
                if(ban.colors){
                        this.colors = ban.colors.split(',');
                }
                this.reduction = ban.reduction;
                this.id_attribute = ban.id_attribute;
                this.loader = false;
                this.reference = ban.reference;
                this.card = ban.card; 
                if (ban.price) {
                        let prix = parseInt(ban.price).toFixed(2);
                        this.price = `${prix} ${ban.symbol}`;
                } else {
                        this.price = "";
                }
        }
}

export interface Size {
        xs: string;
        md: string;
        lg: string;
}





