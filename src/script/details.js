!function(){
    let $sid =location.search.substring(1).split('=')[1];

    const $midpic = $('#midpic');
    const $bpic = $('.bpic');
    const $title = $('.loadtitle');
    const $price = $('.loadpcp');

    if(!$sid){
        $sid = 1;
    }

    $.ajax({
        url:'http://localhost/JS2002/haier_project/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function(d){
        console.log(d);
        $midpic.attr('src',d.url);
        $midpic.attr('sid',d.sid);
        $bpic.attr('src',d.url);
        $title.html(d.title);
        $price.html(d.price);
        console.log(d.piclisturl.split(','));
        let picarr = d.piclisturl.split(',');
        let $strhtml = '';
        $.each(picarr, function(index, value) {
            $strhtml += '<li><img src="' + value + '"/></li>';
        });
        $('.show-wrap ul').html($strhtml);
    });

    //放大镜
    const $spic = $('.midbox');
    const $sf = $('.obg');
    const $bf = $('.bigbox');
    const $left = $('#left');
    const $right = $('#right');
    const $showlist = $('.show-wrap');

    //大盒/大图=小放/小盒
    $sf.width($spic.width() * $bf.width() / $bpic.width());
    $sf.height($spic.height()*$bf.height() / $bpic.height());
    let $bili = $bpic.width() / $spic.width();

    $spic.hover(function() {
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
        $(this).on('mousemove', function(ev) {
            let $leftvalue = ev.pageX - $('.details_box').offset().left - $sf.width() / 2;
            let $topvalue = ev.pageY - $('.details_box').offset().top - $sf.height() / 2;
            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $spic.width() - $sf.width()) {
                $leftvalue = $spic.width() - $sf.width()
            }

            if ($topvalue < 0) {
                $topvalue = 0;
            } else if ($topvalue >= $spic.height() - $sf.height()) {
                $topvalue = $spic.height() - $sf.height()
            }

            $sf.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bpic.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });

        });
    }, function() {
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });

    //小图切换-事件委托
    $('.show-wrap .ullist').on('click','li',function(){
        let $imgurl = $(this).find('img').attr('src');
        $midpic.attr('src',$imgurl);
        $bpic.attr('src',$imgurl);
    });

    //左右箭头事件
    let $num = 1;
    $right.on('click',function(){
        let $lists = $('.show-wrap .ullist li');
        if($lists.size() > $num){//限制点击条件
            $num++;
            $left.show();
            if(Math.ceil($lists.size()/5)  == $num){
                $right.hide();
            }
            $('.show-wrap .ullist').animate({
                left:-($num - 1) * 5*$lists.eq(0).outerWidth(true)
            });
            console.log($('.show-wrap .ullist').css('left'));
            console.log($num);
        }
    });

    $left.on('click',function(){
        let $lists = $('.show-wrap .ullist li');
        if($num >=Math.ceil($lists.size()/5)){
            $num --;
            $right.show();
            if($num <= 1){
                $left.hide();
            }
            $('.show-wrap .ullist').animate({
                left: -($num - 1) * 5*$lists.eq(0).outerWidth(true)
            });
        }
       
    });

    //购物车核心：存ID和数量
    let arrsid = []; //存储商品的编号
    let arrnum = []; //存储商品的数量

    //取出cookie，判断是第一次还是多次点击
function cookietoarray(){
    if($.cookie('cookiesid') && $.cookie('cookienum')){
        arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
        arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
    } else{
        arrsid =[];
        arrnum =[];
    }
}

$('.choose-box .cat').on('click', function() {
    //获取当前商品对应的sid
    let $sid = $(this).parents('.details_box').find('#midpic').attr('sid');
    //判断是第一次点击还是多次点击
    //多次点击
    //$.inArray(value,array,[fromIndex])
    //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
    cookietoarray();
    if ($.inArray($sid, arrsid) != -1) { //$sid存在，商品列表存在，数量累加
        //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
        let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val()); //取值
        arrnum[$.inArray($sid, arrsid)] = $num; //赋值
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    } else {
        //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
        arrsid.push($sid); //将编号$sid push到arrsid数组中
        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        arrnum.push($('#count').val()); //将数量push到arrnum数组中
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }
    alert('已成功加入购物车');
});

}(jQuery);