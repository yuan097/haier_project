!function(){
    const $form = $('form');
    const $username = $('#username');
    const $tel = $('#tel');
    const $password = $('#password')
    const $span = $('span');
    const $agreen = $('.agreen')

    let userflag = true;//标记
    let telflag = true;
    let passflag = true;

    //1.用户名
    $username.on('fouse',function(){
        $span.eq(0).html('设置后不可更改，中英文均可，最长14个英文或7个汉字').css({
            color:'#333'
        });
    });

    
    $username.on('blur',function(){
        if($(this).val() !== ''){
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g,'aa').length;
            if(len < 14){
                $.ajax({
                    type:'post',
                    url:'http://localhost/JS2002/haier_project/php/registry.php',
                    data:{
                        username:$username.val()
                    }
                }).done(function(result){
                    if(!result){
                        $span.eq(0).html('√').css('color','green');
                        userflag = true;
                    }else{
                        $span.eq(0).html('该用户名已经存在').css('color','red');
                        userflag = false;
                    }
                })
            }else{
                $span.eq(0).html('该用户名长度有问题').css({
                    color:'red'
                });
                userflag = false;
            }
        }else{
            $span.eq(0).html('该用户名不能为空').css({
                color:'red'
            })
            userflag = false;
        }
    });
    //手机号

    $tel.on('blur',function(tel){
        if($(this).val() !== ''){
            let tel = /^1[356789]\d{9}$/;
            if(tel.test($tel.val())){
                $span.eq(1).html('√').css({
                    color: 'green'
                });
                telflag = true
            }else{
                $span.eq(1).html('手机号码格式有问题').css({
                    color:'red'
                });
                telflag = false;
                }
        
            }else{
                $span.eq(1).html('手机号码不能为空').css({
                    color:'red'
                });
                telflag = false;
        }
    });

    //密码

    $password.on('input',function(){
        let $pass = $(this).val();
        if($pass.length >= 6 && $pass.length <= 16){
            let regnum = /\d+/;
            let regupper = /\[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\w\_]+/;
            
            let $count = 0;
            if(regnum.test($pass)){
                $count++;
            }
            if(regupper.test($pass)){
                $count++;
            }
            if(reglower.test($pass)){
                $count++;
            }
            if(regother.test($pass)){
                $count++;
            }

            switch($count){
                case 1:
                    $span.eq(2).html('弱').css({
                        color:'red'
                    });
                    passflag = false;
                    break;

                case 2:
                case 3:
                    $span.eq(2).html('中').css({
                        color:'yellow'
                    });
                    passflag = true;
                    break;
                case 4:
                    $span.eq(2).html('强').css({
                        color:'green'
                    });
                    passflag = true;
                    break;
            }
        }else{
            $span.eq(2).html('密码长度错误').css({
                color:'red'
            });
            passflag = false;
        }
    });

    $password.on('blur',function(){
        if($(this).val() !== ''){
            if(passflag){
                $span.eq(2).html('√').css({
                    color :'green'
                });
                passflag = true;
            }
        }else{
            $span.eq(2).html('密码不能为空').css({
                color:'red'
            });
            passflag = false;
        }
    });

    $form.on('submit',function(){
        if($username.val() === ''){
            $span.eq(0).html('该用户名不能为空').css({
                color:'red'
            });
            userflag = false;
        }

        if($tel.val() === ''){
            $span.eq(1).html('手机号不能为空').css({
                color:'red'
            });
            telflag = false;
        }
        
        if($password.val() === ''){
            $span.eq(2).html('密码不能为空').css({
                color:'red'
            });
            passflag = false;
        }
        if (!userflag || !telflag || !passflag) {
            return false;
        }
       
    });

}(jQuery);