export function formatMoney (value?: string | null){
    if (!value) return "-";
    const n = Number(value);
    return Number.isFinite(n) ? n.toLocaleString() : value;
};
