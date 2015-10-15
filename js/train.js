//We fisrt check is the timer have been already injected. If so, it will ignore any update.
if(document.getElementById("timerId") === null){
    
    //create the timer and inject it into the page.
    var timer = document.createElement("div");
    timer.innerHTML = "00:00:00";
    timer.id = "timerId";
    
    //this is where the timer will be located on the page.
    //feel free to move it wherever you want.
    var content = document.getElementsByClassName("mvn")[0];
    var cnt = document.getElementsByClassName("is-darkened pas js-theme")[0];

    cnt.insertBefore(timer,content);   
    
    var seconds = 0,
        minutes = 0,
        hours = 0;
    //This interval will start the timer. The ruturned timerId will be used later to stop the timer when
    //the kata is complete. 
    var timerId = setInterval(function(){
        
        if(seconds > 59){
            seconds = 0;
            minutes++;
        }
        if(minutes > 59){
            minutes = 0;
            hours++;
        }
        
        var tempSec = seconds < 10 ? "0" + seconds : seconds;
        var tempMin = minutes < 10 ? "0" + minutes : minutes;
        var tempHour = hours < 10 ? "0" + hours : hours;
        var time = tempHour + ":" + tempMin + ":" + tempSec;
        
        //it will refress every second.
        timer.innerHTML = time;
        seconds++;
        
    },1000);
    
    
//listen to the click event of the "Submit" button, alse known as attempt button
document.getElementById("attempt_btn").addEventListener('click', function(){
    //this variable "seconds" corresponds to the duration of the kata being testing.
    var seconds = 0;
    
    //kata's test will take 0 to 6 senconds to complete after pressing the submit button.
    //while the kata is being testing the message value on the page is "..." (Ellipsis) 
    //after the submit button is pressed it will set the below interval that will check if the kata is correct
    //by cheking the result message every second. If the kata solution is wrong it will stop itself after 8 seconds.
    var submitTimerId = setInterval(function(){
        //clear interval after 8 seconds, there are just 6 seconds for the test to complete
        //after 6 seconds the system(Codewars) will throw a timeout error
        if(seconds === 8){  
            //until this point it means the solution it wrong so we stop the interval for checking the result message.
            clearInterval(submitTimerId);            
        }
               
        //check for message value every second. 
        //if the message has a value of "Correct!" or similar the kata is valid and it will stop the Inteval for
        //checking the message value. It will also stop the timer.
        var message = document.getElementsByClassName("message")[0];
        if(message.innerHTML === "Correct!" ||
           message.innerHTML === "Impressive!" ||
           message.innerHTML === "Correctamundo!" ||
           message.innerHTML === "Great!" ||
           message.innerHTML === "Excellent!" ||
           message.innerHTML === "Good Job!" ||
           message.innerHTML === "Outstanding!"){
            
            //stop both intervals
            clearInterval(submitTimerId);
            clearInterval(timerId);
            
            //now we are ready to get all the values and save them.
            //title of the current kata
            var kataTitle = document.querySelector("h4.mbs.is-white-text").innerHTML;
            
            // level of the current kata
            var kyu = document.querySelector(".five.columns")
            .firstChild
            .firstChild
            .firstChild
            .firstChild
            .firstChild
            .innerHTML;
            
            //time spent on the current kata
            var time = timer.innerHTML;
            
            //the object with all the collected values to be saved.
            var kata ={
                title: kataTitle,
                kyu: kyu,
                time: time,
                url: location.href //we also need the url to come back to the kata whenever we want to.
            };
            
            //we create an object with one property, this property is the title of the current kata and will be
            //use as an Id to contain the kata object.
            var newKata = {};
            newKata[kataTitle] = kata;
            
            //save the kata using 'storage.sync' so it will be available in every device logged in with your
            //google account
            chrome.storage.sync.set(newKata,function(){
               //alert("saved");
            });
            
        }
        seconds++;
        
    },1000)
});

}

console.log("time running");


