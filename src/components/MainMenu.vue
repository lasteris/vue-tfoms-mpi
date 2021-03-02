<template>
    <el-menu mode="horizontal" default-active="2">
          <el-menu-item index="1">
              <span>MedSoft Software Solutions</span>
            </el-menu-item>
            <el-menu-item index="2">
              <font-awesome-icon :icon="['fal', 'file-upload']" style="color:#e95537;"/> 
              <span> Загрузка файлов ТФОМС</span>
            </el-menu-item>
            <el-menu-item index="3">
              <font-awesome-icon :icon="['fal', 'search']" style="color:#e95537;"/> 
              <span> Поиск в ЦРП</span>
            </el-menu-item>
          </el-menu>
</template>