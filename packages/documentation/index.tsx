import App from "./App";
import {render} from "voby"
import { MessageQueue } from "@react-md/alert";

render(<MessageQueue id="main-alerts">
    <App />
    </MessageQueue>
, 
document.body)