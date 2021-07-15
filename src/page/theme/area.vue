<template>
    <div class="area">
        <div>
            <select name="" id="province" @change="chooseProvince" v-model="province" @touchstart="startProvince">
                <option :value="province.id" v-for="province in provinces">
                    {{ province.text }}
                </option>
            </select>
        </div>
        <div>
            <select name="" id="city" v-model="city" @change="chooseCity">
                <option :value="city.id" v-for="city in newCitys">
                    {{ city.text }}
                </option>
            </select>
        </div>
        <div>
            <select name="" id="" v-model="district">
                <option :value="district.id" v-for="district in newDistricts">
                    {{ district.text }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>
    .area div{
        float: left;
        width:10rem;
        height:5rem;
    }

    .area div select{
        width:100%;
        height:100%;
        font-size:20px;
    }

</style>

<script type="text/babel">
  export default{
      name: 'area',
      data(){
        return{
            provinces: [],
            citys: [],
            districts: [],
            province: '',
            city: '',
            district: '',
            newCitys: [],
            newDistricts: []
        }
      },
      created(){
        this.getAreaData()

      },
      methods: {
          getAreaData(){
              let url = "../../../static/css/areas.json";
              this.$resource (url ).get({ }).then((response) => {
                //   console.log( response )
                  this.provinces = response.body.province
                  this.citys = response.body.city
                  this.districts = response.body.district
              })
          },
          chooseProvince( ){
              let url = "../../../static/css/areas.json";
              let province1 = this.province.slice(0,2)
              this.$resource (url ).get({ }).then((response) => {
                  var city1 = response.body.city
                  for( var i = 0; i < city1.length; i++ ){
                    if( city1[i].id.slice(0,2) == province1 ){
                        this.newCitys.push( city1[i] )
                    }
                  }

              })
          },
          chooseCity(){
              let url = "../../../static/css/areas.json";
              let city1 = this.city.slice(0,2)
              this.$resource (url ).get({ }).then((response) => {
                  var district1 = response.body.district
                  for( var i = 0; i < district1.length; i++ ){
                      if( district1[i].id.slice(0,2) == city1 ){
                          this.newDistricts.push( district1[i] )
                      }
                  }
              })
          }
      }
  }
</script>
