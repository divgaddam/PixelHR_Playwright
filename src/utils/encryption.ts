import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';

function getEncryptionKey(): string {
    const key = process.env.PIXELHR_ENCRYPTION_KEY ?? 'PixelHR-Default-32Byte-Key-123';
    return key.padEnd(32, '0').slice(0, 32);
}

export function encryptString(value: string): string {
    const iv = crypto.randomBytes(12);
    const key = crypto.createHash('sha256').update(getEncryptionKey()).digest();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decryptString(value: string): string {
    const buffer = Buffer.from(value, 'base64');

    if (buffer.length < 28) {
        throw new Error('Invalid encrypted value provided for password decryption.');
    }

    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);
    const key = crypto.createHash('sha256').update(getEncryptionKey()).digest();
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}

export function getLoginPassword(): string {
    const encryptedPassword = process.env.PIXELHR_PASSWORD_ENCRYPTED;

    if (encryptedPassword) {
        return decryptString(encryptedPassword);
    }

    const plainPassword = process.env.PIXELHR_PASSWORD;
    if (!plainPassword) {
        throw new Error('No password configured. Set PIXELHR_PASSWORD or PIXELHR_PASSWORD_ENCRYPTED in your .env file.');
    }

    return plainPassword;
}
