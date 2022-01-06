import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const ResponseContextFetcher = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        return context
    },
);
