import Form from "../components/Form"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Register')({
    component: Register,
})

function Register() {
    return <Form route="/api/user/register/" method="register" />
}