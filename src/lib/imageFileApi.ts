import {ApiResult} from "@/type/apiResult";
import {FileMetaResponse} from "@/type/file";
import {apiPost} from "@/lib/api";
import {clientError} from "@/type/error";

export async function uploadImage(
    file: File,
    category?: string
): Promise<ApiResult<FileMetaResponse>> {

    if (!file) {
        return { data: null, error: clientError("파일이 없습니다."), status: null };
    }
    if (!file.type.startsWith("image/")) {
        return {
            data: null,
            error: clientError("이미지 파일만 업로드할 수 있습니다."),
            status: null,
        };
    }

    const formData = new FormData();
    formData.append("file", file);
    if (category) formData.append("category", category);

    return apiPost<FileMetaResponse>("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}