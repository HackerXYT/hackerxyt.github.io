function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // A part of my effort to learn parallax.
// Photo Cred: Andre Benz @ https://unsplash.com/@trapnation

class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "handleMouseMove",
    e => {
      const el = document.getElementById("wrapper");
      const d = el.getBoundingClientRect();
      let x = e.clientX - (d.left + Math.floor(d.width / 2));
      let y = e.clientY - (d.top + Math.floor(d.height / 2));
      // Invert values
      x = x - x * 2;
      y = y - y * 2;
      document.documentElement.style.setProperty("--scale", 1.6);
      document.documentElement.style.setProperty("--x", x / 2 + "px");

      document.documentElement.style.setProperty("--y", y / 2 + "px");
    });_defineProperty(this, "handleMouseLeave",

    () => {
      document.documentElement.style.setProperty("--scale", 1);
      document.documentElement.style.setProperty("--x", 0);
      document.documentElement.style.setProperty("--y", 0);
    });}
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "wrapper",
        onMouseMove: this.handleMouseMove,
        onClick: this.handleMouseLeave }, /*#__PURE__*/

      React.createElement("img", { id: "image" })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));