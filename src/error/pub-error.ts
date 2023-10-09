/**
 * @author WMXPY
 * @namespace Error
 * @description Pub
 */

export class PubError extends Error {

    private readonly _type: string;
    private readonly _message: string;
    private readonly _reason: any | undefined;

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message);

        this._type = type;
        this._message = message;
        this._reason = reason;

        Object.setPrototypeOf(this, PubError.prototype);
    }

    public get message(): string {

        return this._message;
    }

    public toString(): string {

        return `[${this._type}] ${this.message}`;
    }
}
