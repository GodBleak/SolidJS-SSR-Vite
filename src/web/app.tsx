import type { Component } from 'solid-js';

import styles from './assets/App.module.css';
import "./assets/index.css"

export const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src="/public/images/logo.svg" class={styles.logo} alt="logo" />
        <p class="text-green-500 font-bold animate-bounce animate-infinite">
          Edit <code>src/web/app.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};
