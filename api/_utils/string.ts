export const format = (str: string, obj: { [key: string]: any }) => {
    let result = str;

    for (const [key, replaceValue] of Object.entries(obj)) {
        result = result.replace(new RegExp(`{${key}}`, 'g'), replaceValue);
    }

    return result;
};
