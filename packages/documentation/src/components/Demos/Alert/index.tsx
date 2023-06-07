import React from 'voby'
import { createRoot } from 'react-dom/client'
import type { ReactElement } from 'voby'

import description from "./README.md"
import DemoPage from "../DemoPage"

import 'react-md/dist/_everything.scss'
// import * as styles from './UpdatingMessagePriority.module.scss';

import SimpleMessageQueue from "./SimpleMessageQueue"
import simpleMessageQueue from "./SimpleMessageQueue.md"

import HandlingDuplicatedMessages from "./HandlingDuplicatedMessages"
// import handlingDuplicatedMessages from "./HandlingDuplicatedMessages.md";

import UpdatingMessagePriority from "./UpdatingMessagePriority"
// import updatingMessagePriority from "./UpdatingMessagePriority.md";

const demos = [
    {
        name: "Simple Message Queue",
        // description: simpleMessvietageQueue,
        children: <SimpleMessageQueue />,
    },
    {
        name: "Handling Duplicated Messages",
        // description: handlingDuplicatedMessages,
        children: <HandlingDuplicatedMessages />,
    },
    {
        name: "Updating Message Priority",
        // description: updatingMessagePriority,
        children: <UpdatingMessagePriority />,
    },
]

// export default function Alert(): Child {
//   return (
//     <DemoPage demos={demos} packageName="alert" description={description} />
//   );
// }

// const o = styles.output
const e = document.getElementById('app')
const root = createRoot(e)

root.render(<div /* className={o} */>
    <SimpleMessageQueue />
</div>)
