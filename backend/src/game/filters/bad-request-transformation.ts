import {BadRequestException, ArgumentsHost, Catch} from "@nestjs/common";
import {WsException} from "@nestjs/websockets";
import {WsAckExceptionFilter} from "./ws-ack-exception-filter";

@Catch(BadRequestException)
export class BadRequestTransformationFilter extends WsAckExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        host.switchToWs().getClient()
        const properException = new WsException({action: 'new-user', error: exception.getResponse()});
        super.catch(properException, host);
    }
}
