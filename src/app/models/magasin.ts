export class magasin {
    id: number;
    image: string;
    name: string;
    phone: string;
    email: string;
    country: string;
    latitude: number;
    longitude: number;
    address: string;

    constructor(shop) {
        this.id = shop.id;
        this.image = shop.image;
        this.name = shop.name;
        this.phone = shop.phone;
        this.email = shop.email;
        this.country = shop.country;
        this.latitude = shop.latitude;
        this.longitude = shop.longitude;
        this.address = shop.adresse;

    }
}