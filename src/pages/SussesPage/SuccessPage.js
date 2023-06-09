import { Link } from "react-router-dom"
import styled from "styled-components"
import { textColor } from "../../constants/colors"

export default function SuccessPage({ successInfo }) {
    const { movie, date, hour, buyer, cpf, seats } = successInfo

    return (
        <PageContainer>
            <Title>Pedido feito <br /> com sucesso!</Title>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{movie}</p>
                <p>{date} - {hour}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {seats.map(s => <p key={s}>Assento {s}</p>)}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {buyer}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <Link to="/">
                <button>Voltar para Home</button>
            </Link>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: ${textColor};
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
`
const Title = styled.h1`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247A6B;
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`