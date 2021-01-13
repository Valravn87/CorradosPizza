// export enum Style { ChicagoThin, NewYork, Sicilian, ChicagoDeep, StLouis };
export enum Size { Small, Medium, Large, XLarge, Huge };

export interface IPizza{
    style: string; 
    size?: Size;
    toppings: string[];
}

export class Pizza implements IPizza {
    constructor(public style: string, public size?: Size, ...toppers: string[]) { 
        this.toppings = toppers;
    }

    public toppings: string[];
}