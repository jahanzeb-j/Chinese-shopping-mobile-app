import foundIndex from '../page/foundGoods/index.vue'
import publishPurchase from '../page/foundGoods/publish_purchase.vue'
import fgSearch from '../page/foundGoods/fg_search.vue'
const lookIndex = () => import ( '../page/lookGoods/index.vue')
import messageIndex from '../page/message/index.vue'
import myIndex from '../page/my/index.vue'
import themeIndex from '../page/theme/index.vue'
import login from '../page/login/index.vue'
import theme_list from '../page/theme/theme_list.vue'
import theme_detail from '../page/theme/theme_detail.vue'
const exhibition_details = () => import ('../page/lookGoods/exhibition_details.vue')
const city_switch = () => import ('../page/lookGoods/city_switch.vue')
const nogps = () => import ('../page/lookGoods/nogps.vue')
import order_page from '../page/foundGoods/order_page.vue'
const area = () => import ('../page/theme/area.vue')
// 分类
import ClassifyIndex from '../page/classify/index.vue'
import ClassifySecond from '../page/classify/ClassifySecond.vue'
import first_pay from '../page/foundGoods/first_pay.vue'
import add_bank_card from '../page/foundGoods/add_bank_card.vue'
import write_card_info from '../page/foundGoods/write_card_info.vue'
import write_person_info from '../page/foundGoods/write_person_info.vue'
import choose_card from '../page/foundGoods/choose_card.vue'
import current_card from '../page/foundGoods/current_card.vue'
import verification_pay_sms from '../page/foundGoods/verification_pay_sms.vue'
import pay_susess from '../page/foundGoods/pay_susess.vue'
import pay_failure from '../page/foundGoods/pay_failure.vue'
import choose_address from '../page/foundGoods/choose_address.vue'
//付博添加
const register = () => import ( '../page/login/register.vue')
const protocol = () => import ( '../page/login/protocol.vue')
const protocolNative =() => import ('../page/login/protocolNative.vue')
const forgetPassword = () => import ( '../page/login/forgetPassword.vue')
const setPassword = () => import ( '../page/login/setPassword.vue')
const setPasswordForget = () => import ( '../page/login/setPasswordForget.vue')
const forgetPassword1 = () => import ( '../page/login/forgetPassword1.vue')
import personal from '../page/my/personal.vue'
const logistics = () => import ( '../page/order/logistics.vue')
const collection = () => import ( '../page/my/collection.vue')
const goods_edit = () => import ( '../page/my/goods_edit.vue')
const collection_theme= () => import ('../page/my/collection_theme.vue')
const collection_exhibition = () => import ( '../page/my/collection_exhibition.vue')
const exhibition_edit = () => import ( '../page/my/exhibition_edit.vue')
const theme_edit = () => import ( '../page/my/theme_edit.vue')
//seed add router
import good_detail from '../page/foundGoods/good_detail.vue'
import DLF_good_detail from '../page/foundGoods/DLF_good_detail.vue'
import change_address from '../page/foundGoods/change_address.vue'
import name from '../page/my/name.vue'
import account from '../page/my/account.vue'
import address from '../page/my/address.vue'
import shopping from '../page/my/shopping.vue'
import phone_change1 from '../page/my/phone_change1.vue'
import phone_change2 from '../page/my/phone_change2.vue'
import number_change from '../page/my/number_change.vue'
import third_party from '../page/my/third_party.vue'
import add_address from '../page/my/add_address.vue'
const edit_address = () => import ( '../page/my/edit_address.vue')
import order_all from '../page/order/order_all.vue'
import assess from '../page/order/assess.vue'
import order_details from '../page/order/order_details.vue'
import dzf from '../page/order/wait_pay.vue'
import dsh from '../page/order/wait_get_goods.vue'
import dfh from '../page/order/wait_send_goods.vue'
import add_action from '../page/order/addAction.vue'
import find_assess from '../page/foundGoods/find_assess.vue'
import serach_history from '../page/lookGoods/serach_history.vue'
import searchresult from '../page/lookGoods/searchresult.vue'
import goodsparent from '../page/lookGoods/goodsparent.vue'
import system_message from '../page/message/system_message.vue'
import customer_service from '../page/message/customer_service.vue'
import customer_service_new from '../page/message/customer_service_new.vue'
import afterSellService_list from '../page/afterSellService/afterSellService_list.vue'
import afterSellService_detail from '../page/afterSellService/afterSellService_detail.vue'
const return_money_apply = () => import ( '../page/afterSellService/return_money_apply.vue')
const return_good_apply = () => import ( '../page/afterSellService/return_good_apply.vue')
import logistics_company from '../page/afterSellService/logistics_company.vue'
import logistics_info from '../page/afterSellService/logistics_info.vue'
import revise_apply from '../page/afterSellService/revise_apply.vue'
const image_text_ios = () => import ( '../page/foundGoods/image_text_ios.vue')
const image_text_android = () => import ( '../page/foundGoods/image_text_android.vue')
//李长玲添加
import tplLogin from '../page/login/tplLogin.vue'
import tplLoginPwd from '../page/login/tplLoginPwd.vue'
import whiteJudge from '../page/login/whiteJudge.vue'
const found_index_android = () => import ('../page/foundGoodsIos_Android/found_index_android.vue')
const found_index_ios = () => import ( '../page/foundGoodsIos_Android/found_index_ios.vue')
const IndexApp = () => import ( '../page/foundGoodsIos_Android/indexApp.vue')
//jin add router
const theme_detail_ios = () => import ('../page/theme/theme_detail_ios.vue')
const themeDetail_Android = () => import ('../page/theme/theme_detail_Android.vue')
import recommendedMoreList from '../page/foundGoods/recommendedMoreList.vue'   //好单品1.3版本新增页面 => 更多推荐
// 测试
let test = () => import ('../page/foundGoods/test.vue')
const TestJSBridge = () => import('../page/foundGoods/TestJSBridge.vue')
// 郭旦旦添加
const guiDe = () => import('../page/guide/guide.vue')
//新品上架
import NewProducts from '../component/newProducts.vue'
//活动页注册
const registerAct = () =>import('../page/activity/registerAct.vue')
const addAddressAct = () =>import('../page/activity/addAddressAct.vue')
const successAct = () =>import('../page/activity/successAct.vue')
// 限时购
import limitTimeBuyNative from '../page/limitTimeBuy/limitTimeBuyNative.vue'
import limitTimeBuy from '../page/limitTimeBuy/limitTimeBuy.vue'
//第一次登录跳转会员页
import Membership from '../page/my/membership.vue'
// 余茂言  添加
import DaunWu from '../page/duanWu/DaunWu.vue'
import wuyue from '../page/wuyue/wuyue.vue'
import zhuanti from '../page/zhuanti/zhuanti.vue'
import shoppingbottom from '../component/shoppingbottom'
import qiyue from '../page/qiyue/qiyue.vue'
let routes = [
  { path: '/', redirect: '/found_index' },
  { path: '/themeIndex', component: themeIndex },
  { path: '/login', component: login },
  { path: '/found_index', component: foundIndex },
  { path: '/fg_search', component: fgSearch },
  { path: '/publish_purchase', component: publishPurchase },
  { path: '/lookIndex', component: lookIndex }, 
  { path: '/messageIndex', component: messageIndex, meta: { isLogin: true, loginBack: '004' } },
  { path: '/myIndex', component: myIndex, meta: { isLogin: true, loginBack: '002' } },
  { path: '/themeIndex', component: themeIndex },
	{ path: '/DaunWu', component: DaunWu },
	{ path: '/wuyue', component: wuyue },
  { path: '/zhuanti', component: zhuanti },
  { path: '/qiyue', component: qiyue },
	{ path: '/shoppingbottom', component: shoppingbottom },
	
  //王曹麟添加
  { path: '/exhibition_details', component: exhibition_details },
  { path: '/serach_history', component: serach_history },
  { path: '/searchresult', component: searchresult },
  { path: '/system_message', component: system_message },
  { path: '/customer_service', component: customer_service },
  { path: '/customer_service_new', component: customer_service_new },
  { path: '/city_switch', component: city_switch },
  { path: '/goodsparent', component: goodsparent },
  { path: '/nogps', component: nogps },
  //付博添加
  { path: '/register', component: register },
  { path: '/protocol', component: protocol },
  { path: '/protocolNative', component: protocolNative },
  { path: '/forgetPassword', component: forgetPassword },
  { path: '/setPassword', component: setPassword },
  { path: '/personal', component: personal },
  { path: '/collection', component: collection },
  { path: '/goods_edit', component: goods_edit },
  { path: '/collection_theme', component: collection_theme },
  { path: '/collection_exhibition', component: collection_exhibition },
  { path: '/exhibition_edit', component: exhibition_edit },
  { path: '/theme_edit', component: theme_edit },
  // seed add
  { path: '/theme_list', component: theme_list },
  { path: '/theme_detail', component: theme_detail },
  { path: '/good_detail', component: good_detail },
  { path: '/DLF_good_detail', component: DLF_good_detail },
  { path: '/order_page', component: order_page},

  { path: '/change_address', component: change_address },
  { path: '/choose_address', component: choose_address },
  { path: '/afterSellService_list', component: afterSellService_list },
  { path: '/afterSellService_detail', component: afterSellService_detail },
  { path: '/return_money_apply', component: return_money_apply },
  { path: '/return_good_apply', component: return_good_apply },
  { path: '/logistics_company', component: logistics_company },
  { path: '/logistics_info', component: logistics_info },
  { path: '/revise_apply', component: revise_apply },
  { path: '/first_pay', component: first_pay },
  { path: '/add_bank_card', component: add_bank_card },
  { path: '/write_card_info', component: write_card_info },
  { path: '/write_person_info', component: write_person_info },
  { path: '/choose_card', component: choose_card },
  { path: '/current_card', component: current_card },
  { path: '/verification_pay_sms', component: verification_pay_sms },
  { path: '/pay_susess', component: pay_susess },
  { path: '/pay_failure', component: pay_failure },
  { path: '/name', component: name },
  { path: '/account', component: account },
  { path: '/address', component: address },
  { path: '/shopping', component: shopping },
  { path: '/number_change', component: number_change },
  { path: '/phone_change1', component: phone_change1 },
  { path: '/phone_change2', component: phone_change2 },
  { path: '/third_party', component: third_party },
  { path: '/add_address', component: add_address },
  { path: '/order_all', component: order_all },
  { path: '/assess', component: assess },
  { path: '/order_details', component: order_details },
  { path: '/edit_address', component: edit_address },
  { path: '/dzf', component: dzf },
  { path: '/dsh', component: dsh },
  { path: '/dfh', component: dfh },
  { path: '/find_assess', component: find_assess },
  { path: '/add_action', component: add_action },
  { path: '/setPasswordForget', component: setPasswordForget },
  { path: '/forgetPassword1', component: forgetPassword1 },
  { path: '/logistics', component: logistics },
  { path: '/image_text_ios', component: image_text_ios },
  { path: '/image_text_android', component: image_text_android },
  //李长玲添加
  { path: '/tplLogin', component: tplLogin },
  { path: '/tplLoginPwd', component: tplLoginPwd },
  { path: '/whiteJudge', component: whiteJudge },
  // { path: '/found_index_android', component: found_index_android },
  // { path: '/found_index_ios', component: found_index_ios },
  { path: '/found_index_android', component: IndexApp },
  { path: '/found_index_ios', component: IndexApp },
  //jin add router
  { path: '/theme_detail_ios', component: theme_detail_ios },
  { path: '/themeDetail_Android', component: themeDetail_Android },
  { path: '/recommendedMoreList', component: recommendedMoreList },
  // 分类
  { path: '/classifyIndex', component: ClassifyIndex, title: '分类' },
  { path: '/ClassifySecond', component: ClassifySecond },
  // 测试
  { path: '/test111', component: test },
  { path: '/testJSBridge', component: TestJSBridge },
  // 郭旦旦添加
  { path: '/guide', component: guiDe },
  { path: '/newProducts', component: NewProducts },
  // 活动注册页
  { path:'/registerAct',component:registerAct},
  { path:'/addAddressAct',component:addAddressAct},
  { path:'/successAct',component:successAct},
  // 限时购
  { path : '/limitTimeBuyNative' , component: limitTimeBuyNative },
  { path : '/limitTimeBuy' , component: limitTimeBuy },
  //第一次登录会员跳转
  { path : '/membership' , component: Membership },
  
]
export default routes
