export class User {
    id: string
    title: string
    premiere: Date
    is_running: boolean
    language: string
    main_genre: string
    poster_url: string

    constructor(id: string, title: string, premiere: Date, is_running: boolean, language: string,
        main_genre: string, poster_url: string) {
        this.id = id
        this.title = title
        this.premiere = premiere
        this.is_running = is_running
        this.language = language
        this.main_genre = main_genre
        this.poster_url = poster_url
    }
}