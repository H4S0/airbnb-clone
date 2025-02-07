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
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prismaService/prisma.service");
let ApplicationService = class ApplicationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createApplication(data) {
        const { fullName, email, phoneNumber, dateRange, adults, kids, userId, listingId, } = data;
        return this.prisma.application.create({
            data: {
                fullName,
                email,
                phoneNumber,
                dateRange,
                adults,
                kids,
                user: { connect: { id: userId } },
                Listing: { connect: { id: listingId } },
            },
        });
    }
    async updateApplication(id, createApplicationDto) {
        return this.prisma.application.update({
            where: { id: Number(id) },
            data: createApplicationDto,
        });
    }
    async deleteApplicationOnDecline(id) {
        return this.prisma.application.delete({
            where: { id: id },
        });
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map