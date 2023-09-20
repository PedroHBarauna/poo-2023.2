import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import 'crypto';

export class App {
    users: User[] = [];
    bikes: Bike[] = [];
    rents: Rent[] = [];

    findUser(email: string): User | undefined{
        return this.users.find(user => { return user.email === email});
    }

    findBike(bikeId: string): Bike{
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if(!bike) throw new Error('Bike not found');
        return bike;
    }

    addUser(user: User): void {
        if (this.findUser(user.email)) {
            throw new Error('User with same email already registered.');
        }
        this.users.push(user);
    }

    registerBike(bike: Bike): string{
        if(this.findBike(bike.id)){
            throw new Error('Bike already registered');
        }
        this.bikes.push(bike);
        return bike.id;
    }

    removeUser(userEmail: string): void{
        const userIndex = this.users.findIndex(user => user.email === userEmail);
        this.users.splice(userIndex, 1);
    }

    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void{
        
        const bike = this.findBike(bikeId);

        if(!bike){
            throw new Error('Bike not found');
        }

        const user = this.findUser(userEmail);

        if(!user){
            throw new Error('User not found')
        }

        const array = this.rents.filter(rent => bikeId === rent.bike.id && !rent.dateReturned)
        
        const newRent = Rent.create(array, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string): void{
        const today = new Date()
        const rent = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail && !rent.dateReturned && rent.dateFrom < today);
        if(!rent){
            throw new Error('Rent not found');
        }
        const dataReturned = Rent.returnBike(rent);

        console.log(dataReturned)
    }

    listUsers(): User[]{
        console.log(this.users);
        return this.users;
    }

    listBikes(): Bike[]{
        console.log(this.bikes);
        return this.bikes;
    }

    listRents(): Rent[]{
        console.log(this.rents);
        return this.rents;
    }

    updateBikeLocation(bikeId: string, latitude: number, longitude: number): void{
        const bike = this.findBike(bikeId);
        bike.latitude = latitude;
        bike.longitude = longitude;
    }
}