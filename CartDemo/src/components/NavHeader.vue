<template>
    <header class="header">
        <a href="javascipt:" class="goBack"><img src="static/img/icon-left.png" alt=""></a>
        <span class="headerTitle">购物车</span>
    </header>
</template>
<style>
    .header{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        background-color: #ff6537;
        color: #fff;
        font-size:18px;
        font-weight: bold;
        text-align: center;
        z-index: 2;
    }
    .header .goBack{
        position: absolute;
        left: 12px;
        top:6px;
        display: inline-block;
        width: 14px;
        height: 26px;
    }
    .header .goBack img{
        width: 100%;
    }
</style>