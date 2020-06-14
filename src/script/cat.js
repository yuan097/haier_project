 !function(){
    //获取cookie渲染对应的商品列表

    function showlist(sid,num){
        $.ajax({
            url:'http://localhost/JS2002/haier_project/php/alldata.php',
            dataType:'json'
        }).done(function(data){
            $.each(data,function(index,value){
                if(sid == value.sid){
                   let $clonebox = $('.info ul:nth-child(1)').clone(true,true);
                   $clonebox.find('.info_2').find('img').attr('src', value.url);
                   $clonebox.find('.info_2').find('img').attr('sid', value.sid);
                   $clonebox.find('.info_3').find('a').html(value.title);
                   $clonebox.find('.info_5').find('strong').html(value.price);
                   $clonebox.find('.info_7').find('strong').html(value.price);
                   $clonebox.find('.info_6').find('input').val(num);
                   //计算单个商品的价格
                   $clonebox.find('.info_7').find('strong').html((value.price * num).toFixed(2));
                   $clonebox.css('display', 'block');
                   $('.info').append($clonebox);
                   
              
                   calcprice();//计算总价
                }
            });
        });
    }
  
    
     //4.获取cookie然后配合前面封装的函数实现渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let shu = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
        let zhi = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        $.each(shu, function(index, value) {
            showlist(shu[index], zhi[index]);
        });
    }

    
    //计算总价使用函数封装
    function calcprice(){
        let $sum = 0;
        let $count =0;
        
        $('.info ul:visible').each(function(index,ele){
            
            if($(ele).find('.info_1 input').prop('checked')){
                $sum += parseInt($(ele).find('.info_6 input').val());
                console.log($(ele).find('.info_6 input').val());
                $count += parseFloat($(ele).find('.info_7 strong').html());
                
            }
        });
        //赋值
        $('.choosed').find('span').html($sum);
        $('.allprice strong').html($count.toFixed(2));
    }

    //全选按钮(列表是渲染出来的，需要使用事件委托)
    $('.allselect').on('change',function(){
        $('.info ul:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
        $('.allselect').prop('checked',$(this).prop('checked'));
        calcprice();
    });

    //事件委托
    let $inputs = $('.info ul:visible').find(':checkbox');
    $('.info').on('change',$inputs,function(){
        if($('.info ul:visible').find(':checkbox').length === $('.info ul:visible').find('input:checked').size()){
            $('.allselect').prop('checked',true);
        }else{
            $('.allselect').prop('checked',false);
        }
        calcprice();//全选改变重新计算总价
    });

    //数量改变。cookie对应发生变化
    //数量++
    $('.but').on('click',function(){
        let $num = $(this).parents('.info ul').find('.info_6 input').val();
        $num++;
        $(this).parents('.info ul').find('.info_6 input').val($num);

        $(this).parents('.info ul').find('.info_7 strong').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });

    //数量--
    $('.cat').on('click',function(){
        let $num = $(this).parents('.info ul').find('.info_6 input').val();
        $num--;
        if($num < 1){
            $num = 1;
        }
        $(this).parents('.info ul').find('.info_6 input').val($num);
        $(this).parents('.info ul').find('.info_7 strong').html(calcsingleprice($(this)));
        calcprice();//计算总价
        setcookie($(this));//设置cookie
    });

    //直接输入数量
    $('.info_6 input').on('input',function(){
        let $reg = /^\d+$/g;
        let $value = $(this).val();
        if(!$reg.test($value)){
            $(this).val(1);
        }
        $(this).parents('.info ul').find('.info_7 strong').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });

    //数量改变重新计算单价
    function calcsingleprice(obj){
        let $dj = parseFloat(obj.parents('.info ul').find('.info_5 strong').html());
        let $num = parseInt(obj.parents('.info ul').find('.info_6 input').val());
        return($dj * $num).toFixed(2)
    }

    //将改变后的数量存放到cookie中
    let arrsid = [];//存储商品的编号
    let arrnum = [];//存储商品的数量
    function cookietoarray(){
        if($.cookie('cookiesid') && $.cookie('cookienum')){
            arrsid = $.cookie('cookiesid').split(',');//获取cookie同时转换为数组[1，2，3，4]
            arrnum = $.cookie('cookienum').split(',');

        }else{
            arrsid = [];
            arrnum = [];
        }
    }
     

//删除。封装函数实现从cookie取值中。删除对应的sid和数量
    function setcookie(obj){
        cookietoarray();
        let $sid = obj.parents('.info ul').find('img').attr('sid');
        arrnum[$.isArray($sid,arrsid)] = obj.parents('.info ul').find('.info_6 input').val();
        $.cookie('cookienum',arrnum,{expires:10,path:'/'});
    }

    function delcookie(sid,arrsid){
        let $index = -1;
        $.each(arrsid,function(index,value){
            if(sid === value){
                $index = index;
            }
        });
        arrsid.splice($index,1);
        arrnum.splice($index,1);
        $.cookie('cookiesid',arrsid,{expires: 10,path:'/'});
        $.cookie('cookienum',arrnum,{expires:10,path:'/'});
    }
    //删除单个
    $('.info_8 a').on('click',function(){
        cookietoarray();
        if(window.confirm('你确定要删除吗？')){
            $(this).parents('.info ul').remove();
            delcookie($(this).parents('.info ul').find('img').attr('sid'),arrsid);
            calcprice();//计算总价
        }
    });
    //删除多个
    $('.del a').on('click',function(){
        if(window.confirm('你确定要全部删除吗？')){
            $('.info ul:visible').each(function(){
                if($(this).find(':checkbox').is(':checked')){//判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'),arrsid);
        
                }
            });
            calcprice();//计算总价 
        }
    });
       
}(jQuery)