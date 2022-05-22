import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './module/register/register.module';
import { LoginModule } from './module/login/login.module';
import { ArticleModule } from './module/article/article.module';

@Module({
  imports: [RegisterModule, LoginModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
