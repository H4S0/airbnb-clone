"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prismaService/prisma.service");
let ListingService = class ListingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createListing(data) {
        const { category, price, listingLocation: { country, city, address, postalNumber }, listingDetails: { name, description, beds, bedRoom, livingRoom, wc, amenities, maxPerson, isPet, }, } = data;
        return this.prisma.listing.create({
            data: {
                category,
                country,
                city,
                address,
                postalNumber,
                price,
                listingName: name,
                description,
                beds,
                bedRoom,
                livingRoom,
                wc,
                maxPerson,
                isPet,
                Amenities: amenities,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
            },
        });
    }
    async getAllListings() {
        return this.prisma.listing.findMany();
    }
    async getListingByID(id) {
        return this.prisma.listing.findUnique({
            where: {
                id: id,
            },
            select: {
                listingName: true,
                description: true,
                country: true,
                city: true,
                address: true,
                postalNumber: true,
                wc: true,
                livingRoom: true,
                bedRoom: true,
                beds: true,
                Amenities: true,
                category: true,
                price: true,
                maxPerson: true,
                isPet: true,
            },
        });
    }
    async updateListing(id, data) {
        return this.prisma.listing.update({
            where: { id },
            data,
        });
    }
    async deleteListing(id) {
        return this.prisma.listing.delete({
            where: { id },
        });
    }
};
exports.ListingService = ListingService;
exports.ListingService = ListingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingService);
//# sourceMappingURL=listing.service.js.map