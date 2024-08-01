<template>
  <!--  <el-form class="">
      <el-row :gutter="0">
        <el-col>

        </el-col>

      </el-row>
    </el-form>-->
  <!--  <el-form
        :label-position="labelPosition"
        label-width="auto"
        :model="formLabelAlign"
        style="max-width: 600px"
    >
      <el-form-item label="Form Align" label-position="right">
        <el-radio-group v-model="labelPosition" aria-label="label position">
          <el-radio-button value="left">Left</el-radio-button>
          <el-radio-button value="right">Right</el-radio-button>
          <el-radio-button value="top">Top</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Form Item Align" label-position="right">
        <el-radio-group
            v-model="itemLabelPosition"
            aria-label="item label position"
        >
          <el-radio-button value="">Empty</el-radio-button>
          <el-radio-button value="left">Left</el-radio-button>
          <el-radio-button value="right">Right</el-radio-button>
          <el-radio-button value="top">Top</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Name" :label-position="itemLabelPosition">
        <el-input v-model="formLabelAlign.name"/>
      </el-form-item>
      <el-form-item label="Activity zone" :label-position="itemLabelPosition">
        <el-input v-model="formLabelAlign.region"/>
      </el-form-item>
      <el-form-item label="Activity form" :label-position="itemLabelPosition">
        <el-input v-model="formLabelAlign.type"/>
      </el-form-item>
    </el-form>-->

  <!--背景颜色-->
  <div class="bgColor">
    <!--背景图片-->
    <div class="bgImg">
      <!--面板-->
      <div>
        <el-form
            label-width="auto"
            style="max-width: 600px"
        >
          <el-row>
            <el-col :span="20">
<!--              <el-radio-button value="">空</el-radio-button>
              <el-radio-button value="left">左</el-radio-button>
              <el-radio-button value="right">右</el-radio-button>-->
              <el-form-item label="01">
                <el-input/>
              </el-form-item>
              <el-form-item label="02">
                <el-input/>
              </el-form-item>
              <el-form-item label="03">
                <el-input/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>


        <!--版型-->
        <div></div>
        <!--表单-->
        <div></div>
      </div>
    </div>
  </div>

</template>

<script setup>


</script>

<style lang="scss" scoped>
.bgImg {
  //background-image: url("../assets/bg.jpg");
  height: 100%;
  background-size: cover;
  background-position: center;
  //opacity: 0.15;
}
</style>