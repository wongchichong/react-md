import { BadgedButton } from "@react-md/badge"
import { render } from "voby"

import "@react-md/badge/dist/styles.scss"
import "@react-md/button/dist/styles.scss"

const badgedButton = ()=>{
    return(
        <>
        <h1>Badged Button Demo</h1>
        <BadgedButton id="notifications">3</BadgedButton>
        </>
    )
}

render(badgedButton, document.body)
