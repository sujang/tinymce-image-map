import App from "./main";
import "./styles.css";

const args = top.tinymce.activeEditor.windowManager.getParams();
const app = new App(args);
window.app = app;
window.render = () => app.render();
