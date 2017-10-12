<?php
/**
 * @desc 查询TIDL支持的地区
 * @author lvzonglang
 * @date 2017/2/24
 */

include_once __DIR__.'/../tidl_m_w_common.inc.php';
//模板
global $_INPUT;
if (is_assets_debug_mode()) {
    $tpl = new QuickSkin( '/tidl/serve/supportArea_dev.tpl.htm' );
}else{
//    $tpl = new QuickSkin( '/tidl/serve/supportArea.tpl.htm' );
    $tpl = new QuickSkin( '/tidl/serve/dist/html/supportArea.tpl.htm' );
}
$result=get_contents_by_url("http://w.zuzuche.com/tidl/wechat/weChatEvent.php?type=supportRegion&client=wap");
$result=json_decode($result,true);
$supportRegion=stripslashes($result['body']);
$tpl->assign('supportRegion', $supportRegion);
$is_app = is_app_terminal_type() ? 1 : 0;
$tpl->assign("is_app", $is_app);

if(strstr($_SERVER['HTTP_USER_AGENT'],'MicroMessenger')){
    //微信分享的授权
    require_once G_ZUZUCHE_M_PATH . "include/wx/jssdk.php";
    $jssdk = new JSSDK();
    $jssdk_sign = $jssdk->GetSignPackage();
    $tpl->assign('jssdk_sign', $jssdk_sign);
    $tpl->assign('show_wx_jsdk', 1);
}
$tpl->output();