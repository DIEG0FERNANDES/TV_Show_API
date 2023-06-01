export class User {
    id: string
    title: string
    premiere: Date
    language: string
    main_genre: string

    constructor(id: string, title: string, premiere: Date, language: string,main_genre: string) {
        this.id = id
        this.title = title
        this.premiere = premiere
        this.language = language
        this.main_genre = main_genre
    }
}