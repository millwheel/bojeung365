const ACCESS_TOKEN_KEY = 'accessToken';

export interface Tokens {
    accessToken: string;
    tokenType: string;
}

export function setTokens(tokens: Tokens): void {
    if (typeof window === 'undefined') return; // SSR 환경에서는 실행하지 않음

    try {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    } catch (error) {
        console.error('토큰 저장 실패:', error);
    }
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;

    try {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
        console.error('accessToken 조회 실패:', error);
        return null;
    }
}

export function clearTokens(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
        console.error('토큰 삭제 실패:', error);
    }
}