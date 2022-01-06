import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const PlayerFetcher = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        return context.switchToHttp().getRequest().player
    },
);