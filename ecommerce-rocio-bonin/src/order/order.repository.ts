import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository} from "typeorm";
import { CreateOrderDto, ProductsId } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/response-order.dto.ts";
import { Order } from "./entities/order.entity";
import { UserService } from "../user/user.service";
import { ProductService } from "../product/product.service";
import { CreateOrderDetailDto } from "../orderDetails/dto/create-orderDetail.dto";
import { OrderDetailsService } from "../orderDetails/orderDetail.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) 
        private  readonly ordersRepository: Repository<Order>,
        private  readonly usersService: UserService,
        private  readonly productsService: ProductService,
        private  readonly orderDetailsService: OrderDetailsService,
    ) {}
    
   
    async getOrder(id: string) {
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: ['orderDetails', 'orderDetails.products']
        });

        if(!order) {
            throw new NotFoundException(`No se encontró una orden con id: ${id}`)
        }
    
        return order;
    }
    

    async addOrder(createOrderDto: CreateOrderDto) {
        const { userId, products } = createOrderDto;

        const user = await this.usersService.getUserById(userId);

        const order = {
            user: user,
            date: new Date(),
        }

        const newOrderEntity = await this.ordersRepository.save(
            this.ordersRepository.create(order)
        )

         const total = await this.calculateTotal(products) 

         const orderDetail = new CreateOrderDetailDto();
            orderDetail.price = total;
            orderDetail.products = products;
            orderDetail.order = newOrderEntity;

        const orderDetailEntity = await this.orderDetailsService.createOrderDetail(orderDetail)

        return new OrderResponseDto(orderDetailEntity)
    }

    private async calculateTotal( products: Array<ProductsId>): Promise<number> {
        let total = 0;
        for (const product of products) {
            total += await this.productsService.buyProduct(product.id);
        }
        return total;
    }
}