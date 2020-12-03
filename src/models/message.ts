export enum MessageType {
    error,
    success,
}

export type Message = {
    text: string;
    messageType: MessageType;
};