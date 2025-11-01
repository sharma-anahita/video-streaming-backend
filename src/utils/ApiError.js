class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.name = "ApiError";
        if (!stack) {
            this.stack = Error.captureStackTrace(this, constructor);
        }
    }
}

export { ApiError };
