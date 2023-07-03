import { render } from "voby";
import { MediaContainer } from "@react-md/media";

const media = () => {
    return (
        <>
            <h1>Media Demo</h1>
            <MediaContainer height={9} width={16}>
                <img src="https://picsum.photos/400/300?image=3" alt="" />
            </MediaContainer>
        </>
    )
}
render(media, document.body)