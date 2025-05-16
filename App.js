import React from "react";
import ReactDOM from "react-dom/client";
import {createRoot} from "react-dom/client";
import AlertComponent from "@/components/Alert/Alert"; 
import NotificationComponent from "@/components/Notification/Notification"; 
import ImageComponent from "@/components/Image/Image";
import './index.css';

// React.createElement gives an object. When it is rendered, it becomes HTML element.
// const heading=React.createElement("h1",{id:"heading", xyz:"abc" },"Hello world from React!"); // creating a React element using React.createElement just like DOM element creation

// JSX helps in creating React elements in a more readable way when complex UI is created. Hence React.createElement is rarely used in the code.
const heading=<h1 id="heading" className="heading" tabIndex='1'>Hello world from React JSX!</h1>; 
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

// console.log(API_URL); // API_URL is defined in webpack.config.js using DefinePlugin

// const nestedObj=React.createElement(
//     "div",
//     {id:'parent'},
//     React.createElement("div",{id:"child"},[
//         React.createElement("h1",{id:"grandchild"},"I am H1 tag"),
//         React.createElement("h2",{id:"grandchild 2"},"I am H2 tag")]));
const nestedObj=(
    <div id="parent">
        <div id="child">
            <h1 id="grandchild">I am H1 tag</h1>
            <h2 id="grandchild2">I am H2 tag</h2>
        </div>
        <AlertComponent/>
    </div>
); // creating a React element using JSX
const rootNested=ReactDOM.createRoot(document.getElementById("nested"));
rootNested.render(nestedObj);

createRoot(document.getElementById("rootForComponent")).render(
    <div> 
        <AlertComponent/>
        <AlertComponent></AlertComponent>
        {AlertComponent()}
        {nestedObj}
        <NotificationComponent/>
        <ImageComponent/>
    </div>
);