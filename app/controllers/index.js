import Ember from 'ember';


export default Ember.Controller.extend({
  actions:{
    getQuote: function(){
      var stockSymbol = this.get('symbol');

      Ember.$.ajax('https://api.robinhood.com/quotes/'+stockSymbol+'/', {
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data) {
          var myResp = JSON.stringify(data).replace(/"/g,'');

          var splitStr = myResp.split(',');

          $('#timestamp').text(new Date().toLocaleString());

          $('#price').text('Price: $' + splitStr[4].split(':')[1]);
          $('#extendedPrice').text('Extended Price: $' + splitStr[5].split(':')[1]);
          $('#askPriceQuantity').text('Ask Price / Ask Size: ' + '$' + splitStr[0].split(':')[1] + ' / ' + splitStr[1].split(':')[1]);
          $('#bidPriceQuantity').text('Bid Price / Bid Size: ' + '$' + splitStr[2].split(':')[1] + ' / ' + splitStr[3].split(':')[1]);

          $('#output').text('');
        },
        error: function() {
          $('#output').text('Failed to retrieve symbol, please check and try again.');
        }
      });


    }
  }
});
