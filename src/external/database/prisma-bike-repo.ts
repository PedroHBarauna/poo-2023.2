import { BikeRepo } from "../../ports/bike-repo";
import { Location } from "../../location";
import prisma from "./db";
import { Bike } from "../../bike";

export class PrismaBikeRepo implements BikeRepo {
   async find (id: string): Promise<any> {
      return await prisma.bike.findUnique({
         where: {
            id: id
         }
      });
   }

   async list (): Promise<any[]> {
      return await prisma.bike.findMany();
   }

    async findByLocation (location: Location): Promise<any[]> {
        return await prisma.bike.findMany({
          where: {
              latitude: location.latitude,
              longitude: location.longitude
          }
        });
    }

    async add(bike: Bike): Promise<string> {
        const newBike = await prisma.bike.create({
            data: {
              name: bike.name,
              type: bike.type,
              bodySize: bike.bodySize,
              maxLoad: bike.maxLoad,
              rate: bike.rate,
              description: bike.description,
              ratings: bike.ratings,
              imageUrls: {
                create: [
                  ...bike.imageUrls.map((url: string) => ({ url }))
                ]
              },
              available: bike.available,
              latitude: bike.location.latitude,
              longitude: bike.location.longitude,
            }
        });
        return newBike.id;
    }

    async remove(id: string): Promise<void> {
        await prisma.bike.delete({
            where: {
                id: id
            }
        });
    }

    async updateAvailability(id: string, available: boolean): Promise<void> {
        await prisma.bike.update({
            where: {
                id: id
            },
            data: {
                available: available
            }
        });
    }

    async updateLocation(id: string, latitude: number, longitude: number): Promise<void> {
        await prisma.bike.update({
            where: {
                id: id
            },
            data: {
                latitude: latitude,
                longitude: longitude
            }
        });
    }
}
