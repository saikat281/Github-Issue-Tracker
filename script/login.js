document.getElementById("login-btn").addEventListener("click",() =>{
    const userName = document.getElementById("input-name").value;
    const userPin = document.getElementById("input-pin").value;
    

    if(userName !="admin"){
        alert("Username not Matched:( please try again")
        return;
        
    }
    else if(userPin != "admin123"){
        alert("Invalid password:( Please try again!");
        return;
    }
    else{
        window.location.assign("/home.html");
    }
})