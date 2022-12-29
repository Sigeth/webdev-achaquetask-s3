import { getTasks } from "./api.js";
import { Application } from "./app.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const tasks = await getTasks(params.filter);
const app = new Application(tasks);