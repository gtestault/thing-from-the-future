import {Module} from '@nestjs/common';
import {PlayerModule} from "../player/player.module";
import {WsGuard} from "./guards/ws.guard";

@Module({
    providers: [WsGuard],
    imports: [
        PlayerModule,
    ],
    exports: [WsGuard, PlayerModule]
})
export class AuthenticationModule {
}
