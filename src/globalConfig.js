export default function getGlobalConfig(){
	if(location.href.indexOf('mtest') > -1){
		window.SETDOMAIN = 'cn'
		window.M = 'mtest'
		window.HPS='http'
	} else {
		window.SETDOMAIN = 'com'
		window.M = 'm'
		window.HPS='https'
	}
	
	window.HP='http'
	
	//pc评价start
	window.HOST_HDPMESSAGE='https://hdpmessage-api.99114.' + SETDOMAIN
	//pc评价end

	//商品详情页、商品列表
	//评价
	window.HOST_HDPMESSAGE='http://hdpmessage-api.99114.' + SETDOMAIN


	///* 用户 */
	window.HOST_HDPUSER = HPS + '://hdpuser-api.99114.' + SETDOMAIN
	window.HOST_HDPTHEME = HP+'://hdptheme-api.99114.' + SETDOMAIN
	window.HOST_HDPCOMMODITY = HP+'://hdpcommodity-api.99114.' + SETDOMAIN
	window.HOST_HDPSHOPCAR = HP+'://hdpshopcar-api.99114.'+ SETDOMAIN

	window.HOST_HDPCAR = HP+'://hdpshopcar-api.99114.' + SETDOMAIN
	window.HOST_HDBITION = HP+'://hdpexhibition-api.99114.' + SETDOMAIN
	window.HOST_HDBMESSAGE = HP+ '://hdpmessage-api.99114.' + SETDOMAIN


	window.HOST_HDPPAY = HP+'://wsms-payment.99114.' + SETDOMAIN
	window.HOST_HDPTEST = 'http://'+ M +'.haodanpin.com' 

	window.HOST_HDPORDERS = HP+'://hdporders-api.99114.' + SETDOMAIN
	window.HOST_HDPMOBILEVIEW = HP+'://hdpmobileview-api.99114.' + SETDOMAIN
	window.HOST_ORDERS =HP+ '://hdporders-api.99114.'+ SETDOMAIN

	/* 用户 */

	window.URL_API_logistics = "http://wsms-logistics.99114.com"
	window.HOST_UPIMAGES = 'http://plw-file.99114.com/file/uploadBase64Json'//h5图片上传接口
	window.HOST_IMGFILEPATH = 'img.99114.'+ SETDOMAIN

	// app下载
	window.HOST_APPMANAGE = 'http://app-manage.99114.' + SETDOMAIN
	window.HREF = HP + '://'+ M + '.haodanpin.com'
}



