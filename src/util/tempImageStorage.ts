export type TempImageEntry = {
    objectUrl: string;
    file: File;
    alt: string;
};

export class TempImageStorage {
    private map = new Map<string, TempImageEntry>();

    add(entry: TempImageEntry) {
        this.map.set(entry.objectUrl, entry);
    }

    get(objectUrl: string) {
        return this.map.get(objectUrl);
    }

    /** 업로드 완료/삭제 등으로 더이상 필요없는 객체 제거 + URL 해제 */
    remove(objectUrl: string) {
        const it = this.map.get(objectUrl);
        if (it) {
            URL.revokeObjectURL(it.objectUrl);
            this.map.delete(objectUrl);
        }
    }

    /** 컴포넌트 unmount 시 정리용 */
    revokeAll() {
        for (const { objectUrl } of this.map.values()) {
            URL.revokeObjectURL(objectUrl);
        }
        this.map.clear();
    }
}
