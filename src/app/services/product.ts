export class Product {
    id: number;
    name: string;
    price:number;
    currency:string;
    store_name:string;
    store_id:number;
    image : {
        src:string,
        alt:string,
        title:string
     };
}