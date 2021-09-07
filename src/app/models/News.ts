export interface News{
    articles?: [
        {
            title?:String
            description?: String,
            content?: String,
            url?: String,
            image: String,
            publishedAt: String,
            source?: {
                name?: String,
                url?: String
            }
        }
    ]
}