// QQ表情插件
(function($){

	var em = [
			{'id':1,'phrase':'[龇牙]','url':'expression_ciya.png'},
			{'id':2,'phrase':'[哈哈]','url':'expression_haha.png'},
			{'id':3,'phrase':'[害羞]','url':'expression_haix.png'},
			{'id':4,'phrase':'[惊恐]','url':'expression_jingk.png'},
			{'id':5,'phrase':'[拜拜]','url':'expression_bye.png'},
			{'id':6,'phrase':'[大哭]','url':'expression_crya.png'},
			{'id':7,'phrase':'[鼻涕]','url':'expression_bit.png'},
			{'id':8,'phrase':'[汗]','url':'expression_hanb.png'},
			{'id':9,'phrase':'[汗死]','url':'expression_hana.png'},
			{'id':10,'phrase':'[可怜]','url':'expression_kelian.png'},
			{'id':11,'phrase':'[亲亲]','url':'expression_kissb.png'},
			{'id':12,'phrase':'[色]','url':'expression_se.png'},
			{'id':13,'phrase':'[调皮]','url':'expression_tiaop.png'},
			{'id':14,'phrase':'[偷笑]','url':'expression_toux.png'},
			{'id':15,'phrase':'[吓到]','url':'expression_xia.png'},
			{'id':16,'phrase':'[疑问]','url':'expression_yiw.png'},
			{'id':17,'phrase':'[晕]','url':'expression_yun.png'},
			{'id':18,'phrase':'[ok]','url':'expression_ok.png'},
			{'id':19,'phrase':'[yeak]','url':'expression_yeak.png'},
			{'id':20,'phrase':'[拜托]','url':'expression_bait.png'},
			{'id':21,'phrase':'[鼓掌]','url':'expression_guz.png'},
			{'id':22,'phrase':'[祈祷]','url':'expression_pray.png'},
			{'id':23,'phrase':'[握手]','url':'expression_wos.png'},
			{'id':24,'phrase':'[赞]','url':'expression_zan.png'},
			{'id':25,'phrase':'[弱]','url':'expression_ruo.png'},
			{'id':26,'phrase':'[拳]','url':'expression_quan.png'},
			{'id':27,'phrase':'[私家车]','url':'expression_car.png'},
			{'id':28,'phrase':'[大巴]','url':'expression_bus.png'},
			{'id':29,'phrase':'[火车]','url':'expression_train.png'},
			{'id':30,'phrase':'[飞机]','url':'expression_plane.png'},
			{'id':31,'phrase':'[打闪]','url':'expression_shand.png'},
			{'id':32,'phrase':'[下雨]','url':'expression_rain.png'},
			{'id':33,'phrase':'[下雪]','url':'expression_snow.png'},
			{'id':34,'phrase':'[雨伞]','url':'expression_umbre.png'},
			{'id':35,'phrase':'[彩虹]','url':'expression_rainb.png'},
			{'id':36,'phrase':'[多云]','url':'expression_cloudy.png'},
			{'id':37,'phrase':'[晴天]','url':'expression_sunny.png'},
			{'id':38,'phrase':'[茶]','url':'expression_tea.png'},
			{'id':39,'phrase':'[汉堡]','url':'expression_hanbao.png'},
			{'id':40,'phrase':'[米饭]','url':'expression_rice.png'},
			{'id':41,'phrase':'[啤酒]','url':'expression_beer.png'},
			{'id':42,'phrase':'[蛋糕]','url':'expression_cake.png'},
			{'id':43,'phrase':'[篮球]','url':'expression_basket.png'},
			{'id':44,'phrase':'[足球]','url':'expression_ball.png'},
			{'id':45,'phrase':'[台球]','url':'expression_taiq.png'},
			{'id':46,'phrase':'[羽毛球]','url':'expression_yum.png'},
			{'id':47,'phrase':'[炸弹]','url':'expression_zhad.png'},
			{'id':48,'phrase':'[气球]','url':'expression_qiq.png'},
			{'id':49,'phrase':'[心碎]','url':'expression_xins.png'},
			{'id':50,'phrase':'[药]','url':'expression_med.png'},
			{'id':51,'phrase':'[玫瑰花]','url':'expression_rose.png'},
			{'id':52,'phrase':'[爱心]','url':'expression_heart.png'},
			{'id':53,'phrase':'[吻]','url':'expression_kissa.png'},
			{'id':54,'phrase':'[礼盒]','url':'expression_box.png'},
			{'id':55,'phrase':'[钻石]','url':'expression_zuan.png'},
			{'id':56,'phrase':'[给力]','url':'expression_geili.png'},
			{'id':57,'phrase':'[囧]','url':'expression_jiong.png'},
			{'id':58,'phrase':'[邮件]','url':'expression_mail.png'}
          ];

	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;

		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}

		$(this).click(function(e){
			var strFace, divFace;
			if($('#'+id).length<=0){
				divFace = $('<div id="'+id+'" style="position:absolute;display:none;z-index:10000000;" class="qqFace"></div>');
				strFace = '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=0; i<em.length; i++){
					//alt="'+em[i].phrase+'" title="'+em[i].phrase+'"
					strFace += '<td><img src="'+path+em[i].url+'"  onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + em[i].phrase + '\');" /></td>';
					if( (i+1) % 9 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table>';
				$(this).parent().append(divFace);
				divFace.html(strFace);
			}else if($('#'+id).is(':visible')){
				$('#'+id).hide();
				return;
			}
			$('#'+id).show();
			e.stopPropagation();
		});

		// $(document).click(function(){
		// 	$('#'+id).hide();
		// });
	};
})(jQuery);

