export interface Position {
    x: number,
    y: number
}

export interface Time {
    start: number,
    end: number
}

export interface WatermarkOptions {
    type: string,
    content?: string,
    image?: string,
    size: number,
    time: Time,
    color?: string,
    fontSize?: number,
    fontStyle: string,
    position: Position
}

export interface Proccess {
    status: string,
    error?: string,
    filename?: string
}
export interface RedisConnection {
    connection: {
        host: string,
        port: number,
        password?: string
    }
}