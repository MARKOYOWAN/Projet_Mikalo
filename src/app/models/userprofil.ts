import { environment } from "src/environments/environment";

export class UserProfil{
    id_customer: number;
    name: string;
    image: string;
    email: string
    key: string;
    card?: DigitCard;

    constructor(profil){
        this.id_customer = profil.id_customer;
        this.name = `${profil.firstname} ${profil.lastname}`;
        this.email = profil.email;
        this.key = profil.secure_key;
        this.image = profil.image ? `${environment.image_url}${profil.image}` : "/assets/img/default.png";
        if(profil.card){
            this.card = {
                codebar : profil.card.codebar,
                image : profil.card.image ? `${environment.image_url}${profil.card.image}` : null,
                old_digit_card : profil.card.id_old_digit_card
            }
        }
    }
}

export interface DigitCard{
    codebar : string, 
    image: string,
    old_digit_card: string
}