import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Item from './Item.jsx'

describe('Item', () => {
  test('Komponentti renderöityy merkinnän tiedoilla', () => {
    // Määritellään merkinnän tiedot.
    const data = {
      id:          "1",
      type:        "Avovesi",
      distance:      4.50,
      swimDate: "2023-03-20",
      receiver:    "Usmin järvi"      
    }
    render(<Item data={data} />, {wrapper: BrowserRouter})
    
    // Määritetään lokaaliasetukset.
    const locale = "fi-FI"
  
    // Tyyppi
    const typeElement = screen.getByText(data.type)
    expect(typeElement).toBeInTheDocument()

    // Uintipäivä
    const swimDate = new Date(data.swimDate).toLocaleDateString(locale)
    const dateElement = screen.getByText(swimDate)
    expect(dateElement).toBeInTheDocument() 

    // Saaja
    const receiverElement = screen.getByText(data.receiver)
    expect(receiverElement).toBeInTheDocument()

  })
})
