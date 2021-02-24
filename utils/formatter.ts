const formatter = new Intl.NumberFormat('en-US');
export function formatNumber(number: number) {
    return formatter.format(number);
}