<template>
        <div class="upper-panel">
          <div class="upload">
            <el-upload class="center-uploader"
            action="/mpi/api/v1.0/persons/file"
            :on-success='handleSuccess'
            :before-upload='enableLoading'
            :headers=headers
            drag
            :show-file-list=false 
            accept="application/octet-stream">
        <i class='el-icon-upload' style="color:#e95537;"></i> 
        <div class="el-upload__text">Перетащите сюда или <em>нажмите</em></div>
        <template #tip>
        </template>
        </el-upload>
          </div>
          <div class="history-container">
          <el-table class="history" empty-text="Сессия пуста" :data="history" stripe height="100%">
              <el-table-column 
              label="История загрузок">
                <template #default="scope">
                  <span style="margin-right: 5px">{{scope.row.name}} </span>
                  <el-tag :type="scope.row.status">{{chooseStatusColor(scope.row.status)}}</el-tag>
                </template>
                </el-table-column>
          </el-table>
          </div>
        </div>
        <div class="ground-panel">
          <el-table
          empty-text="Нет данных"
          v-loading="loading"
          stripe
          :default-sort = "{prop: 'lastName', order: 'ascending'}"
          :data="results"
          height="100%"
          style="width: 100%">
          <el-table-column
          label="Ф.И.О.">
          <template #default="scope">
              <span>{{composeFIO(scope.row.origin.person)}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="ЕНП">
          <template #default="scope">
              <span>{{scope.row.origin.person.enp?.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="СНИЛС">
          <template #default="scope">
             <span>{{scope.row.origin.person.snils?.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="Статус"
            :filters="stateFilters"
            :filter-method="filterState">
            <template #default="scope">
              <el-tag
                :type="chooseStateColor(scope.row.state)"
                disable-transitions>
                {{chooseStateMask(scope.row.state)}}
                </el-tag>
            </template>
            </el-table-column>
          <el-table-column
          sortable
          label='Подробнее'>
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="200">
                  <template #default>
                    <p>{{ showPatientId(scope.row.patientId) }}</p>
                    <div v-if="scope.row.origin && scope.row.origin.attachment">
                      <h3>Прикрепление</h3>
                      <p>
                        <span>С: {{scope.row.origin.attachment.moDateIn.slice(0, 10)}}</span>
                        <span>  По: </span>
                        <span v-if="scope.row.origin.attachment.moDateOut">{{scope.row.origin.attachment.moDateOut.slice(0, 10)}}</span>
                        <span v-else>...</span>
                        </p>
                      <p v-if="scope.row.origin.attachment.moCodeFoms">Код МО:  {{scope.row.origin.attachment.moCodeFoms}}</p>
                      <p v-if="scope.row.origin.attachment.moSection">Код участка:  {{scope.row.origin.attachment.moSection}}</p>
                    </div>
                    <div v-if="scope.row.origin && scope.row.origin.insurance">
                      <h3>Страхование</h3>
                      <p>
                        <span>С: {{scope.row.origin.insurance.begin.slice(0, 10)}}</span>
                        <span>  По: </span>
                        <span v-if="scope.row.origin.insurance.literalEnd">{{scope.row.origin.insurance.literalEnd.slice(0, 10)}}</span>
                        <span v-else>...</span>
                        </p>
                      <p v-if="scope.row.origin.insurance.smoCode">Код СМО:  {{scope.row.origin.insurance.smoCode}}</p>
                      <p v-if="scope.row.origin.insurance.smoOgrn">ОГРН СМО:  {{scope.row.origin.insurance.smoOgrn}}</p>
                      <p v-if="scope.row.origin.insurance.seria">Серия:  {{scope.row.origin.insurance.seria}}</p>
                      <p v-if="scope.row.origin.insurance.number">Номер:  {{scope.row.origin.insurance.number}}</p>
                      <el-tag v-if="scope.row.origin.insurance.type"
                      :type="chooseInsuranceTypeColor(scope.row.origin.insurance.type)">
                      {{chooseInsuranceTypeMask(scope.row.origin.insurance.type)}}
                      </el-tag>
                    </div>
                  </template>
                  <template #reference>
                    <font-awesome-icon :icon="['fal', 'id-card']" style="color:#e95537;" size="2x"/> 
                  </template>
                </el-popover>
            </template>
          </el-table-column>
            </el-table>    
        </div>
</template>

<script>
import '../../scripts/stringExt'
export default {
    name: 'TFOMSContent',
    props: {
    },
    components: {
    },
    methods: {
      filterState(value, row) {
        return row.state === value;
      },
      enableLoading() {
        this.loading = true
      },
      handleSuccess(response, file) {
        this.history.push(file)
        this.results = response
        this.loading = false
        this.showMessage("Файл " + file.name + " загружен")
       
      },
      composeFIO(person) {
        return person.lastName.initCap() + ' ' + person.firstName.initCap() + ' ' + person.middleName?.initCap()
      },
      chooseStateColor(state) {
        return state === 'CREATED' ? 'success' : state === 'UPDATED' ? 'info' : 'warning'
      },
      chooseInsuranceTypeColor(type) {
         return type === 'OLD' ? 'warning' : type === 'TEMPORAL' ? 'info' : 'success'
      },
      chooseStateMask(state) {
        return state === 'CREATED' ? 'Добавлен' : state === 'UPDATED' ? 'Обновлен' : 'Не идентифицирован'
      },
      showPatientId(pid) {
        return pid == -1 ? 'Не идентифицирован в ЦРП' : 'ID ЦРП: ' + pid
      },
      chooseInsuranceTypeMask(type) {
        return type === 'OLD' ? 'Устаревший' : type === 'TEMPORAL' ? 'Временный' : 'Новый'
      },
      chooseStatusColor(status) {
        return status === 'success'? 'Успех' : 'Ошибка'
      },

      handleErrors(err) {
        this.loading = false
        this.$message(err);
      },
      showMessage(content) {
        this.$message({
          message: content,
          type: 'success',
          showClose: true,
          center: true
        });
      }
    },
    data() {
        return {
            results: [],
            history: [],
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjYxM2ZiNmM3LThjNjAtNGQ1ZS1iNzJjLTlhZWQ2NmNjZTExOCIsIm5hbWUiOiLQpNC70Y7RgNC-0LzQvtC90LjRgtC-0YDQuNC90LMiLCJpYXQiOjE1Mjk4NzQwMDB9.kL_sLY7HzMXtTvZroc9dZ7H1kwXSZ80ET5NbXKwWTd_LLG8xnIo6YSA7AiuVz0cVJM__-ViiyatD-HTvwjoLVA",
              'Content-Type': 'application/octet-stream',
              'Referrer-Policy': 'origin-when-cross-origin'
              },
            loading: false,
            stateFilters: [{ text: 'Создан', value: 'CREATED' }, { text: 'Обновлен', value: 'UPDATED' }, {text: 'Не идентифицирован', value: 'UNCERTAIN'}]
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
  .upper-panel {
    max-height: 40%;
    height: 40%;
    width: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    margin-bottom: 2px;
  }
  .upload {
    height: 100%;
    width: 80%;
    position: relative;
    display: flex;
  }
  .history-container {
    width: 20%;
    overflow: inherit;
    display: flex;
  }
  .history {
    width: 100%;
    height: 100%;
    overflow: inherit;
  }
  .el-table .cell {
    text-align: center;
    word-wrap:break-word;
  }
   .ground-panel {
    max-height: 60%;
    height: 60%;
    width: 100%;
    position: relative;
    background-color: white;
    display: flex;
    overflow: auto;
  }
  .center-uploader {
  margin: auto;
  position: relative;
  width: 360px;
} 
</style>
