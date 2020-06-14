!function($){
    render($(".zhihui"),1);
    render($(".jiankang"),2);
    render($(".renqi"),3);
    render($(".yanzhi"),4);
    render($(".keji"),5);
    render($(".jiadian"),6);

    function render(obj,pagenum){
        $.ajax({
            url:'http://localhost/JS2002/haier_project/php/listdata.php',
            data:{
                page:pagenum
            },
            dataType:'json'
        }).done(function (data){
            let $strhtml = '';
            $.each(data,function(index,value){
                $strhtml +=`
                <div class="shop2_box">
                <img src="${value.url}" alt="" width="200px",height="200px"><br>
                <div class="shopS_title">${value.title}</div>
                <div class="shopS_num">￥${value.price}</div>  
                </div>
                `;
            });
            obj.html($strhtml);
        })
    }
    $('.heart_tab li').on('click',function(){
        $(this).css({borderBottom:'4px solid #005aaa'}).siblings().css({borderColor:'transparent'});
        $('.xinxuan_box2').eq($(this).index()).show().siblings().hide();
    })
}(jQuery);