  //var userName = prompt("Enter a nickname!");
  $(function () {
    var nickname, 
        messageColor;
    var socket = io();
    messageColor = messageColorGenerator();
    $('#signInForm').submit(function(e){
      e.preventDefault(); //Prevent page from refreshing
      nickname = $('#userNameForm').val();
      if(nickname.length < 20 && nickname.length > 0){
         socket.emit('new user', nickname, messageColor, function(data){
            $('#errorMsg').text("");
            $('.formBox').fadeOut(function(){
            $('.chatRow').fadeIn(1000);
            $("#chatWelcome").text(nickname);
          });
         });
         
      }else{
        $('#errorMsg').text("Please enter a username less than 20 characters");
      }
    });
    
    socket.on('userColor', function(data){
      var recallString = ""; //string that displays if not first visit
      if(data.callCount > 0){
        recallString = "<em>new</em> ";
      }
      $('#colorIndicator').html('Your ' + recallString + 'text color is: <span style="color:' + messageColor + ';"><strong>' + data.color + '</strong></span>');
    });
    
    //random color button implementation
    $('#newRandColor').on("click", function(){
      messageColor = messageColorGenerator();
      socket.emit('new color', messageColor);
    });
    
    
    $('.chatBox').submit(function(e){
      e.preventDefault();
      if($("#message").val() != ""){
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
      }
    });
    
   
    
    socket.on('chat message', function(data){
      messageSent(data);
    });
    
    socket.on('get users', function(data){
      var html = "";
      users = $("#users");
      
      for(i = 0; i < data.length; i++){
        html += '<li class"list-group-item">' + data[i] + '</li>';
      }
      
      users.html(html);
    });
    
    // add a message when someone is typing
    
    $("#message").on('input propertychange keyup paste', function(){
      socket.emit('user typing', nickname);
    })
    
    socket.on('userType', function(data){
      var messages = $("#messages");
      var typeMessage = $("#activeType");
      typeMessage.html('<li>' + data.user + ' is currently typing...</li>')
      typeMessage.fadeIn();
    
    
  });
  
        //setup before functions
      var typingTimer;                //timer identifier
      var doneTypingInterval = 800;  //time in ms, 2 second for example
      var $input = $('#message');
      
      // updated events 
      $input.on('input propertychange paste', function () {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);      
      });
      
      //user is "finished typing," do something
      function doneTyping () {
        //do something
        var typeMessage = $("#activeType");
        typeMessage.text();
        typeMessage.fadeOut();
      }
        
     
      
      //messages.append($('<li>' + data.user + ' is currently typing...</li>'));
    });
function messageSent(data){
      console.log(data.msgColor);
      $('#messages').append($('<li><strong>' + data.user + '</strong>: ' + data.msg + '</li>').css("background-color", data.msgColor));
      var chatWindow = $('.chatWindow')
      chatWindow.animate({ scrollTop: chatWindow.prop("scrollHeight") - chatWindow.height() }, 100);
}

//when user logs in, they get assigned color to object -- messages will be this color

function messageColorGenerator(){
    var r, g, b, rgbColor;
    r = Math.floor(Math.random() * Math.floor(256));
    g = Math.floor(Math.random() * Math.floor(256));
    b = Math.floor(Math.random() * Math.floor(256));
    
    return rgbColor = "rgb(" + r + ", " + g + ", " + b + ")";
    
}

