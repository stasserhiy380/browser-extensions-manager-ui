import { useState } from 'react'
import {useEffect} from "react";
import './App.css'
//import Button from "@mui/material/Button"
import Switch from "@mui/material/Switch"
import logo from "../assets/images/logo-88.svg"
import icon_moon from "../assets/images/icon-moon.svg"
import icon_sun from "../assets/images/icon-sun.svg"


import dev_lens_img from "../assets/images/logo-devlens.svg"
import style_spy_img from "../assets/images/logo-style-spy.svg"
import speed_boost_img from "../assets/images/logo-speed-boost.svg"
import json_wizard_img from "../assets/images/logo-json-wizard.svg"
import tab_master_img from "../assets/images/logo-tab-master-pro.svg"
import viewport_buddy_img from "../assets/images/logo-viewport-buddy.svg"
import markup_notes_img from "../assets/images/logo-markup-notes.svg"
import grid_guides_img from "../assets/images/logo-devlens.svg"
import palette_picker_img from "../assets/images/logo-palette-picker.svg"
import link_checker_img from "../assets/images/logo-link-checker.svg"
import dom_snapshot_img from "../assets/images/logo-dom-snapshot.svg"
import console_plus_img from "../assets/images/logo-console-plus.svg"




function Header({onClick, theme}){
    return (<>
    <header>
        <div class="logo-wrapper"><img src={logo} alt="logo"></img>
        <p>
           Extensions
        </p></div>
        <button onClick={onClick}><img src={theme==="light" ?icon_moon : icon_sun } alt="change theme"></img></button>
    </header></>)
}

function Button({text, onClick, show}){

    return (<button className={"button-choose" + ((text===show) ? ' chosen' : '')} onClick={onClick}>{text}</button>);
}




function Cart({path, head, text, checked, elements, setElements}){
    return (<article className="cart">
        <div className="cart-description-wrapper">
            <img src={path} alt="extension logo"></img>
            <div>
                <h2>{head}</h2>
                <p>{text}</p>
            </div>
        </div>
        <div className="action">
            <Button text={"Remove"} active={true}></Button>
            <Switch
                checked={checked}
                onChange={(e) => {
                    const isChecked = e.target.checked;

                    setElements((prevElements) =>
                        prevElements.map((elem) =>
                            elem.text === text
                                ? { ...elem, active: isChecked }
                                : elem
                        )
                    );
                }}
            />


        </div>
    </article>)

}


function Menu({show, setShow}){
    return (<>
        <div className="buttons">
            <Button show={show} text={"All"} onClick={()=>{

                setShow("All");
            }}>

            </Button>
            <Button show={show} text={"Active"} onClick={()=>{

                setShow("Active");
            }}>

            </Button>
            <Button show={show} text={"Inactive"} onClick={()=>{

                setShow("Inactive");
            }}>

            </Button>
        </div>
    </>)
}

function List({elements,setElements, show}){
    if (show === "All"){
    return (<section className="items">
        {elements.map(x=><Cart path={x.path} head={x.head} text={x.text} checked={x.active} elements={elements} setElements={setElements}></Cart>)}

    </section>)}
    else if (show==="Active"){
        return (<section className="items">
            {elements.filter((y)=> y.active === true).map(x=><Cart path={x.path} head={x.head} text={x.text} checked={x.active} elements={elements} setElements={setElements}></Cart>)}

        </section>)
    }
    else if (show==="Inactive") {
        return (<section className="items">
            {elements.filter(y=>!y.active).map(x=><Cart path={x.path} head={x.head} text={x.text} checked={x.active} elements={elements} setElements={setElements}></Cart>)}

        </section>)
    }
}




function App() {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);
    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
    const items = [{path: dev_lens_img, text: "Quickly inspect page layouts and visualize element boundaries.", head: "DevLens", active:true},
        {path: style_spy_img, text: "Instantly analyze and copy CSS from any webpage element.", head: "StyleSpy", active:false},
        {path: speed_boost_img, text: "Optimizes browser resource usage to accelerate page loading.", head: "SpeedBoost", active:true},
        {path: json_wizard_img, text: "Formats, validates, and prettifies JSON responses in-browser.", head: "JSONWizard", active:false},
        {path: tab_master_img, text: "Organizes browser tabs into groups and sessions.", head: "TabMaster Pro", active:true},
        {path: viewport_buddy_img, text: "Simulates various screen resolutions directly within the browser.", head: "ViewportBuddy", active:true},
        {path: markup_notes_img, text: "Enables annotation and notes directly onto webpages for collaborative debugging.", head: "Markup Notes", active:true},
        {path: grid_guides_img, text: "Overlay customizable grids and alignment guides on any webpage.", head: "GridGuides", active:true},
        {path: palette_picker_img, text: "Instantly extracts color palettes from any webpage.", head: "Palette Picker", active:true},
        {path: link_checker_img, text: "Scans and highlights broken links on any page.", head: "LinkChecker", active:true},
        {path: dom_snapshot_img, text: "Capture and export DOM structures quickly.", head: "DOM Snapshot", active:true},
        {path: console_plus_img, text: "Enhanced developer console with advanced filtering and logging.", head: "ConsolePlus", active:true}

    ]

// const [count, setCount] = useState(0)
    const [show, setShow] = useState("All");
    const [elements, setElements] = useState(items);
    return (
    <>
        <Header onClick={toggleTheme} theme={theme}>

        </Header>
        <section className="activity">
            <div className="navigation"><h1>
                Extensions List
            </h1>
                <Menu show={show} setShow={setShow}>

                </Menu></div>
            <List elements={elements} show={show} setElements={setElements}>

            </List>
        </section>
    </>
  )
}

export default App
