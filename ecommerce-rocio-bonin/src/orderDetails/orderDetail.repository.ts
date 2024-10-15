import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/order-detail.entity";
import { Repository } from "typeorm";
import { CreateOrderDetailDto } from "./dto/create-orderDetail.dto";

@Injectable()
export class OrderDetailRepository {
    constructor(
        @InjectRepository(OrderDetail)
        private readonly repository: Repository <OrderDetail>
    ) {}

    async createOrderDetail(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
        const orderDetailEntity = this.repository.create(createOrderDetailDto);
    
        return await this.repository.save(orderDetailEntity);
      }
}