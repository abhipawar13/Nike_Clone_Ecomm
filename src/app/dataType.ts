

export interface signUp  {
    name:String;
    email:String;
    password:String
}

export interface login{
    email:String;
    password:String;
}

export interface product{
    // localAddTOCart(productData: product): unknown;
    name:String;
    price:number;
    category:String;
    color:string;
    description:string;
    image:String;
    id:number;
    quantity:undefined|number;
    productId:undefined|number;
    rating: number;
}

export interface cart{
    name:String;
    price:number;
    category:String;
    color:string;
    description:string;
    image:String;
    id:number | undefined;
    quantity:undefined|number;
    userId:number,
    productId:number,
    
}

export interface priceSummary{
    price: number,
    discount:number,
    tax:number,
    delivery:number,
    total:number 

}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}