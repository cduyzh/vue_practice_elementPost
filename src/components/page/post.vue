<template>
	<div class="post-order"  v-loading.fullscreen.lock="fullscreenLoading">
		<el-row>
			<el-col :span="7" id="order-col">
				<!-- 我是订单栏 -->
				<el-tabs>
					<el-tab-pane class="orderClass" label="点餐">
						<!-- 点餐页面 -->
						<el-table :data="tableData">
							<el-table-column prop="goodsName" label="商品名称"></el-table-column>
							<el-table-column prop="count" label="数量" width="70"></el-table-column>
							<el-table-column prop="price" label="金额" width="70"></el-table-column>
							<el-table-column label="操作" fixed="right" width="100">
								<template slot-scope="scope">
									<el-button @click="delOrderList(scope.row)" type="text" size="small">删除</el-button>
									<el-button @click="addOrderList(scope.row)" type="text" size="small">增加</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="total-value">
							<span>数量：{{ totalNumFn }}个
							</span>
							<span>总价：{{ totalCountFn }}元
							</span>
						</div>
						<div class="order-div-btn">
							<el-button  @click="guaDan" type="warning">挂单</el-button>
							<el-button  @click="delAllGoods" type="danger">清空</el-button>
							<el-button @click="checkOut" type="success">结账</el-button>
						</div>
					</el-tab-pane>
					<el-tab-pane label="挂单">
						挂单页面
					</el-tab-pane>
					<el-tab-pane label="外卖">
						外卖页面
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="17">
				<div>
					<div class="title">常用商品</div>
					<div class="often-goods-list">
						<ul>
							<li @click="addOrderList(goods)" v-for="goods in oftenGoods" :key="goods.goodsId">
								<span>{{goods.goodsName}}</span>
								<span class="o-price">￥ {{goods. price }} 元
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div class="goods-type">
					<el-tabs>
						<el-tab-pane label="汉堡">
							<div>
								<ul class="cookList">
									<li @click="addOrderList(items)" v-for="items in type0Goods" :key="items.goodsId">
										<span class="foodImg"><img :src="items.goodsImg" width="100%"></span>
										<span class="foodName">{{items.goodsName}}</span>
										<span class="foodPrice">￥{{items.price}}元</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="小食">
							<div>
								<ul class="cookList">
									<li @click="addOrderList(items)" v-for="items in type1Goods" :key="items.goodsId">
										<span class="foodImg"><img :src="items.goodsImg" width="100%"></span>
										<span class="foodName">{{items.goodsName}}</span>
										<span class="foodPrice">￥{{items.price}}元</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="饮料">
							<div>
								<ul class="cookList">
									<li @click="addOrderList(items)" v-for="items in type2Goods" :key="items.goodsId">
										<span class="foodImg"><img :src="items.goodsImg" width="100%"></span>
										<span class="foodName">{{items.goodsName}}</span>
										<span class="foodPrice">￥{{items.price}}元</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="套餐">
							<div>
								<ul class="cookList">
									<li @click="addOrderList(items)" v-for="items in type3Goods" :key="items.goodsId">
										<span class="foodImg"><img :src="items.goodsImg" width="100%"></span>
										<span class="foodName">{{items.goodsName}}</span>
										<span class="foodPrice">￥{{items.price}}元</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>

			</el-col>
		</el-row>
	</div>
</template>