jQuery.extend({
	unselectContents: function(){
	if(window.getSelection)
		window.getSelection().removeAllRanges();
	else if(document.selection)
		document.selection.empty();
	},
	_calTextCount : function(){
		   var _chatArea = $('#chatArea');
		   var _textMax = 150;
		   var _text = _chatArea.val();
		   var _num = _text.length;
//		   var emtionText = _text.match(/\[.*?\]/g);
//		   if(emtionText && emtionText.length>0){
//			   _num = numberAdd(numMin(_num, emtionText.toString().length), emtionText.length);
//		   }

		   if(_num > _textMax){
			   var _outCount = numMin( _num, _textMax);
			   if(typeof _outCount === 'number'){
				   $('#areaCount').html('您输入的字数已超过<i class=\"col-red\">'+_outCount+'</i>字');
			   }else{
				   $('#areaCount').html('字数计算有误');
			   }
			   return false;
		    }else{
		    	var _outCount = numMin(_textMax, _num);
		    	$('#areaCount').html('您还可以输入<i class=\"col-blue\">'+_outCount+'</i>字');
		    	return true;
		    }
	},
	emotionsToHtml : function(content) {
    var em = [
			{'id':1,'phrase':'[龇牙]','url':'expression_ciya.png'},
			{'id':2,'phrase':'[哈哈]','url':'expression_haha.png'},
			{'id':3,'phrase':'[害羞]','url':'expression_haix.png'},
			{'id':4,'phrase':'[惊恐]','url':'expression_jingk.png'},
			{'id':5,'phrase':'[拜拜]','url':'expression_bye.png'},
			{'id':6,'phrase':'[大哭]','url':'expression_crya.png'},
			{'id':7,'phrase':'[鼻涕]','url':'expression_bit.png'},
			{'id':8,'phrase':'[汗]','url':'expression_hanb.png'},
			{'id':9,'phrase':'[汗死]','url':'expression_hana.png'},
			{'id':10,'phrase':'[可怜]','url':'expression_kelian.png'},
			{'id':11,'phrase':'[亲亲]','url':'expression_kissb.png'},
			{'id':12,'phrase':'[色]','url':'expression_se.png'},
			{'id':13,'phrase':'[调皮]','url':'expression_tiaop.png'},
			{'id':14,'phrase':'[偷笑]','url':'expression_toux.png'},
			{'id':15,'phrase':'[吓到]','url':'expression_xia.png'},
			{'id':16,'phrase':'[疑问]','url':'expression_yiw.png'},
			{'id':17,'phrase':'[晕]','url':'expression_yun.png'},
			{'id':18,'phrase':'[ok]','url':'expression_ok.png'},
			{'id':19,'phrase':'[yeak]','url':'expression_yeak.png'},
			{'id':20,'phrase':'[拜托]','url':'expression_bait.png'},
			{'id':21,'phrase':'[鼓掌]','url':'expression_guz.png'},
			{'id':22,'phrase':'[祈祷]','url':'expression_pray.png'},
			{'id':23,'phrase':'[握手]','url':'expression_wos.png'},
			{'id':24,'phrase':'[赞]','url':'expression_zan.png'},
			{'id':25,'phrase':'[弱]','url':'expression_ruo.png'},
			{'id':26,'phrase':'[拳]','url':'expression_quan.png'},
			{'id':27,'phrase':'[私家车]','url':'expression_car.png'},
			{'id':28,'phrase':'[大巴]','url':'expression_bus.png'},
			{'id':29,'phrase':'[火车]','url':'expression_train.png'},
			{'id':30,'phrase':'[飞机]','url':'expression_plane.png'},
			{'id':31,'phrase':'[打闪]','url':'expression_shand.png'},
			{'id':32,'phrase':'[下雨]','url':'expression_rain.png'},
			{'id':33,'phrase':'[下雪]','url':'expression_snow.png'},
			{'id':34,'phrase':'[雨伞]','url':'expression_umbre.png'},
			{'id':35,'phrase':'[彩虹]','url':'expression_rainb.png'},
			{'id':36,'phrase':'[多云]','url':'expression_cloudy.png'},
			{'id':37,'phrase':'[晴天]','url':'expression_sunny.png'},
			{'id':38,'phrase':'[茶]','url':'expression_tea.png'},
			{'id':39,'phrase':'[汉堡]','url':'expression_hanbao.png'},
			{'id':40,'phrase':'[米饭]','url':'expression_rice.png'},
			{'id':41,'phrase':'[啤酒]','url':'expression_beer.png'},
			{'id':42,'phrase':'[蛋糕]','url':'expression_cake.png'},
			{'id':43,'phrase':'[篮球]','url':'expression_basket.png'},
			{'id':44,'phrase':'[足球]','url':'expression_ball.png'},
			{'id':45,'phrase':'[台球]','url':'expression_taiq.png'},
			{'id':46,'phrase':'[羽毛球]','url':'expression_yum.png'},
			{'id':47,'phrase':'[炸弹]','url':'expression_zhad.png'},
			{'id':48,'phrase':'[气球]','url':'expression_qiq.png'},
			{'id':49,'phrase':'[心碎]','url':'expression_xins.png'},
			{'id':50,'phrase':'[药]','url':'expression_med.png'},
			{'id':51,'phrase':'[玫瑰花]','url':'expression_rose.png'},
			{'id':52,'phrase':'[爱心]','url':'expression_heart.png'},
			{'id':53,'phrase':'[吻]','url':'expression_kissa.png'},
			{'id':54,'phrase':'[礼盒]','url':'expression_box.png'},
			{'id':55,'phrase':'[钻石]','url':'expression_zuan.png'},
			{'id':56,'phrase':'[给力]','url':'expression_geili.png'},
			{'id':57,'phrase':'[囧]','url':'expression_jiong.png'},
			{'id':58,'phrase':'[邮件]','url':'expression_mail.png'}
          ];
        //正则查找“[]”格式
//	            var regx=/(\[.*?\])*/g;
        if(typeof content == 'string'){
        	var rs = content.match(/\[.*?\]/g);
        	if(rs && rs!=null){
        		for( i = 0; i < rs.length; i++) {
                    for( n=0; n< em.length; n++ ){
                        if(em[n].phrase == rs[i]){
                            // var t = "<img src='"+webImUIPath+"images/expression/default/"+em[n].url+"' style='display:inline;' />";
                            var t = "<img class='qqFaceIm' src='http://static.99114.com/static/webImUI/images/expression/default/"+em[n].url+"' style='display:inline;' />";
                            content = content.replace(rs[i],t);
                            break;
                        }
                    }
                }
        	}
        }
	     return content;
	 }
});
jQuery.fn.extend({
	selectContents: function(){
		$(this).each(function(i){
			var node = this;
			var selection, range, doc, win;
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){
				range = doc.createRange();
				range.selectNode(node);
				if(i == 0){
					selection.removeAllRanges();
				}
				selection.addRange(range);
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){
				range.moveToElementText(node);
				range.select();
			}
		});
	},

	setCaret: function(){
		if(!$.support .msie) return;
		var initSetCaret = function(){
			var textObj = $(this).get(0);
			textObj.caretPos = document.selection.createRange().duplicate();
		};
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
	},

	insertAtCaret: function(textFeildValue){
		var textObj = $(this).get(0);
		if(document.all && textObj.createTextRange && textObj.caretPos){
			var caretPos=textObj.caretPos;
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?
			textFeildValue+'' : textFeildValue;
		} else if(textObj.setSelectionRange){
			var rangeStart=textObj.selectionStart;
			var rangeEnd=textObj.selectionEnd;
			var tempStr1=textObj.value.substring(0,rangeStart);
			var tempStr2=textObj.value.substring(rangeEnd);
			textObj.value=tempStr1+textFeildValue+tempStr2;
			//textObj.focus();
			//var len=textFeildValue.length;
			//textObj.setSelectionRange(rangeStart+len,rangeStart+len);
			textObj.blur();
// 			$._calTextCount();
		}else{
			textObj.value+=textFeildValue;
		}
	}
});
