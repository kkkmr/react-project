import React from "react";
import ReactDOM from "react-dom/client";
import {createRoot} from "react-dom/client";
import AlertComponent from "@/components/Alert"; 
import NotificationComponent from "@/components/Notification"; 
import ImageComponent from "@/components/Image";
import './index.css';


const heading=React.createElement("h1",{id:"heading", xyz:"abc" },"Hello world from React!");
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

// console.log(API_URL); // API_URL is defined in webpack.config.js using DefinePlugin

const nestedObj=React.createElement(
    "div",
    {id:'parent'},
    React.createElement("div",{id:"child"},[
        React.createElement("h1",{id:"grandchild"},"I am H1 tag"),
        React.createElement("h2",{id:"grandchild 2"},"I am H2 tag")]));
const rootNested=ReactDOM.createRoot(document.getElementById("nested"));
rootNested.render(nestedObj);

createRoot(document.getElementById("rootForComponent")).render(
    <div> 
        <AlertComponent/>
        <NotificationComponent/>
        <ImageComponent/>
    </div>
);

// JSX helps in creating React elements in a more readable way when complex UI is created. Hence React.createElement is rarely used in the code.