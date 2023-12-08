$( "#container" ).fadeIn( "slow", function() {
    $( "#bottom-logo" ).fadeIn( "slow", function() {
        $( "#register" ).fadeIn( "slow", function() {})
    })
})

const input = document.getElementById('username');
const button = document.getElementById('submit');
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    // Simulate a click on the button
    button.click();
  }
});
const input2 = document.getElementById('password');
input2.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    // Simulate a click on the button
    button.click();
  }
});
const input3 = document.getElementById('email');
input3.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    // Simulate a click on the button
    button.click();
  }
});

function limit(element, max_chars)
{
if(element.value.length > max_chars) {
    element.value = element.value.substr(0, max_chars);
}
}
function minmax(value, min, max) 
{
if(parseInt(value) < min || isNaN(parseInt(value))) 
    return 0; 
else if(parseInt(value) > max) 
    return 100; 
else return value;
}