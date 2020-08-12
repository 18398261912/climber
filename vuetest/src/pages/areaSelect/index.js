import $ from 'jquery';


var res=[];
export default {
  name: 'select',
  componemts: {},

  data(){
      return{
        provinceIndex: "",
        cityIndex: "",
        districtIndex: "",
        street: "",
        areaList: [],
        res: []
    };
  },
  created: function () {
    var url="static/areaJson/area.json";
    const _this = this;
    $.ajax({
      type: "GET",
      dataType: "json",
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      url: "static/areaJson/area.json",
      success: function (result) {
        _this.areaList = result;
      }
    });
  },
  mounted: function () {
    var _this = this;
    var districtIndex = ""; //这边只要传入县级的值即可
    var street = ""; //这边只要传入县级的值即可
    _this.provinceIndex = districtIndex.substr(0, 2);
    _this.cityIndex = districtIndex.substr(0, 4);
    _this.districtIndex = districtIndex.substr(0, 6);
    _this.street = street;
  },
  computed: {
    provinceList: function () {
      res = [{"label": "", "value": "-- 请选择省份 --"}];
      this.areaList.forEach(function (one) {
        res.push({"label": one.label, "value": one.value})
      });
      return res
    },
    cityList: function () {
      var _this = this;
      if ("" == _this.provinceIndex) {
        res = [{"label": "", "value": "-- 请选择省份 --"}];
      } else {
        res = [{"label": "", "value": "-- 请选择市 --"}];
        this.areaList.forEach(function (one) {
          if (one.label == _this.provinceIndex) {
            // 判断是否需要清空下级值
            if ("" != _this.cityIndex && _this.provinceIndex != _this.cityIndex.substr(0, 2)) {
              _this.cityIndex = "";
              _this.districtIndex = ""; //这里同时清空下下级的数据，至于原因可以自己去尝试！
            }
            one.children.forEach(function (item) {
              res.push({"label": item.label, "value": item.value})
            });
          }
        });
      }
      return res
    },

    districtList: function () {
      var _this = this;
      if ("" == _this.provinceIndex) {
        res = [{"label": "", "value": "-- 请选择省份 --"}];
      } else if ("" == _this.cityIndex) {
        res = [{"label": "", "value": "-- 请选择市 --"}];
      } else {
        res = [{"label": "", "value": "-- 请选择县 --"}];
        this.areaList.forEach(function (one) {
          if (one.label == _this.provinceIndex) {
            one.children.forEach(function (item) {
              if (item.label == _this.cityIndex) {
                // 判断是否需要清空下级值
                if ("" != _this.districtIndex && _this.cityIndex != _this.districtIndex.substr(0, 4)) {
                  _this.districtIndex = "";
                }
                item.children.forEach(function (value) {
                  res.push({"label": value.label, "value": value.value})
                });
              }
            });
          }
        });
      }
      return res
    },
    streetTip: function () {
      var _this = this;
      if ("" == _this.provinceIndex) {
        res = "-- 请选择省份 --";
      } else if ("" == _this.cityIndex) {
        res = "-- 请选择市 --";
      } else if ("" == _this.districtIndex) {
        res = "-- 请选择县 --";
      } else {
        res = "-- 请填写街道 --";
      }
      return res;
    }
  },
  methods: {}
};
