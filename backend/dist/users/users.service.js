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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prismaService/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUser(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async createUser(email, password) {
        const existing = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('email already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prismaService.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map