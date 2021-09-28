import React, { useState } from 'react'
import './Calculator.css';

function Calculator() {

    return (
        <div className="calculator">
            <div className="threedots">
                <div className="firstDot" />
                <div className="secondDot" />
                <div className="thirdDot" />
            </div>
            <div className="calculator__view__container">
                <div className="calculator__view">
                    <h1 className="calculator__view__h1">0</h1>
                </div>
            </div>
            <div className="calculator__rows">
                <div className="calculator__row">
                    <button className="calculator__greyButton">AC</button>
                    <button className="calculator__greyButton">+/-</button>
                    <button className="calculator__greyButton">%</button>
                    <button className={`calculator__orangeButton`}>÷</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton">7</button>
                    <button className="calculator__DarkgreyButton">8</button>
                    <button className="calculator__DarkgreyButton">9</button>
                    <button className={`calculator__orangeButton`} style={{ fontSize: '40px', }}>x</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton">4</button>
                    <button className="calculator__DarkgreyButton">5</button>
                    <button className="calculator__DarkgreyButton">6</button>
                    <button className={`calculator__orangeButton `} style={{ fontSize: '20px', fontWeight: 700 }}>—</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton">1</button>
                    <button className="calculator__DarkgreyButton">2</button>
                    <button className="calculator__DarkgreyButton">3</button>
                    <button className={`calculator__orangeButton `}>+</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton" style={{ width: '190px' }}>0</button>
                    <button className="calculator__DarkgreyButton">.</button>
                    <button className={`calculator__orangeButton`}>=</button>
                </div>
            </div>
        </div >
    )
}

export default Calculator
