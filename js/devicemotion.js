const BROWSER_SAFARI = 'safari';
const BROWSER_OTHER = 'other'; // chrom actually

const THRESHOLD = 36;

class Rotation {
  /**
   * - alpha value increases as the device:
   *   - is rotated counter-clockwise (chrome)
   *   - bottom is tipped toward the surface of the earth (safari)
   * - beta value increases as the deivce:
   *   - top is tipped toward the surface of the earth (chrome)
   *   - right side is tipped towards the surface of the earth (safari) 
   * - gamma value increases as the device:
   *   - right side is tipped towards the surface of the earth (chrome) 
   *   - is rotated counter-clockwise (safari)
   */
  constructor({ alpha, beta, gamma }, browser) {
    switch(browser) {
    case BROWSER_SAFARI:
      this.z = alpha * -1;
      this.x = gamma * -1;
      this.y = beta * -1;
      break;
    case BROWSER_OTHER:
    default:
      this.z = beta;
      this.x = alpha * -1;
      this.y = beta * -1;
      break;
    }
  }

  transform(perspective) {
    return `perspective(${perspective}px)
      translateZ(${this.z}px)`;/**
      translateX(${this.x}px)
      translateY(${this.y}px)`;**/
  }

  add(rotation) {
    let max = new Rotation({ alpha: 0, beta: 0, gamma: 0 }, this.browser);
    max.x = this.x;
    if (Math.abs(rotation.x) > Math.abs(this.x)) {
      max.x = rotation.x;
    }
    max.y = this.y;
    if (Math.abs(rotation.y) > Math.abs(this.y)) {
      max.y = rotation.y;
    }
    max.z = this.z;
    if (Math.abs(rotation.z) > Math.abs(this.z)) {
      max.z = rotation.z;
    }
    return max;
  }
}

(() => {
  const browser =  (() => {
    let safari = RegExp(/^((?!chrome|android|crios|fxios).)*safari/i);
    return (safari.test(navigator.userAgent)) ? BROWSER_SAFARI : BROWSER_OTHER;
  })();


  const DEVICEMOTION = 'devicemotion';
  const camera = document.getElementById('main');
  console.log(camera); 

  let init = new Rotation({ alpha: 0, beta: 0, gamma: 0 }); 
  let current = init;
  
  const listener = (event) => {
    current = current.add(new Rotation(event.rotationRate));
  };

  let interval = null;

  function stop() {
    window.removeEventListener(DEVICEMOTION, listener);
    clearInterval(interval);
  }

  function start() {
    stop();
    interval = setInterval(() => {
      console.log(current);
      camera.style.setProperty('transform', current.transform(1024));
    }, 40);
    let init = new Rotation({ alpha: 0, beta: 0, gamma: 0 }, browser); 
    window.addEventListener(DEVICEMOTION,
      (e) => {
        init = new Rotation(e.rotationRate, browser);
        camera.style.setProperty('transform', init.transform(1024));
      },
      { once: true }
    );
    window.addEventListener(DEVICEMOTION, listener);
  }

  window.dstart = start;
  window.dstop  = stop;

  window.dstart();
})();
