export const FormatNumber = (number: number) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + number).length / 4);
    let shortNumber = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));
    if (shortNumber % 1 !== 0) {
        shortNumber = +shortNumber.toFixed(1);
    }
    return shortNumber + suffixes[suffixNum];
};
