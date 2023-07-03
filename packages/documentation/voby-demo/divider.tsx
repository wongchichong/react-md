import { Divider } from '@react-md/divider';
import { render } from 'voby';

const divider = () => {
    return (
        <>
        <h1>Divider Demo</h1>
        <Divider />
        </>
    )
}

render(divider, document.body)