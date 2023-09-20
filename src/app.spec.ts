import { App } from "./app";

describe("App", () => {
    it("should receive an error if tried to update bike location without a bike", () => {
        try{
            const app = new App();
            app.updateBikeLocation("1", 1, 1);
        }
        catch(e){
            expect(e).toStrictEqual(new Error("Bike not found"));
        }
    });

    it("should receive an error if tried to update bike location without a bike 2", () => {
        const app = new App();
        expect(()=> {
            app.updateBikeLocation("1", 1, 1);
        }).toThrow(new Error("Bike not found"));  
    })
})