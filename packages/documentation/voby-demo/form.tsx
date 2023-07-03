import { render, $ } from "voby";
import { Form, FormMessage, TextField, Password } from "@react-md/form";
import "@react-md/form/dist/styles.scss"

const form = () => {
    const email = $("")
    const password = $("")

    return (
        <>
            <Form onSubmit={() => { console.log("submitted") }}>
                <FormMessage id="errors" role="alert" error disableWrap>
                </FormMessage>
                <TextField
                    aria-describedby="errors"
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => email(event.currentTarget.value)}
                    required
                />
                <Password
                    aria-describedby="errors"
                    id="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(event) => password(event.currentTarget.value)}
                    required
                />
            </Form>
        </>
    )
}
render(form, document.body)