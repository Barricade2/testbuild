
const emojis = ['😶', '😠', '😦', '😕', '😀', '😍'];
let checked_val = {var:"0"};

$("input[name='rating']").click(function(){
    if ($(this).val() == checked_val.var){
        var i = 0;
    }else{
        var i = $(this).val();
    }
    $(".emoji").html(emojis[i]);
});

$(".rate_option").on("click", function(){
    console.log(".rate_option");
    if($(this).val() == checked_val.var){
         console.log(".if", checked_val);
        $('input[name=rating][value=0]').prop("checked",true);
        checked_val.var = "0";
        console.log(".new", checked_val.var);
    }else{
        console.log(".else", checked_val.var);
        checked_val.var = $(this).val();
        console.log(".new", checked_val.var);
        $('input[name=rating][value=null]').removeProp("checked");
  }
});

export {
  emojis,
  checked_val
}