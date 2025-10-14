import type {ApiError} from "@/type/errorType";

export type ApiResult<T> = {
    data: T | null;
    error: ApiError | null;
    status: number | null;
};