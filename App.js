const heading=React.createElement("h1",{id:"heading", xyz:"abc" },"Hello world from React!");
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
const nestedObj=React.createElement(
    "div",
    {id:'parent'},
    React.createElement("div",{id:"child"},[
        React.createElement("h1",{id:"grandchild"},"I am H1 tag"),
        React.createElement("h2",{id:"grandchild 2"},"I am H2 tag")]));
const rootNested=ReactDOM.createRoot(document.getElementById("nested"));
rootNested.render(nestedObj);

// JSX helps in creating React elements in a more readable way when complex UI is created. Hence React.createElement is rarely used in the code.