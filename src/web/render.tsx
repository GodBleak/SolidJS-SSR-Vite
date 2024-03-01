import { renderToStream } from 'solid-js/web';
import { App } from './app';
import { Document } from './document';

export const render = () =>
    renderToStream(() => (
        <Document>
            <App />
        </Document>
    ));