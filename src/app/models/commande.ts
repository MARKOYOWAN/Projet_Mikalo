
export class commande {
    id_order: number;
    id_customer: number;
    date: string;
    name: string;
    price: string;
    qt: number;
    payment: string;
    code: string;
    livraison: string; 
    status: string;
    reference: string;

    constructor(cm) {
        if (cm) {
            this.id_order = cm.id_order;
            this.id_customer = cm.id_customer;
            this.date = cm.date_add;
            this.name = cm.product_name;
            this.price = cm.product_price;
            this.qt = cm.product_quantity;
            this.payment = cm.payment;
            this.code = cm.iso_code;
            this.livraison = cm.livraison;
            this.reference = cm.reference;
            this.status = cm.statu_commande;
        }  
    }
}