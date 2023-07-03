import { Typography } from "@react-md/typography";
import { Card, CardHeader, CardTitle, CardActions, CardContent } from "@react-md/card"
import {Button} from "@react-md/button"
import {render} from "voby"
import "@react-md/card/dist/styles.scss"
import "@react-md/button/dist/styles.scss"

const card = () => {
    return (
        <>
            <h1>Card Demo</h1>
            <Card >
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <Typography>Here is some text to display in the card.</Typography>
                </CardContent>
                <CardActions>
                    <Button>Action 1</Button>
                    <Button>Action 2</Button>
                </CardActions>
            </Card>
        </>
    )
}
render(card, document.body)