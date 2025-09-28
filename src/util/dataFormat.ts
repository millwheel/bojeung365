/**
 * 오늘이면 "HH:mm" 형식으로,
 * 오늘이 아니면 "YYYY-MM-DD" 형식으로 반환합니다.
 *
 * @param dateStr "YYYY-MM-DD HH:mm" 형식의 문자열
 */
export function formatDate(dateStr: string): string {
    const [ymd, hm] = dateStr.split(" ");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const todayStr = `${yyyy}-${mm}-${dd}`;

    return ymd === todayStr ? hm : ymd;
}