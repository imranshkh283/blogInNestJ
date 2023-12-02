import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

const arr = ['PROD', 'DEV', 'STAGE'];
const IS_DEV_MODE = false;
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'EVENT_STORE',
      useFactory: (index: number = 1) => {
        const val = IS_DEV_MODE ? arr[index] : arr[index];
        console.log(index);

        return `${val}`;
      },
      inject: [{ token: 'INDEX', optional: true }],
    },
    {
      provide: 'INDEX',
      useValue: 1,
    },
    AppService,
  ],
})
export class AppModule {}
