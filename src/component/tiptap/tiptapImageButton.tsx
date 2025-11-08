"use client";

import { useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "@/lib/imageFileApi";

export default function TiptapImageButton({ editor, category }: { editor: Editor, category: string }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);

    const openFilePicker = () => fileInputRef.current?.click();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        setUploading(true);
        try {
            const { data, error } = await uploadImage(file, category);
            if (error || !data) {
                alert(`[업로드 실패] ${error?.message ?? "알 수 없는 오류"}`);
                return;
            }

            editor
                .chain()
                .focus()
                .setImage({ src: data.publicUrl, alt: data.originalFilename })
                .run();
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={openFilePicker}
                disabled={uploading}
                className={`px-1 py-1 rounded-lg border border-gray-300 transition-colors cursor-pointer flex items-center gap-1 ${
                    uploading
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
            >
                <ImagePlus className="w-4 h-4" />
                <span className="text-xs">{uploading ? "업로드 중..." : "이미지"}</span>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}
