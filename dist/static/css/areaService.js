(function (areamenu) {
    /**
     * AreaMenu.push([2,'北京市',1,'101101',6])
       AreaMenu.push([3,'北京市',1,'101101101',9])
       AreaMenu.push([4,'东城区',1,'101101101101',12])
       AreaMenu.push([5,'西城区',1,'101101101102',12])
       AreaMenu.push([6,'崇文区',1,'101101101103',12])
       AreaMenu.push([7,'宣武区',1,'101101101104',12])
       AreaMenu.push([9,'丰台区',1,'101101101106',12])

       其中
            6,9,12为     length
            101101101101,101101101为     id

        调用方法:

            AreaMenu.getProvinceList()        //取得所有省
            AreaMenu.getCityList()            //取得所有市
            AreaMenu.getDistrictList()        //取得所有县
            AreaMenu.getById(id)              //取得某个节点
            AreaMenu.getSubList(id)           //取得所有子菜单
            AreaMenu.getParent(id)            //取得父节点
            AreaMenu.getListByLength(id)      //根据id长度取得该级别的节点list

     */
    if (areamenu == undefined) {
        alert("请引入地域依赖js文件");
        return {}
    }
    areamenu['getProvinceList'] = function () {
        return this.getListByLength(6)
    };
    areamenu['getCityList'] = function () {
        return this.getListByLength(9)
    };
    areamenu['getDistrictList'] = function () {
        return this.getListByLength(12)
    };
    areamenu['getById'] = function (id) {
        id = new String(id);
        if (id.length==6 ||id.length==6 || id.length==9 || id.length==12){
            for (var i = 0; i < areamenu.length; i++) {
                if (areamenu[i][3] == id) {
                    return areamenu[i];
                }
            }
        }else{
            console.log('没有该级别的元素')
            return null;
        }

    };
    areamenu['getListByLength'] = function (length) {
        if (length==6 ||length==6 || length==9 || length==12){
            var list = [];
            for (var i = 0; i < areamenu.length; i++) {
                if (areamenu[i][4] == length) {
                    list.push(areamenu[i])
                }
            }
            return list;
        }else{
            console.log('没有该级别的元素')
            return null;
        }

    };
    /**
     * 扩展startWith方法
     * @param str
     * @return
     */
    String.prototype.startWith=function(str){
        if(str==null||str==""||this.length==0||str.length>this.length)
            return false;
        if(this.substr(0,str.length)==str)
            return true;
        else
            return false;
        return true;
    };
    areamenu['getSubList'] = function (id) {
        if (id.length==3 || id.length==6 || id.length==9 ) {
            var temp = this.getListByLength(id.length+3);
            var result = [];
            for(var j=0;j<temp.length;j++){
                if((temp[j][3]+"").substr(0,id.length)==id){
                    result.push(temp[j])
                }
            }
            return result
        } else {
            console.log('没有子节点')
            return null;
        }
    };
    areamenu['getParent'] = function (id) {
        id = new String(id);
        if (id.length==6 || id.length==9 || id.length==12 ) {
            return this.getById(id.substring(0, id.length - 3))
        } else {
            console.log('没有父节点')
            return null;
        }
    }
})(AreaMenu)
