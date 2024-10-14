import { format, parse } from 'date-fns';

// export const defaultDateFormat = "dd-MMM-yyyy";
//export const defaultTimeFormat = "HH:mm:00";


export const displayDateFormat = "dd-MMM-yyyy";
export const returnDateFormat = "ddMMyy";

export const displayTimeFormat = "HH:mm";
export const returnTimeFormat = "HHmm";


export const localISODateFormat = "yyyy-MM-dd'T'HH:mm:ss";

export const formatDateTime = (formatString: string, date?: Date | null) => {
    if (!date) return;
    console.log("Unformatted date: ", date);
    return format(date, formatString);
}

export const parseDateTime = (formatString: string, dateTimeString?: string | null) => {
    if (!dateTimeString) return;

    return parse(dateTimeString, formatString, new Date());
}
