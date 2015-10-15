chrome.storage.sync.get(function(katas){
    
    var kataContainer = document.getElementById("kataContainer");
    
    //check whether are saved katas or not
    if(Object.keys(katas).length > 0){
        //excute if there are saved katas
        for(var kataInfo in katas){  
            //current kata
            var kata = katas[kataInfo];

            //new row
            var row = document.createElement("div");
            row.className = "row";

            //kyu column
            var colKyu = document.createElement("div");
            colKyu.className = "col-xs-2";
            colKyu.innerHTML = kata.kyu;
            row.appendChild(colKyu);

            //title column
            var colTitle = document.createElement("div");
            colTitle.className = "col-xs-7";
            colTitle.innerHTML = kata.title;
            row.appendChild(colTitle);

            //time column
            var colTime = document.createElement("div");
            colTime.className = "col-xs-3";
            colTime.innerHTML = kata.time;      
            row.appendChild(colTime);

            //this "a" element is a wrapper to the row
            var a = document.createElement("a");
            a.addEventListener("click",goToKata);
            a.href = kata.url;      
            a.appendChild(row);

            //append the wrapper 'a' element
            kataContainer.appendChild(a);

            //append a horizontal line;
            var hr = document.createElement("hr"); 
            kataContainer.appendChild(hr);
        }
        //no katas are saved(solved)
        }else{
            kataContainer.innerHTML = "you haven't solved any kata yet";
        
        }

});

//function event for the 'a' element
function goToKata(event){
      var self = this;    
      //update the active tab with the url(href) of the 'a' element   
      chrome.tabs.update({ url: self.href });
   
      //we have to prevent the popup url to change too.
      event.preventDefault();
}