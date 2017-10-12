<?php
/**
 * @desc TIDL激活页
 * @author lvzonglang
 * @date 2017/2/23
 */
include_once __DIR__.'/../tidl_m_w_common.inc.php';
if(!isset($_COOKIE['tidl_index_rand'])){
    $rand = rand(0,9);
    setcookie("tidl_index_rand",$rand, time()+3600*24*3);   //三天内保持这个随机数
}else{
    $rand = $_COOKIE['tidl_index_rand'];
}
if(isset($_GET['rand'])){
    $rand = (int)$_GET['rand'];
}

//分享链接A\B测试
global $_INPUT;
if($_INPUT['topic']=='experiment'){
    $share_url = "http://l.zuzuche.com/GmhTPJ";
}else if($_INPUT['topic']=='blank'){
    $share_url = "http://l.zuzuche.com/A0nzyC";
}else{
//    $share_url = "http://zuzuche.com/t/hjwlf";
    $share_url = 'http://l.zuzuche.com/OxQrRD';  //Gracy  替换 新旧短链解析结果最终一致
}

$tpl = new QuickSkin( 'tidl/serve/activation_v2.tpl.htm' );
$is_app = is_app_terminal_type() ? 1 : 0;
$tpl->assign("is_app", $is_app);
$tpl->assign('share_url', $share_url);
if(strstr($_SERVER['HTTP_USER_AGENT'],'MicroMessenger')){
    //微信分享的授权
    require_once G_ZUZUCHE_M_PATH . "include/wx/jssdk.php";
    $jssdk = new JSSDK();
    $jssdk_sign = $jssdk->GetSignPackage();
    $tpl->assign('jssdk_sign', $jssdk_sign);
    $tpl->assign('show_wx_jsdk', 1);
}

$tpl->output();
