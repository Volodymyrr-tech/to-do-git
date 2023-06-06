import { useState, FormEvent } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { StarFill } from 'react-bootstrap-icons'
import { InputRepoProps } from '../types/types'

const InputRepo: React.FC<InputRepoProps> = ({ url, setUrl, stars }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setUrl(input)
    setInput('')
  }

  function formatRepoName(url: string) {
    const regex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)(?:\/|$)/
    const match = url.match(regex)
    if (match) {
      const username = match[1].charAt(0).toUpperCase() + match[1].slice(1)
      const repoName = match[2].charAt(0).toUpperCase() + match[2].slice(1)
      return `${username} > ${repoName}`
    } else {
      return null
    }
  }

  return (
    <>
      <Form className="mt-5 mb-3" onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col md="9">
              <Form.Control
                type="text"
                placeholder="Enter repo URL"
                size="lg"
                style={{ border: '1px solid black', borderRadius: 0 }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
              ></Form.Control>
            </Col>
            <Col>
              <Button
                type="submit"
                size="lg"
                variant="outline-dark"
                style={{ width: '100%', borderRadius: 0 }}
              >
                Load Issues
              </Button>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col className="p-0" md={2}>
              <Nav>
                <Nav.Link href={url}>{formatRepoName(url)}</Nav.Link>
              </Nav>
            </Col>
            <Col md={2}>
              <span className="d-flex align-items-center">
                <StarFill className="mr-5" color="#f0c454" />
                {stars.stargazers_count / 1000} K stars
              </span>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  )
}
export default InputRepo
