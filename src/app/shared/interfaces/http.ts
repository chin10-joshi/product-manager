interface ApiCallOptions {
    showLoader: boolean;
    showSnackBar: boolean;
}
interface ResponseBody {
    statusCode: number;
    message: string;
    data: any;
}


export { ApiCallOptions, ResponseBody }