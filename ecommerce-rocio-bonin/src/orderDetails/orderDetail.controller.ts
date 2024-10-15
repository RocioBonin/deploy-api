import { Body, Controller, Post } from "@nestjs/common";
import { OrderDetail } from "./entities/order-detail.entity";
import { CreateOrderDetailDto } from "./dto/create-orderDetail.dto";
import { OrderDetailsService } from "./orderDetail.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('OrderDetail')
@Controller('orderDetail')
export class OrderDetailController {
    constructor( private readonly orderDetailsService: OrderDetailsService) {}

    @Post()
    createOrderDetail(@Body() createOrderDetailDto: CreateOrderDetailDto): Promise <OrderDetail> {
        return this.orderDetailsService.createOrderDetail(createOrderDetailDto)
    }
}