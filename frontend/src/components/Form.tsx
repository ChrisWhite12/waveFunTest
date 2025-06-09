import { FormEvent, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "@tanstack/react-router";
import { Button, Card, CircularProgress, Stack, TextField, Typography } from "@mui/material";

interface FormProps {
    route: string;
    method: "login" | "register";
}

function Form({ route, method }: FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await axiosInstance.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate({ to: "/tile/list" });
            } else {
                navigate({ to: "/Login" });
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    if (loading) {
        return <CircularProgress className="loading-spinner" />;
    }

    return (
        <Stack direction='column' spacing={2} alignItems="center" justifyContent="center" sx={{ p: 2 }}>
            <Typography variant="h4">{name}</Typography>
            <Card sx={{ maxWidth: 600, padding: 2, margin: "auto" }}>
                <form onSubmit={handleSubmit} className="form-container">
                    <Stack direction="column" spacing={2}>
                        <TextField
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <TextField
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <Button className="form-button" type="submit">
                            {name}
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Stack>
    );
}

export default Form