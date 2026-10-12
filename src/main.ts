import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerMiddleware = new LoggerMiddleware();
  app.use((req, res, next) => loggerMiddleware.use(req, res, next));


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('LaSobremesa API')
    .setDescription('API Backend para el ecommerce LaSobremesa')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
