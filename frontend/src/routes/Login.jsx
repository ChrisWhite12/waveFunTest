import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'

export const Route = createFileRoute('/Login')({
    component: Login,
})

function Login() {
    return <Form route="/api/token/" method="login" />
}