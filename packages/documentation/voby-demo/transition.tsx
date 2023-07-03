import { render, $ } from "voby"
import {Button} from "@react-md/button"
import {Collapse} from "@react-md/transition"
import "@react-md/button/dist/styles.scss"
import "@react-md/transition/dist/styles.scss"

const collapse = ()=>{
    const collapsed = $(true)

    return (
        <>
        <h1>Collapse Transition Demo</h1>
        <Button onClick={() => collapsed(!collapsed())}>Toggle</Button>
        <Collapse collapsed={collapsed}>
          <div>This is my collapsible content!</div>
        </Collapse>
      </>
    )
}

render(collapse, document.body)