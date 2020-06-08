!function($){
    const $banner = $('.banner');
    const $picul = $('.banner ul');
    const $picli = $picul.children();
    const $btnli = $('.banner ol li');
    const $leftarrow = $('.left');
    const $rightarrow = $('.right');
    let $index = 0;
    let $timer = null;

    let $clonebox = $picli.first().clone(true,true);
    let $liwidth = $picli.eq(0).width();
    $picul.append($clonebox).css({
        width:$picul.children().length * $liwidth
    });

    $btnli.on('click',function(){
        $index = $(this).index()-1;

        tabswitch();
    });

    //显示左右箭头
    $banner.hover(function(){
        $leftarrow.show();
        $rightarrow.show();
        clearInterval($timer)
    },function(){
        $leftarrow.hide();
        $rightarrow.hide();
        $timer = setInterval(()=>{
            tabswitch();
        },2000)
    })

    //给箭头添加点击事件
    $rightarrow.on('click',function(){
        tabswitch();
        console.log(this);
    });

    $leftarrow.on('click',function(){
        $index -=2;
        tabswitch();
    })

    //切换过程，位置过程封装
    function tabswitch(){
        $index++;
        if($index === $btnli.length+1){
            $picul.css({
                left:0
            });
            $index = 1;
        }
        if($index === -1){
            $picul.css({
                left:-$btnli.length * $liwidth
            });
            $index = $btnli.length -1;
        }
        if($index === $btnli.length){
            $btnli.eq(0).addClass('active').siblings('ol li').removeClass('active');
        }else{
            $btnli.eq($index).addClass('active').siblings('ol li').removeClass('active');
        }
        $picul.stop(true).animate({
            left:-$liwidth * $index
        });
    }

    $timer = setInterval(()=>{
        tabswitch();
    },2000);
    
}(jQuery);