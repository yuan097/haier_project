!function($){

    //渲染列表的数据
    const $oUl = $('.goods_box');
    console.log($oUl );
    
    $.ajax({
        url:'http://localhost/JS2002/haier_project/php/alldata.php',dataType:'json'
    }).done(function (data){
        let $strhtml = '<ul>';
        $.each(data, function (index,value){
            $strhtml += `
                <li class="list_li">
                    <a href="./details.html?sid=${value.sid}" target="_blank" class="img_box"><img class="lazy" data-original="${value.url}" wigth="210" height="210"></a>
                    <h3>${value.sid}${value.title}</h3>
                    <p class="price"><em>￥${value.price}</em></p>
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

    
        //分页
    $('.page').pagination({
        pageCount:3,
        jump: true,
        coping: true,
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
                            <a href="./details.html?sid=${value.sid}" target="_blank" class="img_box"><img  src="${value.url}></a>
                            <h3>${value.sid}${value.title}</h3>
                            <p class="price"><em>￥${value.price}</em></p>
                            <span>在售数量：${value.sailnumber}</span>
                        </li>   
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

    });
}(jQuery);