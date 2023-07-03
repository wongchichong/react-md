import { render } from "voby"
import { Chip } from "@react-md/chip"
import "@react-md/chip/dist/styles.scss"

const chip = ()=>{
    return(
        <>
            <h1>Chip Demo</h1>
            <Chip id="example-chip-1">I'm a chip!</Chip>;
        </>
    )
}

render(chip, document.body)