export const base64Encode = (str: string) =>
    Buffer.from(str, 'utf8').toString('base64');

export const base64EncodeObj = (obj: any) =>
    Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');

export const base64DecodeObj = <T>(str: string) => {
    if (!str) {
        return undefined;
    }

    try {
        return JSON.parse(Buffer.from(str, 'base64').toString('utf8')) as T;
    } catch (error) {
        // ignore errors
        return undefined;
    }
};
