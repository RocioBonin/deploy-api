import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./order.service";
import { AuthGuard } from "../Auth/authGuard/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrdersService) {}
        
        @ApiBearerAuth()
        @Get(':id')
        @UseGuards(AuthGuard)
        getOrder( @Param('id', ParseUUIDPipe) id: string) {
            return this.orderService.getOrder(id);
        }

        @ApiBearerAuth()
        @Post()
        @UseGuards(AuthGuard)
        addOrder(@Body() createOrderDto: CreateOrderDto) {
            return this.orderService.addOrder(createOrderDto)
        }
}