'use strict';

const TelegramBot = require('node-telegram-bot-api'),
       request = require('request'),
       fs = require('fs'),
       token = '428470679:AAES1SCvrWS_Zpuobv0G-flJ_EnWHvK42wY',
       bot = new TelegramBot( token, {polling: true});
       

bot.on('message', function(msg){
           const id = msg.from.id,
          _messageText = msg.text,
          messageText = _messageText.toLowerCase();

           var course  = function(messageText) {
            
           request( 'https://api.coinmarketcap.com/v1/ticker/' , function(error, response, body){

              if(!error && response.statusCode === 200){
                const data = JSON.parse(body);
                      
                       
                     
                    data.forEach(function(value , index, name) {
                       if(value.id === messageText ){
                         bot.sendMessage( id, (`Последний курс ${value.name} по отношению к доллару : ${value.price_usd} USD `));
                       }else if(messageText === 'курс' ){
                         bot.sendMessage( id, (`Последний курс ${value.name} по отношению к доллару : ${value.price_usd} USD `));
                       }
                });
                
                }
                
              });
            };
            
          

          if(messageText === 'привет'){

            bot.sendMessage(id, 'Привет! Какой курс криптовалют ты хочешь узнать?');

          }else if(messageText){
            course(messageText);
          }
});
     

