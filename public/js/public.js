// 菜单js
$(function() {


    $(".top_nav ul li").mouseenter(
        function() {
            $(this).addClass("cur")
            $(this).siblings().removeClass("cur")
                // var n = $(".top_nav ul li.cur").index();
        }
    ).mouseleave(
        function() {
            $(".top_nav ul li").eq().siblings().removeClass("cur");
            $(".top_nav ul li").eq().addClass("cur")
        }
    )
})
$(function() {
    jQuery(".fix").slide({
        type: "menu", // 效果类型，针对菜单/导航而引入的参数（默认slide）
        titCell: ".navlv1", //鼠标触发对象
        targetCell: ".navlv2", //titCell里面包含的要显示/消失的对象
        effect: "slideDown", //targetCell下拉效果
        delayTime: 300, //效果时间
        triggerTime: 0, //鼠标延迟触发时间（默认150）
        returnDefault: true, //鼠标移走后返回默认状态，例如默认频道是“预告片”，鼠标移走后会返回“预告片”（默认false）
        defaultIndex: 2
    });
})

// 侧边栏
$(function() {
    $(".side_box").hide()
    window.onscroll = function() {
        var autoheight = document.body.scrollTop || document.documentElement.scrollTop;
        if (autoheight > 240) {
            $(".side_box").fadeIn(500)
        } else {
            $(".side_box").fadeOut(500)
        }
    }
    $(".sidetop").click(
        function() {
            $('body,html').animate({ "scrollTop": 0 }, 500);
        }
    )
})