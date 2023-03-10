import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mongo-graphql'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
