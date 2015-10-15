//show icon in the omnibox if the domain is codewars
function showIcon(tabId, changeInfo, tab){   
    
    if(tab.url.indexOf("codewars.com") !== -1){
             chrome.pageAction.show(tabId);
        }              
}

//inject the script(train.js) containing the timer if the string "train/" is found in the url  
function train(tabId, changeInfo, tab){
  
     if(tab.url.indexOf("train/") !== -1){           
            chrome.tabs.executeScript( { file: "js/train.js" } ); 
     }   
}

//listen to any update and execute the functions
chrome.tabs.onUpdated.addListener(showIcon);
chrome.tabs.onUpdated.addListener(train);



