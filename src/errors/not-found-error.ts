export class NotFoundError implements Error {
    name: string = 'NotFoundError';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
