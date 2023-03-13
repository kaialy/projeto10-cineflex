import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls"

export default function BuyerForm({ session, selectedSeats, setSuccessInfo, setSelectedSeats }) {
    const [form, setForm] = useState({ name: "", cpf: "" })
    const navigate = useNavigate()

    function handleForm(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function buyTickets(e) {
        e.preventDefault()

        const body = {
            ids: selectedSeats.map(s => s.id),
            ...form
        }

        const info = {
            movie: session.movie.title,
            date: session.day.date,
            hour: session.name,
            buyer: form.name,
            cpf: form.cpf,
            seats: selectedSeats.map(s => s.name)
        }


        axios.post(`${BASE_URL}/seats/book-many`, body)
            .then(res => {
                setSuccessInfo(info)
                setSelectedSeats([])
                navigate("/sucesso")
            })
            .catch(err => alert(err.response.data))

    }

    return (
        <Form onSubmit={buyTickets}>
            Nome do Comprador:
            <input
                name="name"
                value={form.name}
                onChange={handleForm}
                placeholder="Digite seu nome..."
                type="text"
            />

            CPF do Comprador:
            <input
                name="cpf"
                value={form.cpf}
                onChange={handleForm}
                placeholder="Digite seu CPF..."
                type="number"
            />
            <button type="submit">Reservar Assento(s)</button>
        </Form>
    )
}

const Form = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`