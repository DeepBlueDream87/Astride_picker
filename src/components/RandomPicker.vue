<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">랜덤 뽑기</h2>

    <div class="mb-4">
      <input
        type="file"
        @change="handleFileUpload"
        accept=".xlsx, .xls"
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- 여기에 랜덤 뽑기 관련 컴포넌트들 추가 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const data = ref([])

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    data.value = jsonData
  }

  reader.readAsBinaryString(file)
}
</script>
