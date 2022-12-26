export interface FontStyle { 
    fontSize: string
}

export interface Position {
    x: string,
    y: string
}

export interface WatermarkTextOptions {
    type: string,
    content?: string,
    size: number,
    time: string,
    color?: string,
    fontStyle?: FontStyle,
    position: Position
}

export interface WatermarkImageOptions {
    type: string,
    image?: string,
    time: string,
    size: number,
    position: Position
}