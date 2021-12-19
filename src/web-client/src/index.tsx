// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, render, Component } from "preact";

class Hello extends Component {
  render() {
    return <div>Rendered, baby!!!!!</div>;
  }
}

render(<Hello />, document.body);
