import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SearchBar from '../components/SearchBar/SearchBar'


describe('SearchBar', () => {
  it('renders input with provided value', () => {
    render(<SearchBar value="apple" onChange={() => {}} />)
    expect(screen.getByDisplayValue('apple')).toBeInTheDocument()
  })

  it('calls onChange with new value on input', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'samsung' } })
    expect(onChange).toHaveBeenCalledWith('samsung')
  })

  it('renders placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })
})
