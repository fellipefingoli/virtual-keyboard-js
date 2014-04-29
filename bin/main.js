var Keyboard = (function(map,container){
  if(typeof map == "undefined") throw ": keyboard map is undefined";
  if(typeof container == "undefined") throw ": keyboard container is undefined";
  
  var keys = [];
  for(var i = 0; i < map.length; i++){
     keys.push(map[i].split(" "));
  }

  //Helpers
  Document.prototype.getClass = function(className,callback){
    var elements = this.getElementsByClassName(className);
    if(elements.length > 0)
      for(var i = 0; i < elements.length; i++)
        callback(elements[i]);      
  }

  Document.prototype.getElement = function(tagName,callback){
    var elements = this.getElementsByTagName(tagName);
    if(elements.length > 0)
      for(var i = 0; i < elements.length; i++)
        callback(elements[i]);    
  }

  //Events
  var inputFocus = (function(){
    document.getElement('input',function(input){
      input.addEventListener('focus',function(e){
        if(input.classList.contains('focus'))
          e.preventDefault;
        else{
          document.getClass('focus',function(focusInput){
            focusInput.classList.remove('focus');
          });
          input.classList.add('focus');
        }
      });
    })
  })();
  
  var textareaFocus = (function(){
    document.getElement('textarea',function(textarea){
      textarea.addEventListener('focus',function(e){
        if(textarea.classList.contains('focus'))
          e.preventDefault;
        else{
          document.getClass('focus',function(focusTextarea){
            focusTextarea.classList.remove('focus');
          });
          textarea.classList.add('focus');
        }
      });
    })
  })();
  
  var addCharacter = function(char){
    document.getClass('focus',function(activeElement){
        activeElement.value += char;
    });        
  }
  
  //Create Keyboard Buttons
  var keyFunctions = {
    'space' : {
      click : function(){
        addCharacter(' ');
      },
      innerHTML : 'Espaço'
    },
    'backsp' : {
      click : function(){
        document.getClass('focus',function(activeElement){
          activeElement.value = activeElement.value.substr(0,activeElement.value.length-1);
        });  
      },
      innerHTML : 'Apagar'      
    },
    'capslock' : {
      activated : false,
      click : function(){
        var inputs = document.getElementsByClassName('key-button');
        if(keyFunctions.capslock.activated){
          for(var i = 0; i < inputs.length; i++)
            if(!inputs[i].classList.contains('key-func'))
              inputs[i].innerHTML = inputs[i].innerHTML.toUpperCase();
          keyFunctions.capslock.activated = false;
        }else if (!keyFunctions.capslock.activated){
          for(var i = 0; i < inputs.length; i++)
            if(!inputs[i].classList.contains('key-func'))            
              inputs[i].innerHTML = inputs[i].innerHTML.toLowerCase();
          keyFunctions.capslock.activated = true;
        }
      },
      innerHTML : 'Aa'
    }
  }
  
  var createCharacterButton = function(char){
    var button = document.createElement('button');
    button.setAttribute('class','key-button');
    button.innerHTML = char;
    button.addEventListener('click',function(){addCharacter(this.innerHTML)});
    return button;
  }
  
  var createFunctionButton = function(func){
    var button = document.createElement('button');
    button.setAttribute('class','key-button');
    button.className += ' key-func';
    button.setAttribute('id','key-func-'+func);
    button.innerHTML = keyFunctions[func].innerHTML;
    button.addEventListener('click', keyFunctions[func].click);
    return button;
  } 
  
  var createKeyboard = (function(){
    var keyboard = document.createDocumentFragment();
    for(var i = 0; i < keys.length; i++){
      var ul = document.createElement('ul');
      ul.setAttribute('class','key-line');
      keyboard.appendChild(ul);
      for(var j = 0; j < keys[i].length; j++){
        var regex = new RegExp('^{([a-z]*)}$');
        var button;
        if(regex.test(keys[i][j]))
          button = createFunctionButton(regex.exec(keys[i][j])[1]);
        else
          button = createCharacterButton(keys[i][j]);
        var li = document.createElement('li');
        li.setAttribute('class','key-input');
        li.appendChild(button);
        ul.appendChild(li);
      }
    }
    container.appendChild(keyboard);
    container.addEventListener('click',function(){
      document.getClass('focus',function(input){
        input.focus()
      });
    });
  })();
});