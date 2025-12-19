export interface IConversation {
    id: number;
    user1Id: number;
    user2Id: number;
    lastMessage?: string;
    lastMessageAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    user1?: IUser;
    user2?: IUser;
}

export interface IMessage {
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    sender?: IUser;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    avatar?: {
        fileUrl: string;
    };
}

export interface ICreateConversation {
    user1Id: number;
    user2Id: number;
}

export interface ISendMessage {
    conversationId: number;
    senderId: number;
    content: string;
}

export interface IGetMessages {
    conversationId: number;
    page?: number;
    limit?: number;
}

export interface IGetConversations {
    userId: number;
    page?: number;
    limit?: number;
}

export interface IMarkAsRead {
    conversationId: number;
    userId: number;
}

