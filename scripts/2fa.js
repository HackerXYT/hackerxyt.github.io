function moveToNext(currentInput, nextInputId) {
    const maxLength = parseInt(currentInput.getAttribute('size'));
    const currentInputValue = currentInput.value;

    if (currentInputValue.length === maxLength) {
      if (nextInputId !== '') {
        const nextInput = document.getElementById(nextInputId);
        nextInput.focus();
      }
    }
  }

  function moveToPrevious(event, previousInputId) {
    const currentInput = event.target;
    const currentInputValue = currentInput.value;

    if (currentInputValue === '' && previousInputId !== '') {
      const previousInput = document.getElementById(previousInputId);
      previousInput.focus();
    }
  }

  document.getElementById('input1').addEventListener('keydown', function(event) {
      let whoami = document.getElementById("input1")
      if (/^\d$/.test(event.key)) {
          console.log(whoami.value.length > 0)
      if(whoami.value.length > 0) { //if text inside value are more characters than 1
          let previous = ""
          if(whoami.value.length <= 0) {
              previous = whoami.value
          }
          console.log(previous)
          whoami.value = ""
          whoami.value = previous
      }
      }
    if (event.keyCode === 8) {
      document.getElementById("input1").value = ""
      setTimeout(function() {
          document.getElementById(`input1`).focus();
      }, 100)
    }
  });

  document.getElementById('input2').addEventListener('keydown', function(event) {
      let whoami = document.getElementById("input2")
      if (/^\d$/.test(event.key)) {
          console.log(whoami.value.length > 0)
      if(whoami.value.length > 0) { //if text inside value are more characters than 1
          let previous = ""
          if(whoami.value.length <= 0) {
              previous = whoami.value
          }
          console.log(previous)
          whoami.value = ""
          whoami.value = previous
      }
      }
    if (event.keyCode === 8) {
      document.getElementById("input2").value = ""
      setTimeout(function() {
          document.getElementById(`input1`).focus();
      }, 100)
    }
  });
  document.getElementById('input3').addEventListener('keydown', function(event) {
      let whoami = document.getElementById("input3")
      if (/^\d$/.test(event.key)) {
          console.log(whoami.value.length > 0)
      if(whoami.value.length > 0) { //if text inside value are more characters than 1
          let previous = ""
          if(whoami.value.length <= 0) {
              previous = whoami.value
          }
          console.log(previous)
          whoami.value = ""
          whoami.value = previous
      }
      }
    if (event.keyCode === 8) {
      document.getElementById("input3").value = ""
      setTimeout(function() {
          document.getElementById(`input2`).focus();
      }, 100)
    }
  });
  document.getElementById('input4').addEventListener('keydown', function(event) {
      let whoami = document.getElementById("input4")
      if (/^\d$/.test(event.key)) {
          console.log(whoami.value.length > 0)
      if(whoami.value.length > 0) { //if text inside value are more characters than 1
          let previous = ""
          if(whoami.value.length <= 0) {
              previous = whoami.value
          }
          console.log(previous)
          whoami.value = ""
          whoami.value = previous
      }
      }
    if (event.keyCode === 8) {
      document.getElementById("input4").value = ""
      setTimeout(function() {
          document.getElementById(`input3`).focus();
      }, 100)
    }
  });
  document.getElementById('input5').addEventListener('keydown', function(event) {
      let whoami = document.getElementById("input5")
      if (/^\d$/.test(event.key)) {
          console.log(whoami.value.length > 0)
      if(whoami.value.length > 0) { //if text inside value are more characters than 1
          let previous = ""
          if(whoami.value.length <= 0) {
              previous = whoami.value
          }
          console.log(previous)
          whoami.value = ""
          whoami.value = previous
      }
      }
    if (event.keyCode === 8) {
      document.getElementById("input5").value = ""
      setTimeout(function() {
          document.getElementById(`input4`).focus();
      }, 100)
    }
  });
  document.getElementById('input6').addEventListener('keydown', function(event) {
      if (/^\d$/.test(event.key)) {
        $("#submit").fadeIn("slow")
        $("#submit").html("Please Wait..")
        submit()
      if(document.getElementById("input6").value.length > 0) { //if text inside value are more characters than 1
          let previous = ""
          if(document.getElementById("input6").value.length <= 0) {
              previous = document.getElementById("input6").value
          }
          console.log(previous)
          document.getElementById("input6").value = ""
          document.getElementById("input6").value = previous
      }
      }
      
    if (event.keyCode === 8) {
      document.getElementById("input6").value = ""
      setTimeout(function() {
          document.getElementById(`input5`).focus();
      }, 100)
    }
  });

 