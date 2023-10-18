

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
    name:String;
    price:number;
    category:String;
    color:string;
    description:string;
    image:String;
    id:number;
}