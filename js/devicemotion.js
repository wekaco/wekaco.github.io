(() => {
  const DEVICEMOTION = 'devicemotion';
  const camera = document.getElementById('main');
  camera.style = `transform: perspective(1024px) translateZ(0px)`;

  const listener = (event) => {
    const { rotationRate } = event;
    camera.style = `transform: perspective(10)\
      translateZ(${(1*rotationRate.beta)/1000}rem)
      translateX(${(1*rotationRate.gamma)/1000}rem)
      translateY(${(1*rotationRate.alpha)/1000}rem);`;
  };
  window.dstart = () => window.addEventListener(DEVICEMOTION, listener);
  window.dstop  = () => window.removeEventListener(DEVICEMOTION, listener);

  window.dstart();
})();
