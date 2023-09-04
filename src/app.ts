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

    findBike(bikeId: string): Bike | undefined{
        return this.bikes.find(bike => { return bike.id === bikeId});
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

        const array = this.rents.filter(bikes => bikeId === bikes.bike.id)
        
        const newRent = Rent.create(array, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string): void{
        const rent = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail);
        if(!rent){
            throw new Error('Rent not found');
        }
        const dataReturned = Rent.returnBike(rent);

        console.log(dataReturned)
    }
}