import {BadRequestException, ArgumentsHost, Catch} from "@nestjs/common";
import {BaseWsExceptionFilter, WsException} from "@nestjs/websockets";

@Catch(BadRequestException)
export class BadRequestTransformationFilter extends BaseWsExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        console.log(exception.getResponse())
        host.switchToWs().getClient()
        const properException = new WsException({action: 'new-user', error: exception.getResponse()});
        super.catch(properException, host);
    }
}
