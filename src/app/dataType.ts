

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
    localAddTOCart(productData: product): unknown;
    name:String;
    price:number;
    category:String;
    color:string;
    description:string;
    image:String;
    id:number;
    quantity:undefined|number;
}