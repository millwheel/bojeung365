export function formatBoardDateTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);

    const isSameDay =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    const isSameYear = date.getFullYear() === now.getFullYear();

    if (isSameDay) {
        // 시와 분까지 같다면 "N초 전" 표시
        if (
            date.getHours() === now.getHours() &&
            date.getMinutes() === now.getMinutes()
        ) {
            return `${diffSeconds}초 전`;
        }

        // 오늘 작성된 글이면 "시:분" 형태 (예: 14:32)
        return date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    } else if (isSameYear) {
        // 같은 해면 "월.일" 형태 (예: 10.10)
        return `${date.getMonth() + 1}.${date.getDate()}`;
    } else {
        // 다르면 "년도.월.일" 형태 (예: 2024.12.30)
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    }
}

export function formatContentDate(dateStr?: string | null) {
    if (!dateStr) return "-";

    // 기대되는 포맷: "YYYY-MM-DD"
    const [year, month, day] = dateStr.split("-");

    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}