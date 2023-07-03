import { LinearProgress, CircularProgress } from "@react-md/progress"
import { Divider } from "@react-md/divider"

import "@react-md/progress/dist/styles.scss"
import { render } from "voby"

const progress = () => {
    return (
        <>
            <h1>Progress Demo</h1>

            <LinearProgress
                id="determinate-linear-progress"
            />
            <Divider />
            <h2>Circular Progress</h2>
            <CircularProgress id="testCircle" />
        </>
    )
}

render(progress, document.body)