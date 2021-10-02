export const dateToSting = (uncheckedDate: Date): string => {
    const date = new Date(uncheckedDate);
    return (
        zeroPad(date.getDate()) +
        '.' +
        zeroPad(date.getMonth() + 1) +
        '.' +
        date.getFullYear()
    );
};

export const dateToUnixSting = (uncheckedDate: Date): string => {
    const date = uncheckedDate ? new Date(uncheckedDate) : new Date();
    return (
        date.getFullYear() +
        '-' +
        zeroPad(date.getMonth() + 1) +
        '-' +
        zeroPad(date.getDate())
    );
};

export const dateTimeToUnixSting = (uncheckedDate: Date): string => {
    const date = uncheckedDate ? new Date(uncheckedDate) : new Date();
    return (
        dateToUnixSting(date) + `T` +
        zeroPad(date.getHours()) +
        ':' +
        zeroPad(date.getMinutes()) +
        ':00'
    );
};

export const minutesToHoursString = (minutesTotal: number): string => {
    const hours = Math.floor(minutesTotal / 60);
    const minutes = minutesTotal - (hours * 60);

    return `${hours}h ${zeroPad(minutes)}m`;
};

export const minutesToHours = (minutesTotal: number): number => {
    const hours = Math.floor(minutesTotal / 60);
    const minutes = minutesTotal - (hours * 60);
    const minutesPart = Math.round(minutes * 100 / 60) / 100;

    return hours + minutesPart;
};

interface PrintAmountOptions {
    onlyAmount?: boolean
}

export const printAmount = (serialized: number, options: PrintAmountOptions = {}): string => {
    const fullPart = serialized / 100;
    const partialPart = serialized % 100;

    const amount = `${fullPart}.${zeroPad(partialPart)}`;

    if (options.onlyAmount) {
        return amount;
    }

    return `${amount},-`;
};

function zeroPad(num: number): string {
    return ('0' + num).slice(-2);
}

