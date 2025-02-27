import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3555;
  await app.listen(port, () => console.info(`Listening on port ${port}`));
}
bootstrap();
