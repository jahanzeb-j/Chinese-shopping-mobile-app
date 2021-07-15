
// setTimeout(function(){
//   var userId=window.localStorage.getItem('userId')
//   var WangDeCommodityId=window.localStorage.getItem('WangDeCommodityId')
//   if (userId&&!WangDeCommodityId){
//     $('#userId').val(userId)
//     $.get(HOST_HDBMESSAGE+"/msg/getService?userId="+userId, function(result){
//       $("#serviceId").val(result);
//       window.localStorage.setItem("serviceId",result);
//       //initYYIM();
//     });
//   }
//   if (userId&&WangDeCommodityId){
//     $('#userId').val(userId)
//     $.get(HOST_HDBMESSAGE+"/msg/getService?userId="+userId+'&commodityId='+WangDeCommodityId, function(result){
//       $("#serviceId").val(result);
//       window.localStorage.setItem("serviceId",result);
//      // initYYIM();
//     });
//   }
// },2000)
// var body=document.getElementsByTagName('body')[0];
// var start2=2
// var size2=4;
//
// body.addEventListener('touchmove',function(){
//   if (body.offsetTop==0){
//     WKYYIMManager.prototype.getHistoryMessage(start2,size2);
//     start2=start2+size2;
//     alert('wcl')
//
//   }
// })









