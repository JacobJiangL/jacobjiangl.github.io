const isMobile = () => {
  const vendor = navigator.userAgent || navigator.vendor || window.opera;

  return !!(
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      vendor
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      vendor.substr(0, 4)
    )
  );
};

const mobile = isMobile();

const topBackground = document.querySelector('.top-background');
const topBackgroundOverlay = document.querySelector('.top-background-overlay');

const slightBlurElems = Array.prototype.slice.call(this.document.getElementsByClassName('blur-slight'));
const blurElems = Array.prototype.slice.call(this.document.getElementsByClassName('blur'));
const heavyBlurElems = Array.prototype.slice.call(this.document.getElementsByClassName('blur-heavy'));

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



if(!mobile) {
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
    topBackground.style.top = `${offsetSize}vh`;
    topBackground.style.filter = `brightness(75%) hue-rotate(-10deg) blur(${blurSize}px)`;
    topBackgroundOverlay.style.top = `${overLayOffsetSize}vh`;
    topBackgroundOverlay.style.filter = `brightness(35%) hue-rotate(-3deg) saturate(0.95); blur(${overLayBlurSize}px)`;
    

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

    
    slightBlurElems.forEach((elem) => {
      blur(elem, 0.009, 0);
    })
    
    blurElems.forEach((elem) => {
      blur(elem, 0.011, 20);
    })
    
    heavyBlurElems.forEach((elem) => {
      blur(elem, 0.017, 35);
    })
  })
}


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