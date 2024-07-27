class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        success,
        errors=[]
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors
    }
};

export default ApiError;