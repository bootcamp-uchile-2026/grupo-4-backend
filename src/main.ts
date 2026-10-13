import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter()
  );

  const config = new DocumentBuilder()
    .setTitle('LaSobremesa API')
    .setDescription('API Backend para el ecommerce LaSobremesa')
    .setVersion('1.0')
    .addGlobalParameters({
      in: 'header',
      name: 'x-request-id',
      required: false,
      description:
        'Identificador opcional de la petición. Si se omite, se genera automáticamente.',
      schema: {
        type: 'string',
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
