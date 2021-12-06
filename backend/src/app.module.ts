import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaitingRoomModule } from './waiting-room/waiting-room.module';

@Module({
  imports: [WaitingRoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
