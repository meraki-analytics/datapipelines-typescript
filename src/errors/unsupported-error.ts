export class UnsupportedError implements Error {
    name: string = 'UnsupportedError';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
