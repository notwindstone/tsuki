import App from './App.svelte'
import { mount } from 'svelte'
import { ApplicationRootID } from "./constants/app";
import './app.css'

const app = mount(App, {
  target: document.getElementById(ApplicationRootID)!,
})

export default app
