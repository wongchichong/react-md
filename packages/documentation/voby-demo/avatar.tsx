import { Avatar } from "@react-md/avatar"
import { render } from "voby"
import "@react-md/avatar/dist/styles.scss"

const avatar = () => {
    return (
        <>
        <h1>Avatar Demo</h1>
        <Avatar color="cyan">R</Avatar>
        </>
    )
}
render(avatar, document.body)