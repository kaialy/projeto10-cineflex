import { useEffect, useState } from "react"
import styled from "styled-components"
import { seatColors } from "../../constants/colors"

export default function Seat({ seat, handleSeats, isSelected }) {
    const [status, setStatus] = useState("selected")

    useEffect(() => {
        if (isSelected) {
            setStatus("selected")
        } else if (seat.isAvailable) {
            setStatus("available")
        } else {
            setStatus("unavailable")
        }
    }, [isSelected, seats])

    return (
        <SeatItem status={status} onClick={() => handleSeats(seat)}>
            {seat.name}
        </SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => seatColors[props.status].border};
    background-color: ${props => seatColors[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`