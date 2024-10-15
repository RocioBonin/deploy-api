import { Injectable } from "@nestjs/common";
import { OrderDetail } from "./entities/order-detail.entity";
import { CreateOrderDetailDto } from "./dto/create-orderDetail.dto";
import { OrderDetailRepository } from "./orderDetail.repository";

@Injectable()
export class OrderDetailsService {
    constructor( private readonly orderDetailRepository: OrderDetailRepository ) {}
    
    async createOrderDetail(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
        return this.orderDetailRepository.createOrderDetail(createOrderDetailDto)
    }
}