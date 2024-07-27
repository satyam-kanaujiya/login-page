class ApiResponse{
    consturctor(
        statusCode,
        message="Success",
        success,
        data
    ){
        this.statusCode = statusCode<400;
        this.message = message;
        this.success = true;
        this.data = data;
    }
};
export default ApiResponse;