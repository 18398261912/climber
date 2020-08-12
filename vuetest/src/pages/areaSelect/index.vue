<template>
  <div class="address_select" id="address">
    <div class="select_div">
      <select name="province" class="province" v-model="provinceIndex">
        <option v-for="(provinceOne,index) in provinceList" :value="provinceOne.label">
          {{provinceOne.value}}
        </option>
      </select>
    </div>
    <div class="select_div">
      <select name="city" class="city" v-model="cityIndex">
        <option v-for="(cityOne,index) in cityList" value="" :value="cityOne.label">
          {{cityOne.value}}
        </option>
      </select>
    </div>
    <div class="select_div">
      <select name="district" class="district" v-model="districtIndex">
        <option v-for="(districtOne,index) in districtList" value="" :value="districtOne.label">
          {{districtOne.value}}
        </option>
      </select>
    </div>
    <br/>
    <input type="street" :placeholder="streetTip" :value="street"/>
  </div>
</template>
<style>
  @import "select.css";
</style>
<script src="./index.js"></script>