<script>
// import Vue from "vue";
import "../../assets/js/myStory";
import axios from "axios";
export default {
  name: "post",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalNum: 0,
      totalMoney: 0,
      fullscreenLoading: true
    };
  },
  computed: {
    totalNumFn() {
      this.totalNum = 0;
      this.totalMoney = 0;
      this.tableData.forEach(element => {
        this.totalNum += parseInt(element.count);
        // console.log(`total:${this.totalNum}`);
      });
      return this.totalNum;
    },
    totalCountFn() {
      this.tableData.forEach(element => {
        this.totalMoney += element.count * element.price;
        // console.log(`total:${this.totalMoney}`);
      });
      return this.totalMoney;
    }
  },
  mounted() {
    console.log("mounted");
    this.tableData = ms.get("tableData") || this.tableData;
  },
  watch: {
    tableData: {
      deep: true,
      handler: function(n, o) {
        if (n) {
          ms.set("tableData", this.tableData);
        } else {
          ms.set("tableData", []);
        }
      }
    }
  },
  created() {
    console.log("created");
    var me = this;
    // function getOftenGoods() {
    // 	axios.get("http://jspang.com/DemoApi/oftenGoods.php")
    // 		.then(response => {
    // 			// console.log(response.data);
    // 			me.oftenGoods = response.data
    // 		})
    // 		.catch(error => {
    // 			console.log(error);
    // 		})
    // };
    // getOftenGoods();
    // function getTypeGoods() {
    // 	axios.get("http://jspang.com/DemoApi/typeGoods.php")
    // 		.then(response => {
    // 			// console.log(response.data);
    // 			me.type0Goods = response.data[0]
    // 			me.type1Goods = response.data[1]
    // 			me.type2Goods = response.data[2]
    // 			me.type3Goods = response.data[3]
    // 		})
    // 		.catch(error => {
    // 			console.log(error);
    // 		})
    // }
    // getTypeGoods();
    // function getJson() {
    // 	axios.get("../../../static/a.json")
    // 		.then(response => {
    // 			// console.log(response.data);
    // 			me.tableData = response.data
    // 		})
    // }

    // getJson();
    // 合并多个axios请求
    function getOftenGoods() {
      return axios.get("http://jspang.com/DemoApi/oftenGoods.php");
    }
    function getTypeGoods() {
      return axios.get("http://jspang.com/DemoApi/typeGoods.php");
    }
    function getJson() {
      return axios.get("http://localhost:8080/static/a.json");
    }
    axios.all([getOftenGoods(), getTypeGoods(), getJson()]).then(
      axios.spread(function(a, b, c) {
        // 两个请求现在都执行完成
        // console.log(a);
        me.oftenGoods = a.data;
        // console.log(b);
        me.type0Goods = b.data[0];
        me.type1Goods = b.data[1];
        me.type2Goods = b.data[2];
        me.type3Goods = b.data[3];
        // console.log(c);

        // me.tableData = c.data;

        // 数据渲染完后消除加载动画
        me.fullscreenLoading = false;
      })
    );
  },

  methods: {
    //添加订单列表的方法
    addOrderList(goods) {
      this.totalCount = 0; //汇总数量清0
      this.totalMoney = 0;
      let isHave = false;
      //判断是否这个商品已经存在于订单列表
      for (let i = 0; i < this.tableData.length; i++) {
        // console.log(this.tableData[i].goodsId);
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true; //存在
        }
      }
      //根据isHave的值判断订单列表中是否已经有此商品
      if (isHave) {
        //存在就进行数量添加
        let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
        //console.log(arr);
      } else {
        //不存在就推入数组
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }

      //进行数量和价格的汇总计算
      this.tableData.forEach(element => {
        this.totalCount += element.count;
        this.totalMoney = this.totalMoney + element.price * element.count;
      });
    },
    delOrderList(goods) {
      this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
    },
    delAllGoods() {
      if (this.totalMoney != 0) {
        this.$message({
          message: "已成功删除！",
          type: "success"
        });
        this.tableData = [];
      } else {
        this.$message.error("已经没有物品了");
      }
    },
    checkOut() {
      if (this.totalMoney != 0) {
        this.tableData = [];
        this.totalMoney = 0;
        this.totalNum = 0;
        this.$message.success("已结账");
      } else {
        this.$message.error("结账不能为空！");
      }
    },
    guaDan() {
      let _data = JSON.stringify(this.tableData);
      this.$alert(`要传输的数据为：${_data}`, "挂单成功");
      console.log(_data);
      console.log(`要传输的数据为：${_data}`);
    }
  }
};
</script>

<style scoped>
#order-col {
  background-color: #fff;
  height: 100vh;
  color: #999;
}

.order-div-btn {
  margin-top: 10px;
}

.title {
  text-align: left;
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}

.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}

.o-price {
  color: #58b7ff;
}

.goods-type {
  clear: both;
}

.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}

.cookList li span {
  display: block;
  float: left;
}

.foodImg {
  width: 40%;
}

.foodName {
  font-size: 16px;
  padding-left: 10px;
  color: brown;
}

.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.total-value {
  margin-top: 10px;
}
.total-value > span {
  text-align: center;
  color: #333;
  font-size: 18px;
}
</style>
<style >
/* 重写element样式方法1 */
/*  重写饿了么样式 */
.el-tabs__active-bar {
  background-color: #1d90e6;
}
</style>
<style lang="scss">
@import "../../assets/css/test.scss";
.el-tabs__active-bar {
  background-color: #333;
}
</style>



