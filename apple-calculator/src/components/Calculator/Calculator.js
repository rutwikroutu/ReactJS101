import React, { useState } from 'react'
import './Calculator.css';

function Calculator() {
    const [result, setResult] = useState(0);
    const [sbnum, setSbnum] = useState(false);
    const [sbsign, setSbsign] = useState();
    const [sbnum2, setSbnum2] = useState(0);
    const [equated, setEquated] = useState(false);
    const [sbDisplayed, setSbDisplayed] = useState(false);

    var countDecimals = function (value) {
        if (Math.floor(value) !== value)
            return value.toString().split(".")[1].length || 0;
        return 0;
    }

    const equate = () => {
        if (!equated) {
            var temp = 0;
            if (sbsign == "+") {
                temp = parseFloat(result) + parseFloat(sbnum2);
            } else if (sbsign == "x") {
                temp = parseFloat(result) * parseFloat(sbnum2);
            } else if (sbsign == "-") {
                temp = parseFloat(result) - parseFloat(sbnum2);
            } else {
                temp = parseFloat(result) / parseFloat(sbnum2);
            }
            if (countDecimals(temp) > 6) {
                setResult(temp.toFixed(6));
            } else {
                setResult(temp);
            }

            setSbnum(false);
            setEquated(true);
            setSbnum2(0);
            setSbsign("");
        }
    }

    const appendSign = (sign) => {
        var temp = 0;
        if (result == 0) {
            return;
        }

        if (sbDisplayed == true || sbnum2 == 0) {
            setSbsign(sign);
            setSbnum(true);
            return;
        }

        if (sbnum == true) {
            if (sbsign == "+") {
                temp = parseFloat(result) + parseFloat(sbnum2);
            } else if (sbsign == "x") {
                temp = parseFloat(result) * parseFloat(sbnum2);
            } else if (sbsign == "-") {
                temp = parseFloat(result) - parseFloat(sbnum2);
            } else {
                temp = parseFloat(result) / parseFloat(sbnum2);
            }
            setSbnum2(0);
            if (countDecimals(temp) > 6) {
                setResult(temp.toFixed(6));
            } else {
                setResult(temp);
            }
            setSbnum(true);
            setSbsign(sign);
            setSbDisplayed(true);
            return;
        }

        setSbsign(sign)
        setSbnum(true);
    }

    const appendNumber = (num) => {
        if (result == 0 && num == 0) {
            setResult("0");
            return;
        }

        if (sbnum == true) {
            if (sbnum2 == 0) {
                setSbnum2(num.toString())
                setSbDisplayed(false);
            } else {
                setSbnum2(sbnum2 + num.toString())
            }
        } else {
            if (equated == true) {
                setResult(num.toString());
                setEquated(false);
                return;
            }
            if (result == 0) {
                setResult(num.toString())
            } else {
                setResult(result + num.toString())
            }
        }
    }

    return (
        <div className="calculator">
            <div className="threedots">
                <div className="firstDot" />
                <div className="secondDot" />
                <div className="thirdDot" />
            </div>
            <div className="calculator__view__container">
                <div className="calculator__view">
                    <h1 className="calculator__view__h1">{sbnum2 != 0 ? sbnum2 : result}</h1>
                </div>
            </div>
            <div className="calculator__rows">
                <div className="calculator__row">
                    <button className="calculator__greyButton" onClick={() => {
                        setResult(0);
                        setSbsign();
                        setSbnum2(0);
                        setSbnum(false);
                    }}>AC</button>
                    <button className="calculator__greyButton">+/-</button>
                    <button className="calculator__greyButton">%</button>
                    <button className={`calculator__orangeButton ${sbsign == '/' ? 'selected' : ''}`} onClick={() => appendSign("/")}>÷</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(7)}>7</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(8)}>8</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(9)}>9</button>
                    <button className={`calculator__orangeButton ${sbsign == 'x' ? 'selected' : ''}`} style={{ fontSize: '40px', }} onClick={() => appendSign("x")}>x</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(4)}>4</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(5)}>5</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(6)}>6</button>
                    <button className={`calculator__orangeButton ${sbsign == '-' ? 'selected' : ''}`} style={{ fontSize: '20px', fontWeight: 700 }} onClick={() => appendSign("-")}>—</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(1)}>1</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(2)}>2</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber(3)}>3</button>
                    <button className={`calculator__orangeButton ${sbsign == '+' ? 'selected' : ''}`} onClick={() => appendSign("+")}>+</button>
                </div>
                <div className="calculator__row">
                    <button className="calculator__DarkgreyButton" style={{ width: '190px' }} onClick={() => appendNumber(0)}>0</button>
                    <button className="calculator__DarkgreyButton" onClick={() => appendNumber('.')}>.</button>
                    <button className={`calculator__orangeButton`} onClick={() => equate()}>=</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator
