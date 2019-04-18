export class FormObject {

    private id: Number;
    private formName: string;
    private make: string;
    private model: string;
    private price: string;
    private tag: string;

    // constructor(id: Number, formName: string, make: string, model: string, price: string, tag: string) {}
    constructor() {}
    
    getId(): Number{
        return this.id;
    }

    setId(id: Number): void {
        this.id = id;
    }

    getFormName(): string {
        return this.formName;
    }
    
    setFormName(formName: string) {
        this.formName =  formName;
    }

    getMake(): string {
        return this.make;
    }
    
    setMake(make: string): void {
        this.make = make;
    }

    getModel(): string {
        return this.model;
    }
    
    setModel(model: string): void {
        this.model = model;
    }

    getPrice(): string {
        return this.price;
    }
    
    setPrice(price: string): void {
        this.price = price;
    }

    getTag(): string {
        return this.tag;
    }
    
    setTag(tag: string): void {
        this.tag = tag;
    }

}