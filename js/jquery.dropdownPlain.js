$(function(){

    $("ul.mainmenu li").click(function(){
    
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    
    });
    
    $("ul.mainmenu li").hover(function(){
    
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    
    }, function(){
    
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    
    });
    
    $("ul.mainmenu li ul li:has(ul)").find("a:first").append(" &raquo; ");

});