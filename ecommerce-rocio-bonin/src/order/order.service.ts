import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersRepository } from "./order.repository";

@Injectable()
export class OrdersService {
    constructor( 
        private readonly ordersRepository: OrdersRepository
    ) {}
    
   
    async getOrder(id: string) {
        return this.ordersRepository.getOrder(id)
    }
    

    async addOrder(createOrderDto: CreateOrderDto) {
        return this.ordersRepository.addOrder(createOrderDto)
    }
}