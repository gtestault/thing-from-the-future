import {WsException} from "@nestjs/websockets";
import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter} from "@nestjs/common";

@Catch(WsException)
export class WsAckExceptionFilter implements ExceptionFilter {
    catch(exception: WsException | BadRequestException, host: ArgumentsHost) {
        const callbackFun = host.getArgByIndex(2)
        if (callbackFun && typeof callbackFun === 'function') {
           callbackFun({error: "ws_exception", message: exception.message})
        }
    }
}
