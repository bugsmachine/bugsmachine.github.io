import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})

test('renders the three primary report pages in the sidebar', () => {
  render(<App />)

  const navigation = screen.getByRole('navigation', { name: /demo sections/i })

  expect(within(navigation).getByRole('link', { name: /^crawler/i })).toHaveAttribute(
    'href',
    '#crawler',
  )
  expect(within(navigation).getByRole('link', { name: /^agent/i })).toHaveAttribute(
    'href',
    '#agent',
  )
  expect(within(navigation).getByRole('link', { name: /^decisions/i })).toHaveAttribute(
    'href',
    '#decisions',
  )
})

test('uses sidebar subitems as anchors inside their report pages', () => {
  render(<App />)

  const navigation = screen.getByRole('navigation', { name: /demo sections/i })

  expect(within(navigation).getByRole('link', { name: /run snapshot/i })).toHaveAttribute(
    'href',
    '#crawler/run-snapshot',
  )
  expect(within(navigation).getByRole('link', { name: /cold rebuild/i })).toHaveAttribute(
    'href',
    '#crawler/cold-rebuild',
  )
  expect(within(navigation).getByRole('link', { name: /current mode/i })).toHaveAttribute(
    'href',
    '#agent/current-agent-mode',
  )
  expect(within(navigation).getByRole('link', { name: /access scope/i })).toHaveAttribute(
    'href',
    '#decisions/access-scope',
  )
})

test('switches between independent report pages from the sidebar', () => {
  render(<App />)

  expect(
    screen.getByRole('heading', { name: /sharepoint full-crawl corpus/i }),
  ).toBeInTheDocument()

  fireEvent.click(screen.getByRole('link', { name: /^agent/i }))

  expect(
    screen.getByRole('heading', { name: /sharepoint assistant — current build/i }),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /current mode/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /visual answers in development/i })).toBeInTheDocument()
  expect(screen.getByText(/original visual evidence/i)).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /run snapshot/i })).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('link', { name: /^decisions/i }))

  expect(
    screen.getByRole('heading', { name: /questions for the next crawl phase/i }),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /access and permissions/i })).toBeInTheDocument()
})

test('subitem clicks switch page and expose the target section', () => {
  render(<App />)

  fireEvent.click(screen.getByRole('link', { name: /external crawl/i }))

  expect(
    screen.getByRole('heading', { name: /questions for the next crawl phase/i }),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /external crawl scope/i })).toBeInTheDocument()
  expect(window.location.hash).toBe('#decisions/external-crawl')
})

test('opens and closes the mobile top navigation menu', () => {
  render(<App />)

  const menuButton = screen.getByRole('button', { name: /open navigation/i })

  expect(menuButton).toHaveAttribute('aria-expanded', 'false')

  fireEvent.click(menuButton)

  expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByLabelText(/mobile navigation panel/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /close navigation/i })).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /close navigation/i }))

  expect(menuButton).toHaveAttribute('aria-expanded', 'false')
})

test('keeps the crawler report data and evidence content', () => {
  render(<App />)

  expect(screen.getAllByText('8,530').length).toBeGreaterThan(0)
  expect(screen.getAllByText('1,577').length).toBeGreaterThan(0)
  expect(screen.getByRole('heading', { name: /cold rebuild without crawling again/i })).toBeInTheDocument()
  expect(screen.getByText(/improve conversion later without making SharePoint serve every page again/i)).toBeInTheDocument()
  expect(screen.getByText(/404 \/ page not found/i)).toBeInTheDocument()
  expect(screen.getByText(/access denied \/ request access/i)).toBeInTheDocument()
})
