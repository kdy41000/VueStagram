import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state() {  // 데이터 저장
        return {
            name: 'kim',
            age : 20,
            data : [
                {
                  no: 2,
                  name: "Kim Hyun",
                  userImage: "https://placeimg.com/100/100/arch",
                  postImage: "https://placeimg.com/640/480/arch",
                  likes: 36,
                  date: "May 15",
                  liked: false,
                  content: "오늘 무엇을 했냐면요 아무것도 안했어요 ?",
                  filter: "perpetua"
                },
                {
                  no: 1,
                  name: "John Doe",
                  userImage: "https://placeimg.com/200/200/people",
                  postImage: "https://placeimg.com/640/480/people",
                  likes: 20,
                  date: "Apr 20",
                  liked: false,
                  content: "흔한 자랑스타그램",
                  filter: "clarendon"
                },
                {
                  no: 0,
                  name: "Minny",
                  userImage: "https://placeimg.com/100/100/animals",
                  postImage: "https://placeimg.com/640/480/animals",
                  likes: 49,
                  date: "Apr 4",
                  liked: false,
                  content: "우리집 개는 화장실 물도 내림",
                  filter: "lofi"
                }
              ]
        }
    },
    mutations : {  // 데이터 수정
        reviseName(state) {
            state.name = 'park';
        },
        ascAge(state, data) {
            state.age += data;
        },
        likeHandler(state, param) {
            const idx = state.data.findIndex((e) => e.no === param);
            const status = state.data[idx].liked;
            if(!status) {
                state.data[idx].likes++;
                state.data[idx].liked = true;
            } else {
                state.data[idx].likes--;
                state.data[idx].liked = false;
            }
        },
        setMore(state, data) {
            data.no = state.data[state.data.length - 1].no - 1;
            state.data.push(data);
        }
    },
    actions : {  // ajax요청 부분
        async getData(context, payload) {
            await axios.get(`https://codingapple1.github.io/vue/more${payload}.json`)
            .then(res => {
              if(res.data != null && res.data != undefined) {
                  this.commit('setMore',res.data);
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
    }
})

export default store;