import { render } from "voby"
import "@react-md/button/dist/styles.scss"
import "./elevation.scss"
import {Button} from "@react-md/button"

const elevation = ()=>{
    return (
        <Button className={"elevation${elevation}"}>elevation 1</Button>
    )
}

render(elevation, document.body)