export class SpecializationModel {
    public id: Number;
    public name: string;
    public prices: SpecializationPriceModel[];
}

export class SpecializationPriceModel {
    public id: Number;
    public price: Number;
    public type: Number;
    public to_date: Date;
}