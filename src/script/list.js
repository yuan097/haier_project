!function($){

    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;
    //渲染列表的数据
    const $oUl = $('.goods_box');
    
    $.ajax({
        url:'http://localhost/JS2002/haier_project/php/listdata.php',dataType:'json'
    }).done(function (data){
 
        let $strhtml = '<ul>';
        $.each(data, function (index,value){
            $strhtml += `
                <li class="list_li">
                    <a href="./details.html?sid=${value.sid}" target="_blank" class="img_box"><img class="lazy" data-original="${value.url}" wigth="210" height="210"></a>
                    <h3>${value.sid}${value.title}</h3>
                    <p class="price">￥<em>${value.price}</em></p>
                    <span>在售数量：${value.sailnumber}</span>
                </li>
            `;
        });
        $strhtml +='</ul>'
        $oUl.html($strhtml);

        //添加懒加载
        $(function(){
            $("img.lazy").lazyload({ effect:"fadeIn" });
        });

        array_default = [];//排序前的li数组
        array = [];//排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.goods_box li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });


     //2.分页思路
    //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
    $('.page').pagination({
        pageCount: 6,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://localhost/JS2002/haier_project/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '<ul>';
                $.each(data, function (index, value) {
                    $strhtml += `
                        <li class="list_li">
                            <a href="./details.html?sid=${value.sid}" target="_blank" class="img_box">
                            <img  src="${value.url}">
                            </a>
                            <h3>${value.sid}${value.title}</h3>

                            <p class="price">
                            ￥<em>${value.price}</em>
                            </p>
                            <span>在售数量：${value.sailnumber}</span>
                        </li>   
                    `;
                    
                    
                });
                $strhtml += '</ul>';
                $oUl.html($strhtml);

                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;
                // console.log($('.goods_box li'));
                
                //将页面的li元素加载到两个数组中
                $('.goods_box li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });
    
    //排序
    $('.price_btn').eq(0).on('click',function(){
        $.each(array_default,function(index,value){
            $('.goods_box').append(value);
            
        });
        return;
    });
    $('.price_btn').eq(1).on('click',function(){
        for(let i=0; i<array.length -1; i++){
            for(let j=0;j<array.length -i-1;j++){
                prev = parseFloat(array[j].find('.price').children('em').html().toString());
                next = parseFloat(array[j + 1].find('.price').children('em').html().toString());console.log(array[j + 1]);
                console.log(array[j]);
                
                //通过价格的判断，改变的是li的位置
                if(prev > next){
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
       
        $.each(array,function(index,value){
            console.log(value);
            $('.goods_box').append(value);
        });
    });
    $('.price_btn').eq(2).on('click',function(){
        for(let i = 0;i<array.length -1;i++){
            for(let j=0;j<array.length - i -1;j++){
                prev = parseFloat(array[j].find('.price').children('em').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').children('em').html().substring(1));
                //通过价格的判断，改变的是li的位置
                if(prev <next){
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j +1]= temp;  
                }
            }
        }
        $.each(array,function(index,value){
            $('.goods_box').append(value);
        });
    })
    
}(jQuery);
