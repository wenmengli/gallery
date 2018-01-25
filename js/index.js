/**
 * Created by wen on 2017/12/1.
 */
//$(document).ready(function(){
//按钮对应的图片翻转

    //随机生成一个值  random([min,max])
    function random(range){
        var max=Math.max(range[0],range[1]);
        var min=Math.min(range[0],range[1]);
        var diff=max-min;
        var num=Math.ceil(Math.random()*diff+min);
        return num;
    }

    //输出所有海报
   function addPhoto(){
        var template=$(".wrap").html();
        //console.log(typeof  template);//string
        var html=[];
       var bars=[];
        for(var s in data){

       var _html= template.replace("{{index}}",s)
            .replace("{{image}}",data[s].img)
            .replace("{{capital}}",data[s].caption)
            .replace("{{desc}}",data[s].desc);
            html.push(_html);
            bars.push('<span id="nav_'+s+'" onclick="turn($(\'#photo-'+s+'\'))" class="i" >&nbsp;</span>');
            //bars.push("<span onclick='turn();' class='i'></span>");
        }
       html.push('<div id="nav">'+bars.join(" ")+'</div>');

       $(".wrap").html(html.join(" "));
       rsort(random([0,data.length]));
    }
    addPhoto();
    //计算左右分区的范围
    function range(){
        var range={ left:{ x:[] , y:[]} , right:{ x:[] , y:[]} };
       var wrap={
           w:$(".wrap").width(),
           h:$(".wrap").height()
       };
        var photo={
            w:$(".photo").width(),
            h:$(".photo").height()
        };
        range.wrap=wrap;
        range.photo=photo;
        range.left.x=[0-photo.w,wrap.w/2-photo.w/2];
        range.left.y=[0-photo.h,wrap.h];
        range.right.x=[wrap.w/2+photo.w/2,wrap.w+photo.w];
        range.right.y=[0-photo.h,wrap.h];
        //console.log(wrap.w,wrap.h);
        //console.log(photo.w,photo.h);
       return range;
    }


    //排序海报
    function rsort(n){
        var  _photo=$(".photo");
        var photos=[];
        for(var i=0;i<_photo.length;i++){

            $(_photo[i]).removeClass("photo-center","photo-front","photo-back");
            _photo[i].style.left='';
            _photo[i].style.top='';
            _photo[i].style['transform']='rotate(0deg)';

            photos.push( _photo[i]);
        }
        var photo_center=$("#photo-"+n);
        photo_center.addClass("photo-center");

        photo_center=photos.splice(n,1)[0];
        //console.log(photos.length);
        //把海报分为左右两个部分
        var photo_left=photos.splice(0,Math.ceil(photos.length/2));
        var photo_right=photos;
        //console.log(photo_left);
        //console.log(photo_right);
        var ranges=range();
        for(var s in photo_left){
            photo_left[s].style.left=random(ranges.left.x)+"px";
            photo_left[s].style.top=random(ranges.left.y)+"px";
            photo_left[s].style['-webkit-transform']='rotate('+random([-150,150])+'deg)';
        }
        for(var s in photo_right){
            photo_right[s].style.left=random(ranges.right.x)+"px";
            photo_right[s].style.top=random(ranges.right.y)+"px";
            photo_right[s].style['-webkit-transform']='rotate('+random([-150,150])+'deg)';

        }
    }
function turn(elem){
    if(elem.siblings().hasClass("photo-back")){
        elem.siblings().removeClass("photo-back");
    }
    var n=elem.attr("id").split("-")[1];
    $(".i").removeClass("i_current");
    $("#nav_"+n).addClass("i_current");

   if(!(elem.hasClass("photo-center"))){
      return rsort(n);
   }
      if( elem.hasClass("photo-front")){
     elem.removeClass("photo-front");
     elem.addClass("photo-back");
     }else if( elem.hasClass("photo-back")){
     elem.removeClass("photo-back");
     elem.addClass("photo-front");
     }

}



    $(".photo").click(function (){
        /*$(this).addClass("photo-center");
        $(this).get(0).style.left='';
        $(this).get(0).style.top='';
        $(this).get(0).style['transform']='rotate(0deg)';
        var n=$(this).attr("id");
        rsort(n);*/
        if($(this).hasClass("photo-front")){
            $(this).removeClass("photo-front");
            $(this).addClass("photo-back");
        }else if($(this).hasClass("photo-back")){
            $(this).removeClass("photo-back");
            $(this).addClass("photo-front");
        }
    });


//});
