<template>
    <div>
        <nav-header></nav-header>
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>  
                <symbol id="icon-ok" viewBox="0 0 32 32">
                  <title>ok</title>
                  <path class="path1"
                        d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
                </symbol>
            </defs>
        </svg>    
        <div class="container">
            <div class="cart-item" v-for="storeItem in goodsList">
                <div class="cart-item-head">
                    <div class="cart-item-check" @click="storeToggleCheckAll(storeItem)">
                        <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'checked' : storeItem.storeChecked == '1'}">
                            <svg class="icon icon-ok">
                                <use xlink:href="#icon-ok"></use>
                            </svg>
                        </a>
                    </div>
                    <span class="icon-store"><img src="static/img/icon-store.png" alt=""></span>
                    <span class="storeName">{{storeItem.store}}</span>
                    <a href="javascipt:" class="editCartItem" @click="showEdit(storeItem)">{{storeItem.edit == "1" ? "编辑" : "完成"}}</a>
                </div>
                <ul class="cart-item-list">
                    <li class="" v-for="goodsItem in storeItem.goods">
                        <div class="cart-tab">
                            <div class="cart-item-check" @click="editCart('checked', goodsItem, storeItem)">
                               <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'checked' : goodsItem.checked == '1' }">
                                    <svg class="icon icon-ok">
                                        <use xlink:href="#icon-ok"></use>
                                    </svg>
                               </a>
                            </div>
                            <div class="cart-item-pic">
                                <img v-bind:src="'static' + goodsItem.src">
                            </div>
                            <div class="cart-item-del" v-bind:class="{'hide':storeItem.edit=='1'}">删除</div>    
                            <div class="cart-item-descr" v-bind:class="{'marginRight':storeItem.edit=='0'}">
                                <p class="cart-item-title">{{goodsItem.title}}</p>
                                <div v-bind:class="{'hide':storeItem.edit=='0'}">
                                    <p class="cart-item-type">{{goodsItem.type}}</p>
                                    <p class="cart-item-price">{{goodsItem.price | currency('¥')}}</p>
                                    <p class="cart-item-length">x{{goodsItem.length}}</p>   
                                </div>
                                <div class="cart-item-edit" v-bind:class="{'hide':storeItem.edit=='1'}">
                                    <a href="javascipt:" class="inB subGoods" @click="editCart('minu', goodsItem)">-</a>
                                    <a href="javascipt:" class="inB addGoods" @click="editCart('add', goodsItem)">+</a>
                                    <input type="number" class="inB inputGoodsLength" v-bind:value="goodsItem.length">
                                </div>
                            </div> 
                        </div>
                    </li>
                </ul>
            </div>
        </div>
       <footer class="footer">
            <div class="cart-item-check" @click="toggleCheckAll">
               <a href="javascipt:" class="checkbox-btn item-check-btn" v-bind:class="{'checked' : checkAllFlag}">
                    <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                    </svg>
               </a>
            </div>
            <span>全选</span>
            <div class="checkout" v-bind:class="{'noCheckout' : checkedCount == 0}">结算({{checkedCount}})</div>

            <div class="price-descr">
                <p>合计：<span class="total-price">{{totalPrice | currency('¥')}}</span>不含运费</p>
            </div>
       </footer>
    </div>
</template>
<style>
    .container{
        padding-bottom:60px;
        padding-top:48px;
    }
</style>
<script>
    
    import axios from 'axios'
    import './../assets/css/base.css'
    import './../assets/css/cart.css'

    //导入组件
    import NavHeader from '@/components/NavHeader.vue'
    
    export default{
        data(){
            return {
               goodsList  : []
            }
        },
        mounted(){
            this.init();
        },
        computed : {
            //全选
            checkAllFlag(){
                let i = 0;
                this.goodsList.forEach((storeItem) => {
                    storeItem.goods.forEach((goodsItem) => {     
                        i++;
                    })
                   
                })
                return this.checkedCount == i;
            },
            //商品种类
            checkedCount(){
                let i = 0;
                this.goodsList.forEach((storeItem) => {
                    storeItem.goods.forEach((goodsItem) => {
                         if(goodsItem.checked == '1'){
                            i++;
                        }
                    })   
                })
                return i;
            },
            //商品总金额
            totalPrice(){
                var money = 0;
                this.goodsList.forEach((storeItem) => {
                    storeItem.goods.forEach((goodsItem) => {
                        if(goodsItem.checked == '1'){
                            money += parseFloat(goodsItem.price)*parseInt(goodsItem.length);
                        }
                    })                  
                })
                return money;
            }
        },
        methods : {
            //获取购物车列表
            init(){
                axios.get("static/data/cart.json").then((response) => {
                    let res = response.data;
                    this.goodsList  = res.result.goodsList;
                    console.log(res);
                });
            },
            //编辑商品 
            showEdit(storeItem){
                storeItem.edit = !storeItem.edit; 
            },
            //单间店铺全选 
            storeToggleCheckAll(storeItem){
                storeItem.storeChecked = storeItem.storeChecked == '1' ? '0' :'1';
                storeItem.goods.forEach((item) => {
                    item.checked = storeItem.storeChecked;
                })
            },
            //全选
            toggleCheckAll(){
                var flag = !this.checkAllFlag;
                this.goodsList.forEach((storeItem) => {
                    storeItem.storeChecked = flag ? '1' : '0';
                    storeItem.goods.forEach((goodsItem) => {
                       goodsItem.checked = flag ? '1' : '0';
                    })  
                })
            },
            //编辑
            editCart(flag, item, storeItem){
                if(flag == 'add'){
                    if(parseInt(item.length) >= parseInt(item.ck)){
                        alert("库存不足");
                        return;
                    }
                    item.length++;
                    
                }
                else if(flag == 'minu'){
                    if(parseInt(item.length) <= 1){
                        return;
                    }
                    item.length--;
                }
                else if(flag == 'checked'){
                    item.checked = item.checked == '1' ? '0' :'1';
                    let goodsItem = storeItem.goods;
                    for(let i=0; i<goodsItem.length; i++){
                        if(goodsItem[i].checked == '0'){
                            storeItem.storeChecked = '0';
                            return;
                        }
                    }
                    storeItem.storeChecked = '1';
                }
            },
        },
        components : {
           NavHeader,
        }
    }
</script>