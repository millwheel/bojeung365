"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {apiPost} from "@/lib/api";
import {ReviewPostRequest} from "@/type/postRequest";

type Errors = Partial<Record<keyof ReviewPostRequest, string>>;

// 공용 인풋 노트: label/에러/인풋 묶음
const Field = ({
                   label,
                   htmlFor,
                   error,
                   children,
               }: {
    label: string;
    htmlFor: string;
    error?: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-1">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-800">
            {label}
        </label>
        {children}
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

const RatingSelect = ({
                          value,
                          onChange,
                          id,
                          placeholder = '선택',
                      }: {
    value: number | '';
    onChange: (v: number | '') => void;
    id: string;
    placeholder?: string;
}) => (
    <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
        className="w-full border border-gray-300 rounded p-2 text-black bg-white"
    >
        <option value="">{placeholder}</option>
        {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
                {n}
            </option>
        ))}
    </select>
);

export default function NewReviewPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    // 각 필드 상태
    const [title, setTitle] = useState('');
    const [siteName, setSiteName] = useState('');
    const [siteUrl, setSiteUrl] = useState('');
    const [bettingDate, setBettingDate] = useState(''); // YYYY-MM-DD
    const [bettingAmount, setBettingAmount] = useState(''); // 문자열로 보관 후 제출 시 number 변환
    const [dividend, setDividend] = useState('');
    const [winAmount, setWinAmount] = useState('');
    const [exchangeSpeed, setExchangeSpeed] = useState<number | ''>('');
    const [dividendRating, setDividendRating] = useState<number | ''>('');
    const [eventRating, setEventRating] = useState<number | ''>('');
    const [reliability, setReliability] = useState<number | ''>('');
    const [body, setBody] = useState('');

    const [errors, setErrors] = useState<Errors>({});

    const toNumber = (v: string) => (v.trim() === '' ? NaN : Number(v));
    const isValidUrl = (v: string) => {
        if (!v) return true;
        try {
            const u = new URL(v);
            return u.protocol === 'http:' || u.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const validate = (): boolean => {
        const next: Errors = {};

        if (!title.trim()) next.title = '제목을 입력하세요.';
        if (!siteName.trim()) next.siteName = '사이트명을 입력하세요.';
        if (!siteUrl.trim()) next.siteUrl = 'URL을 입력하세요';
        if (!isValidUrl(siteUrl)) next.siteUrl = '올바른 URL을 입력하세요. (http/https)';

        if (!bettingDate) next.bettingDate = '배팅 날짜를 선택하세요.';

        const numBetting = toNumber(bettingAmount);
        const numDividend = toNumber(dividend);
        const numWin = toNumber(winAmount);

        if (Number.isNaN(numBetting) || numBetting < 0) next.bettingAmount = '배팅 금액을 0 이상 숫자로 입력하세요.';
        if (Number.isNaN(numDividend) || numDividend < 0) next.dividend = '배당률을 0 이상 숫자로 입력하세요.';
        if (Number.isNaN(numWin) || numWin < 0) next.winAmount = '당첨 금액을 0 이상 숫자로 입력하세요.';

        const in15 = (n: number | '') => typeof n === 'number' && n >= 1 && n <= 5;
        if (!in15(exchangeSpeed)) next.exchangeSpeed = '교환 속도는 1~5 사이여야 합니다.';
        if (!in15(dividendRating)) next.dividendRating = '배당 평점은 1~5 사이여야 합니다.';
        if (!in15(eventRating)) next.eventRating = '이벤트 평점은 1~5 사이여야 합니다.';
        if (!in15(reliability)) next.reliability = '신뢰도는 1~5 사이여야 합니다.';

        if (!body.trim()) next.body = '본문을 입력하세요.';

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setSaving(true);
        try {
            const reviewPostRequest: ReviewPostRequest = {
                title: title.trim(),
                siteName: siteName.trim(),
                siteUrl: siteUrl.trim(),
                bettingDate, // "YYYY-MM-DD"
                bettingAmount: Number(bettingAmount),
                dividend: Number(dividend),
                winAmount: Number(winAmount),
                exchangeSpeed: exchangeSpeed as number,
                dividendRating: dividendRating as number,
                eventRating: eventRating as number,
                reliability: reliability as number,
                body: body.trim(),
            };

            const { error: saveErr } = await apiPost<void>('/posts/review', reviewPostRequest);
            if (saveErr) {
                alert(`저장 실패: ${saveErr.message}`);
                return;
            }
            router.replace('/main/review');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white">
            <h1 className="text-md md:text-xl font-bold mb-4 text-black">새 리뷰 작성</h1>

            {/* 제목 */}
            <Field label="제목" htmlFor="title" error={errors.title}>
                <input
                    id="title"
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-black"
                />
            </Field>

            {/* 사이트명 / URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="사이트명" htmlFor="siteName" error={errors.siteName}>
                    <input
                        id="siteName"
                        type="text"
                        placeholder="사이트명을 입력하세요"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    />
                </Field>
                <Field label="사이트 URL" htmlFor="siteUrl" error={errors.siteUrl}>
                    <input
                        id="siteUrl"
                        type="url"
                        placeholder="https://example.com"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    />
                </Field>
            </div>

            {/* 날짜 / 금액 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field label="배팅 날짜" htmlFor="bettingDate" error={errors.bettingDate}>
                    <input
                        id="bettingDate"
                        type="date"
                        value={bettingDate}
                        onChange={(e) => setBettingDate(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    />
                </Field>
                <Field label="배팅 금액" htmlFor="bettingAmount" error={errors.bettingAmount}>
                    <input
                        id="bettingAmount"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0"
                        value={bettingAmount}
                        onChange={(e) => setBettingAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    />
                </Field>
                <Field label="배당률" htmlFor="dividend" error={errors.dividend}>
                    <input
                        id="dividend"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="예: 1.85"
                        value={dividend}
                        onChange={(e) => setDividend(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    />
                </Field>
                <Field label="당첨 금액" htmlFor="winAmount" error={errors.winAmount}>
                    <input
                        id="winAmount"
                        type="number"
                        min={0}
                        step="1"
                        placeholder="0"
                        value={winAmount}
                        onChange={(e) => setWinAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-black"
                    />
                </Field>
            </div>

            {/* 평점 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field label="교환 속도 (1~5)" htmlFor="exchangeSpeed" error={errors.exchangeSpeed}>
                    <RatingSelect id="exchangeSpeed" value={exchangeSpeed} onChange={setExchangeSpeed} />
                </Field>
                <Field label="배당 평점 (1~5)" htmlFor="dividendRating" error={errors.dividendRating}>
                    <RatingSelect id="dividendRating" value={dividendRating} onChange={setDividendRating} />
                </Field>
                <Field label="이벤트 평점 (1~5)" htmlFor="eventRating" error={errors.eventRating}>
                    <RatingSelect id="eventRating" value={eventRating} onChange={setEventRating} />
                </Field>
                <Field label="신뢰도 (1~5)" htmlFor="reliability" error={errors.reliability}>
                    <RatingSelect id="reliability" value={reliability} onChange={setReliability} />
                </Field>
            </div>

            {/* 본문 */}
            <Field label="본문" htmlFor="body" error={errors.body}>
        <textarea
            id="body"
            placeholder="리뷰 내용을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full min-h-[160px] border border-gray-300 rounded p-2 text-black"
        />
            </Field>

            {/* 제출 버튼 */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded cursor-pointer"
                >
                    {saving ? '저장 중...' : '저장하기'}
                </button>
            </div>
        </div>
    );
}