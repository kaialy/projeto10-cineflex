import styled from "styled-components"
import { textColor } from "../../constants/colors"
import Footer from "../../components/Footer/Footer"
import Seat from "../../components/Seat/Seat"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/urls"
import Caption from "./Caption"
import BuyerForm from "./BuyerForm"

export default function SeatsPage({setSuccessInfo}) {
    const { idSessao } = useParams()
    const [session, setSession] = useState(undefined)
    const [selectedSeats, setSelectedSeats] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/showtimes/${idSessao}/seats`)
            .then(res => setSession(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    function handleSeats(seat) {
        if (seat.isAvailable === false) {
            alert("Esse assento não está disponível")
        } else {
            const isSelected = selectedSeats.some(s => seat.id === s.id)
            if (isSelected) {
                const newList = selectedSeats.filter(s => seat.id !== s.id)
                setSelectedSeats(newList)
            } else {
                setSelectedSeats([...selectedSeats, seat])
            }
        }
    }

    if (!session) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map(seat => (
                    <Seat
                        key={seat.id}
                        seat={seat}
                        handleSeats={handleSeats}
                        isSelected={selectedSeats.some(s => seat.id === s.id)}
                    />
                ))}
            </SeatsContainer>

            <Caption />

            <BuyerForm 
                session={session} 
                selectedSeats={selectedSeats} 
                setSelectedSeats={setSelectedSeats} 
                setSuccessInfo={setSuccessInfo}
            />

            <Footer
                title={session.movie.title}
                poster={session.movie.posterURL}
                weekday={session.day.weekday}
                hour={session.name}
            />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: ${textColor};
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`