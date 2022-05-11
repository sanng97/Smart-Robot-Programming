<template>
  <div class="root">
    <table>
      <thead>
        <tr>
          <th width="80px">글번호</th>
          <th>제목</th>
          <th></th>
          <th width="100px">작성자</th>
          <th width="80px">조회수</th>
          <th width="120px">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in boardlist" :key="board.id">
          <td class="text-center">{{ board.id }}</td>
          <td>{{ board.title }}</td>
          <td class="text=center">{{ board.writer }}</td>
          <td class="text=center">{{ board.viewCount }}</td>
          <td class="text=center">{{ board.writeTime | dateFormat }}</td>
        </tr>
      </tbody>

      <tbody></tbody>
    </table>
    <v-pagination
      v-model="page"
      @input="changePage"
      :length="pageCount"
    ></v-pagination>

    <div class="text-right mt-2">
      <v-btn color="primary" @click="movewrite">글쓰기</v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      boardlist: [],
    };
  },
  filters: {
    dateFormat(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm");
    },
  },
  mounted() {
    //todo : 서버에서 게시물 목록 가져와서 넣기
    //for (var i = 0; i < 10; i++) {
    //this.boardlist.push({
    // id: i,
    //title: "제목" + i,
    //writer: "작성자" + i,
    //viewCount: i,
    //writeDate: "2020-01-01",
    // });
    // }

    this.axios.post("/api/board/list").then((result) => {
      console.log(result);
      this.boardlist = result.data.boardList;
      this.pageCount = result.data.pageCount;
    });
  },
  methods: {
    changePage(page) {
      console.log(page);
      this.axios.post("/api/board/list", { page: page }).then((result) => {
        this.boardlist = result.data.boardList;
        this.pageCount = result.data.pageCount;
      });
    },
    movewrite() {
      this.$router.push("/board/write");
    },
    dateFormat(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<style scoped>
.root {
  width: 700px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}
table th,
td {
  border-bottom: 1px solid #ccc;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>