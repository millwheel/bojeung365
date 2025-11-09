import {JSONContent} from "@tiptap/core";
import {apiPost} from "@/lib/api";
import {FileMetaResponse} from "@/type/file";
import { TempImageStorage } from "./tempImageStorage";

export async function uploadRichTextImages(
    draftJson: JSONContent,
    storage: TempImageStorage,
    category: string
): Promise<{ finalJson: JSONContent; srcMap: Record<string, string> }> {

    // 문서에 실제 남아있는 blob 이미지들만 대상
    const blobSrcs = collectBlobSrcs(draftJson);

    // 업로드 (blob 기준으로 이미지 파일 업로드)
    const srcMap: Record<string, string> = {}; // blob -> publicUrl
    for (const blob of blobSrcs) {
        const entry = storage.get(blob);
        if (!entry) continue; // 이미 삭제된 이미지일 수 있음
        const formData = new FormData();
        formData.append("file", entry.file);
        formData.append("category", category);

        const { data, error } = await apiPost<FileMetaResponse>("/files/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (error || !data) throw new Error(`[업로드 실패] ${error?.message ?? "알 수 없는 오류"}`);

        srcMap[blob] = data.publicUrl;
    }

    // JSON 치환
    const finalJson = replaceTempSrcs(draftJson, srcMap);

    return { finalJson, srcMap };
}

const collectBlobSrcs = (json: JSONContent): string[] => {
    const set = new Set<string>();
    const walk = (node?: JSONContent) => {
        if (!node) return;
        if (node.type === "image" && typeof node.attrs?.src === "string") {
            const src = node.attrs.src;
            if (src.startsWith("blob:")) set.add(src);
        }
        node.content?.forEach(walk);
    };
    walk(json);
    return Array.from(set);
};

const replaceTempSrcs = (json: JSONContent, map: Record<string, string>): JSONContent => {
    const deep = (node: JSONContent): JSONContent => {
        let next = { ...node };
        if (next.type === "image" && typeof next.attrs?.src === "string") {
            const src = next.attrs.src;
            if (map[src]) {
                next = {
                    ...next,
                    attrs: {
                        ...next.attrs,
                        src: map[src], // publicUrl로 치환
                    },
                };
            }
        }
        if (next.content) {
            next = { ...next, content: next.content.map(deep) };
        }
        return next;
    };
    return deep(json);
};