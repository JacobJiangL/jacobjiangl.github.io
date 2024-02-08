function getOffset( el ) {
  // let _x = 0;
  // let _y = 0;
  // while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
  //     _x += el.offsetLeft - el.scrollLeft;
  //     _y += el.offsetTop - el.scrollTop;
  //     el = el.offsetParent;
  // }
  // return { top: _y, left: _x };
  let rect = el.getBoundingClientRect();
  return { left: rect.left, top: rect.top };
}
function getHeight( el ) {
  let rect = el.getBoundingClientRect();
  return rect.bottom - rect.top;
}
function getBot(el) {return el.getBoundingClientRect().bottom}


function typeWriter() {
  let textToType = ["", 
                    "\\s\\s\\s > ", "Junior at Worcester Academy.", "\\s",
                    "\\n\\s\\s\\s\\s > ", "Passionate hobbyist.", "\\s",
                    "\\n\\s\\s\\s\\s > ", "Addicted to chasing knowledge."];

  const elem = document.getElementById("type-box-1");
  const elemTail = document.getElementById("type-box-1-tail");
  const caret = document.getElementById("caret-1");
  
  
  let textTyped = "";
  let textWrap = "";
  let textEnd = "";
  let openString = false;
  let escapeChar = false;
  let prevBracket = false;
  let blurAmnt = "line-type-bg";
  
  let indent = 0;
  let stall = false;
  let prevStall = false;
  function writeChar(i, j) {
    if(i < textToType.length) {
      if(j < textToType[i].length) {
        let newChar = textToType[i].charAt(j);
        let savedNewChar = newChar;
        let setPrevStall = false;
        
        // special indicator and custom styling characters
        
        if (newChar === "\"" && !escapeChar) { // is " and not escaped
          openString = !openString;
          newChar = wrapWithSpan("\"", "quote-mark");
        } else if (newChar === "\\" && !escapeChar) { // is \ and not escaped
          escapeChar = true;
          newChar = "";
          if (prevStall) {
            setPrevStall = true;
          }
        } else if ("([{".includes(newChar)) { // is a bracket and not escaped
          let wrap = !openString && !escapeChar; // if bracket is in a string, don't add bracket coloring
          newChar = wrapWithSpan(newChar, "bracket-color", wrap);
          if(!escapeChar) { // if escaped, don't add the closing bracket
            prevBracket = true;
            if (savedNewChar === '(') { // for parenthesis
              textEnd = wrapWithSpan(")", "bracket-color", wrap) + textEnd;
            } else { // for [] or {}
              textEnd = wrapWithSpan(String.fromCharCode(savedNewChar.charCodeAt(0)+2), "bracket-color", wrap) + textEnd;
            }
          }
        } else if (newChar === "n" && escapeChar) { // is n and escaped (\n)
          newChar = textWrap;
          newChar += "</span>"
          newChar += "<br>";
          newChar += "<span class=\"" + blurAmnt + "\">"
          newChar += "&nbsp&nbsp".repeat(indent);
          if (textWrap === "") {
            newChar += "<span class=\"desc-odd-line\">";
            textWrap = "</span>";
          } else {
            textWrap = "";
          }
          if (prevBracket) {
            textEnd = newChar + textEnd;
            indent++;
            newChar += "&nbsp&nbsp";
          }
        } else if (newChar === " ") {
          newChar = "&nbsp";
        } else if (savedNewChar === "s" && escapeChar) {
          stall = true;
          setPrevStall = true;
        } else if (newChar === ",") {
          newChar = wrapWithSpan(",", "comma-color",!openString)
        } else if (newChar === ".") {
          newChar = wrapWithSpan(".", "comma-color",!openString)
        } else if (newChar === ">" || newChar === "<") {
          newChar = wrapWithSpan(newChar, "bracket-color", )
        }


        if (!"([{".includes(savedNewChar) && !escapeChar) {
          prevBracket = false;
        }
        if (savedNewChar !== "\\") {
          escapeChar = false;
        }

        if (stall && !prevStall) {

          caret.classList.add("caret-animation");

        } 

        prevStall = setPrevStall;
        
        if (!stall) {
          textTyped += newChar;
          elem.innerHTML = "<span class=\"" + blurAmnt + "\">" + textTyped + textWrap + "</span>";
          elemTail.innerHTML = textEnd;
          if(!prevStall) {
            caret.classList.remove("caret-animation");
          }
          
          window.dispatchEvent(new Event('scroll'));
        } else {
          stall = false;
        }
        
        setTimeout(writeChar, deviateTypingSpeed(250), i, j+1);
      } else {
        setTimeout(writeChar, deviateTypingSpeed(250), i+1, 0);
      }
    } else {
      caret.classList.add("caret-animation");
      
    }
  }
  caret.classList.remove("caret-animation");
  setTimeout(writeChar, 0, 0, 0);
}

