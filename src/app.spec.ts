import { App } from "./app";
import { Bike } from "./bike";
import { BikeNotFoundError } from "./errors/bike-not-found-error";
import { UnavailableBikeError } from "./errors/unavailable-bike-error";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { Location } from "./location";
import { User } from "./user";

describe("App", () => {
    it("should find the user by email", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        expect(app.findUser(user.email)).toEqual(user);
    });

    it("should receive an error if tried to find user by email", () => {
        const app = new App();
        expect(() => app.findUser("teste@email.com")).toThrowError(UserNotFoundError);
    });

    it("should add a user", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        expect(app.users).toContain(user);
    });

    it("should receive an error if tried to add a user with the same email", async () => {
        try {
            const app = new App();
            const user = new User("Jose", "teste@email.com", "123");
            await app.registerUser(user);
            await app.registerUser(user);
        } catch (error) {
            expect(error).toStrictEqual(new Error("Duplicate user."));
        }
    });

    it("should authenticate the user", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123");
        await app.registerUser(user);
        const authenticate = await app.authenticate("teste@email.com", "123");
        expect(authenticate).toBeTruthy();
    });

    it("should receive an error if tried to authenticate the user", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        const authenticate = await app.authenticate(user.email, "1234");
        expect(authenticate).toBeFalsy();
    });

    it("should register a bike", () => {
        const app = new App();
        const bike = new Bike("caloi mountainbike", "mountain bike", 1234, 1234, 100.0, "My bike", 5, [], true, new Location(0.0, 0.0), "1");
        expect(app.registerBike(bike)).toEqual(bike.id);
    });

    it("should remove a user", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        app.removeUser(user.email);
        expect(app.users).not.toContain(user);
    });

    it("should receive an error if tried to remove a user", () => {
        const app = new App();
        expect(() => app.removeUser("teste")).toThrowError(Error);
    });

    it("should rent a bike", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        const bike = new Bike("caloi mountainbike", "mountain bike", 1234, 1234, 100.0, "My bike", 5, [], true, new Location(0.0, 0.0), "1");
        app.registerBike(bike);
        app.rentBike(bike.id, user.email);
        expect(bike.available).toBeFalsy();
    });

    it("should not rent a bike if its not available", async () => {
        const app = new App();
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        const bike = new Bike("caloi mountainbike", "mountain bike", 1234, 1234, 100.0, "My bike", 5, [], false, new Location(0.0, 0.0), "1");
        app.registerBike(bike);
        expect(() => app.rentBike(bike.id, user.email)).toThrowError(UnavailableBikeError);
    });

    it("should receive an error if tried to return a bike", () => {
        const app = new App();
        expect(() => app.returnBike("1", "1")).toThrowError(Error);
    });

    it("should return a bike", async () => {
        const app = new App();
        const bike = new Bike("caloi mountainbike", "mountain bike", 1234, 1234, 100.0, "My bike", 5, [], true, new Location(0.0, 0.0), "1");
        const user = new User("Jose", "teste@email.com", "123", "1");
        await app.registerUser(user);
        app.registerBike(bike);
        app.rentBike(bike.id, user.email);
        app.returnBike(bike.id, user.email);
        expect(bike.available).toBeTruthy();
    });

    it("should move a bike", async () => {
        const app = new App();
        const bike = new Bike("caloi mountainbike", "mountain bike", 1234, 1234, 100.0, "My bike", 5, [], false, new Location(0.0, 0.0), "1");
        await app.registerBike(bike);
        app.moveBikeTo(bike.id, new Location(0.0, 0.0));
        expect(bike.location).toEqual(new Location(0.0, 0.0));
    });

    it("should receive an error if tried to move bike location without a bike", () => {
        const app = new App();
        expect(() => app.moveBikeTo("1", new Location(0.0, 0.0))).toThrowError(BikeNotFoundError);
    });

    it("should find a bike by id", async () => {
        const app = new App();
        const bike = new Bike("caloi mountainbike", "mountain bike", 1234, 1234, 100.0, "My bike", 5, [], false, new Location(0.0, 0.0), "1");
        await app.registerBike(bike);
        expect(app.findBike(bike.id)).toEqual(bike);
    });

    it("should receive an error if tried to find a bike by id", () => {
        const app = new App();
        expect(() => app.findBike("1")).toThrowError(BikeNotFoundError);
    });

})