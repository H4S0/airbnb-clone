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
const platform_express_1 = require("@nestjs/platform-express");
let ListingController = class ListingController {
    constructor(listingService) {
        this.listingService = listingService;
    }
    async createListing(createListingDto, images) {
        try {
            const imagesBuffers = images.map((file) => file.buffer);
            const newListing = await this.listingService.createListing({
                ...createListingDto,
                listingImage: imagesBuffers,
            });
            return newListing;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ListingController = ListingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 4)),
    __param(0, common_1.Body),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ListingController.prototype, "createListing", null);
exports.ListingController = ListingController = __decorate([
    (0, common_1.Controller)('listing'),
    __metadata("design:paramtypes", [listing_service_1.ListingService])
], ListingController);
//# sourceMappingURL=listing.controller.js.map