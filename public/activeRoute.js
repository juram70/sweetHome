$(function(){
    $(".navigation li").each(function(){
        let currentRoute=window.location.pathname;
        let route=$(this).find("a").attr("href")
         
        if(currentRoute==route){
            $(this).addClass("actives bg-primary");
        }
        
    })
})