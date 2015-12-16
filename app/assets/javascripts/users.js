$(document).ready(function(){
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content')); //set the publishable key to stripe
    
    //Watch for a form submission:
    $("#form-submit-btn").click(function(event){
        event.preventDefault(); //dont send anything to server
        $('input[type=submit]').prop('disabled',true); //disables button for not clicking more than once
        var error=false;
        var ccNum= $('#card_number').val(),
            cvcNum=$('#card_code').val(),
            expMonth=$('#card_month').val(),
            expYear=$('#card_year').val();
            
        if (!error){
            //Get the stripe token
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        return false;
    });//Form submission
    
    function stripeResponseHandler(status, response){
        //get reference from the form:
        var f =$("#new_user");
        
        //get the token from the response:
        var token= response.id;
        
        //Add the token to the form: 
        f.append('<input type="hidden" name="user[stripe_card_token]" value="'+token+'"/>');
        
        //Submit the form:
        f.get(0).submit(); //in case they submitted many times just get the first one
        
    }
    
}); //close .ready