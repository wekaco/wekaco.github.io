(function() {
  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
    } else {
      element.attachEvent(eventName, callback, false);
    }
  }

  var consoleBox = document.querySelector('.console');
/**
  function clearConsole() {
    console.log('clear console');
    updateConsole(0.toFixed(3));
    consoleBox.innerHTML = ;
  }**/

  function updateConsole(value) {
    //console.log(eventData);
    consoleBox.innerHTML = value.toFixed(3);////eventData.currentPosition.toFixed(3);
  }
  function cta(eventName) {
    switch(eventName) {
      case SC.Widget.Events.PLAY:
      case SC.Widget.Events.FINISH:
      case SC.Widget.Events.PAUSE:
      default:
        return 'Preview';
    }
  }

  var btn = document.getElementById('preview');
  btn.disabled = true;
  var widget   = SC.Widget('widget');

  widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(eventData) {
    updateConsole(eventData.currentPosition);
  });
  widget.bind(SC.Widget.Events.READY, function() {
    widget.getPosition(updateConsole);
    btn.disabled = false;
    btn.classList.add('button-primary');
    btn.innerHTML = cta(SC.Widget.Events.READY);
  });
  widget.bind(SC.Widget.Events.PLAY, function() {
    btn.innerHTML = cta(SC.Widget.Events.PLAY);
  });
  widget.bind(SC.Widget.Events.PAUSE, function() {
    btn.innerHTML = cta(SC.Widget.Events.PAUSE);
  });
  widget.bind(SC.Widget.Events.FINISH, function() {
    btn.innerHTML = cta(SC.Widget.Events.FINISH);
  });

  addEvent(btn, 'click', function(e) {
    /**if (e.target !== this) {
      e.stopPropagation();
      return false;
    }**/
    console.log('button click');
    widget.getPosition(updateConsole);
    widget.toggle();
  });

}());
