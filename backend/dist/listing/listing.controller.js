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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingController = void 0;
const common_1 = require("@nestjs/common");
const listing_service_1 = require("./listing.service");
let ListingController = class ListingController {
    constructor(listingService) {
        this.listingService = listingService;
    }
    async createListing(createListingDto) {
        const newListing = await this.listingService.createListing(createListingDto);
        return newListing;
    }
    async getAllListings() {
        const allListings = this.listingService.getAllListings();
        return allListings;
    }
    async getListingByID(id) {
        return this.listingService.getListingByID(id);
    }
};
exports.ListingController = ListingController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListingController.prototype, "createListing", null);
__decorate([
    (0, common_1.Get)('getAllListings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListingController.prototype, "getAllListings", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ListingController.prototype, "getListingByID", null);
exports.ListingController = ListingController = __decorate([
    (0, common_1.Controller)('listing'),
    __metadata("design:paramtypes", [listing_service_1.ListingService])
], ListingController);
//# sourceMappingURL=listing.controller.js.map