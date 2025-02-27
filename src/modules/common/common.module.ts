import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { LoggerService } from "./logger/logger.service";

@Module({
    imports: [DatabaseModule],
    providers: [LoggerService],
    exports: [LoggerService]
})
export class CommonModule { }