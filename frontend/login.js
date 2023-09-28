const loginsinho = document.querySelector("#loginform");
const jasik = document.createElement("div");
const jasikTwo = document.createElement("h1");
const idjonje = document.querySelector("#idjonje");
const sucess = document.querySelector("#sucess");

// const loginSucess = () => {
//   const btn = document.createElement("button");
//   btn.innerText = "상품가져오기";
//   loginsinho.appendChild(btn);
//   btn.addEventListener("click", async () => {
//     const ress = await fetch("/items");
//     const datas = ress.json();
//     console.log("성공", datas);
//   });
// };

const sinho = async (sinhobaddm) => {
  sinhobaddm.preventDefault();
  //   data라는 변수에 폼데이터를 가져온다
  const data = new FormData(loginsinho);
  console.log(data, "데이터");
  // 변수지정후 폼데이터안에 password값을 꺼내와 암호화한다
  const amho = sha256(data.get("password"));
  console.log("암호화 전", data.get("password"));
  //   꺼내온 패스워드 암호화 한것 amho라는 변수를 다시 data폼 안에 set명령어로 넣는다
  data.set("password", amho);
  console.log("암호화후", data.get("password"));
  //   console.log(sha256("뭐")); sh256으로 감싸서 암호화
  const res = await fetch("/login", {
    method: "POST",
    body: data,
  });
  // console.log(res.status, "res");
  const sucs = await res.json();
  console.log(sucs);
  const accessToken = sucs.엑세스성공;
  console.log(accessToken);

  if (res.status === 200) {
    // 로컬스토리지에 토큰저장하기 토큰이름 나는 tokenn이라고 정함
    window.localStorage.setItem("tokenn", accessToken);
    sucess.appendChild(jasikTwo);
    jasikTwo.innerText = "로그인성공했음";
    alert("로그인성공했음");
    window.location.pathname = "/";
    return;
  } else if (res.status === 401) {
    sucess.appendChild(jasikTwo);
    jasikTwo.innerText = "로그인실패했음";
    jasikTwo.style.color = "red";
    alert("없는 아이디거나 비밀번호가 잘못됐음");
    return;
  } else return;

  //

  // const btn = document.createElement("button");
  // btn.innerText = "상품가져오기";
  // btn.addEventListener("click", async () => {
  //   const res = await fetch("/items", {
  //     // 헤더에 넣어서  엑세스토큰을 보내는
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`, // 띄어쓰기 추가
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // });
  // sucess.appendChild(btn);

  //

  // console.log(res);
  // if (res.status === 200) {
  //   alert("로그인 성공");
  //   // console.log("유저", sucs);
  //   // 서버에 엑세스성공이라는거에 엑세스토큰이 담겨서 오도록 해놨다
  //   accessToken = sucs.엑세스성공;
  //   console.log(accessToken, res);
  //   console.log(sucs);
  //   const sunggong = sucess.appendChild(jasikTwo);
  //   sunggong.innerText = "로그인에 성공했습니다";
  //   loginSucess();
  //   // window.location.pathname = "/";
  // } else if (res.status === 401) {
  //   alert("비밀번호가 틀렸거나 존재하지 않는 사용자 입니다.");
  // }
};
loginsinho.addEventListener("submit", sinho);