function wrapWithSpan(text, className, wrap=true) {
  if (wrap) {
    return "<span class=\"" + className + "\">" + text + "</span>";
  }
  else {
    return text;
  }
  
}
function deviateTypingSpeed(wpm) {
  function calcDelayFromWPM(wpm) {
    return 1000/(wpm*5/60);
  }
  let delay = calcDelayFromWPM(wpm); // base delay
  let rand = Math.random(); // 50/50 chance of deviate up or down
  if (rand>0.5) { // deviate up (slower)
    delay += Math.random() * (calcDelayFromWPM(wpm-20) - delay); 
  } else { // deviate down (faster)
    delay += Math.random() * (calcDelayFromWPM(wpm+500) - delay);
  }
  return delay;
}



document.addEventListener('DOMContentLoaded', function(event) {

  setTimeout(typeWriter, 2500);
})



/* Shift */
window.addEventListener("scroll", function(event) {
  const scrollPosition = window.scrollY;
  const offsetSize = scrollPosition * 0.03;
  const overLayOffsetSize = scrollPosition * 0.02;
  const blurSize = scrollPosition * 0.02
  const overLayBlurSize = scrollPosition * 0.015
  if (offsetSize > 10) {
    // offsetSize = 10;
  }
  this.document.querySelector('.top-background').style.top = `${offsetSize}vh`;
  this.document.querySelector('.top-background').style.filter = `brightness(75%) hue-rotate(-10deg) blur(${blurSize}px)`;
  this.document.querySelector('.top-background-overlay').style.top = `${overLayOffsetSize}vh`;
  this.document.querySelector('.top-background-overlay').style.filter = `brightness(35%) hue-rotate(-3deg) saturate(0.95); blur(${overLayBlurSize}px)`;
  

  function blur(elem, multiplier, range=0) {
    // nav size
    range += 60;

    range += Math.max(250-getHeight(elem), 0) * 0.6;
    let defaultPosition = getOffset(elem).top; 
    const relativeScroll = -1 * defaultPosition + range;
    multiplier *= Math.max(Math.min(getHeight(elem), 150), 100) * 0.02;
    const blurSize = Math.max(relativeScroll * multiplier, 0);
    elem.style.filter = ` blur(${blurSize}px)`;
  }

  const slightBlurElems = Array.prototype.slice.call(this.document.getElementsByClassName('blur-slight'));
  slightBlurElems.forEach((elem) => {
    blur(elem, 0.009, 0);
  })
  const blurElems = Array.prototype.slice.call(this.document.getElementsByClassName('blur'));
  blurElems.forEach((elem) => {
    blur(elem, 0.011, 20);
  })
  const heavyBlurElems = Array.prototype.slice.call(this.document.getElementsByClassName('blur-heavy'));
  heavyBlurElems.forEach((elem) => {
    blur(elem, 0.017, 35);
  })
})



// const initVal = 50;
// function decay(x) {
//   const a = initVal; // Initial value
//   const b = 0.05; // Decay rate
//   return a * Math.exp(-b * x);
// }
// const introduce = document.getElementsByClassName("introduce")[0];
// const introduceIm = document.getElementsByClassName("intro-second")[0];
// const firstName = document.getElementsByClassName("first-name")[0];
// const lastName = document.getElementsByClassName("last-name")[0];
// const codeType = document.getElementsByClassName("code-type")[0];

// let trueTime = 0;
// let timeIntro = 0;
// let timeIntroSecond = -40;
// let timeFirstName = -60;
// let timeLastName = -60;
// let timeCodeType = -90;
// let offset = decay(trueTime);
// let opacity = 0;

// function paintOffsetOfElem(elem, time) {
//   offset = decay(Math.max(0, time));
//   opacity = time/100;
//   elem.style.transform = `translateX(${0.3 * offset}vh)`;
//   elem.style.opacity = `${opacity}`;
// }
// function paintOpacity(elem, time) {
//   opacity = time/100;
//   elem.style.opacity = `${opacity}`;
// }

// function paintOffset() {
  
//   if(trueTime < 50) {
//     paintOffsetOfElem(introduce, timeIntro);

//     paintOffsetOfElem(introduceIm, timeIntroSecond);
    
//     paintOffsetOfElem(firstName, timeFirstName);
    
//     paintOffsetOfElem(lastName, timeLastName);

//     paintOpacity(codeType, timeCodeType);

//     trueTime+=4;
//     timeIntro+=4;
//     timeIntroSecond+=4;
//     timeFirstName+=4;
//     timeLastName+=4;
//     timeCodeType+=4;
    
//     setTimeout(paintOffset, 80);
//   }
// }
// // paintOffset();