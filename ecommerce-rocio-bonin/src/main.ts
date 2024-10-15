import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middleware/errors.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
  }));

  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.use(loggerGlobal);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Proyecto Nest')
  .setDescription('Esta es una api construida con nest, es un ecommerce.')
  .setVersion('0.0.1')
  .addBearerAuth()
  .build();

  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log("La inserción de categorias ha terminado");

  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();
  console.log("La inserción de productos ha terminado");

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();