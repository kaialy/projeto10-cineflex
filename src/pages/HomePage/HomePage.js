import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MovieCard from "../../components/MovieCard/MovieCard"
import { BASE_URL } from "../../constants/urls"
import { PageContainer, ListContainer } from "./styled"

export default function HomePage() {
    const [movies, setMovies] = useState(undefined)

    useEffect(() => {
        axios.get(`${BASE_URL}/movies`)
            .then(res => setMovies(res.data))
            .catch(err => console.log(err.response.data))
    }, [])


    if (!movies) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {movies.map(m => (
                    <Link to={`/sessoes/${m.id}`} key={m.id}>
                        <MovieCard posterURL={m.posterURL} />
                    </Link>
                    
                ))}
            </ListContainer>
        </PageContainer>
    )
}

