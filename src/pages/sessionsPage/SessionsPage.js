import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../../components/Footer/Footer"
import SessionCard from "../../components/SessionCard/SessionCard"
import { textColor } from "../../constants/colors"
import { BASE_URL } from "../../constants/urls"

export default function SessionsPage() {
    const { idFilme } = useParams()
    const [movie, setMovie] = useState(undefined)

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${idFilme}/showtimes`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    if (!movie) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o horário
            <ListContainer>
                {movie.days.map(m => (
                    <SessionCard movie={m} key={m.id}/>
                ))}
                
            </ListContainer>
            <Footer poster={movie.posterURL} title={movie.title} />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: ${textColor};
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    margin-top: 30px;
`