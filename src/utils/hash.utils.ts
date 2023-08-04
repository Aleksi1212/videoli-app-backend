import crypto from 'crypto';

function generateId(input: string, length: number): string {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    const truncatedHash = hash.substring(0, length);
    const alphaNumericHash = truncatedHash.replace(/[^a-zA-Z0-9]/g, '');

    return alphaNumericHash;
}

export default generateId;
