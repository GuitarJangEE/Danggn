const signSinho = document.querySelector("#signupform");
const boomo = document.querySelector("#flases");
const jasik = document.createElement("div");
const idjonje = document.querySelector("#idjonje");
const emailjonje = document.querySelector("#emailjonje");
// 암호확인함수 나는 안에다썼음
// const passwordCheck = () => {
//   const data = new FormData(signSinho);
//   const amho = sha256(data.get("password"));
//   const amhoHagin = sha256(data.get("password-hagin"));
//   if (amho === amhoHagin) {
//     return true;
//   } else {
//     return false;
//   }
// };

const sinho = async (sinhobaddm) => {
  sinhobaddm.preventDefault();
  //   data라는 변수에 폼데이터를 가져온다
  const data = new FormData(signSinho);
  console.log(data, "데이터");
  // 변수지정후 폼데이터안에 password값을 꺼내와 암호화한다
  const amho = sha256(data.get("password"));
  const amhoHagin = sha256(data.get("password_hagin"));
  console.log("암호화 전", data.get("password"));
  //   꺼내온 패스워드 암호화 한것 amho라는 변수를 다시 data폼 안에 set명령어로 넣는다
  data.set("password", amho);
  data.set("password_hagin", amhoHagin);
  console.log("암호화후", data.get("password_hagin"));
  //   console.log(sha256("뭐")); sh256으로 감싸서 암호화
  //   암호와 암호 학인이 같다면
  if (amho === amhoHagin) {
    const res = await fetch("/signup", {
      method: "POST",
      body: data,
    });
    const sucs = await res.json();
    console.log(res);
    if (sucs === "싸인업") {
      // 회원가입성공메세지출력
      signSinho.appendChild(jasik);
      jasik.style.color = "Black";
      jasik.innerText = "회원가입에 성공했습니다.";
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    } else if (sucs === "아이디") {
      idjonje.appendChild(jasik);
      jasik.style.color = "red";
      jasik.innerText = "이미 존재하는 아이디 입니다.";
      return;
    } else if (sucs === "이메일") {
      emailjonje.appendChild(jasik);
      jasik.style.color = "red";
      jasik.innerText = "이미 존재하는 이메일 입니다.";
      return;
    }

    // 만약 자식의 부모요소가 부모일때는 생성된 자식을 없애고 새로운 자식을 폼태그에 넣고 만든다
    //   if (jasik.parentNode === boomo) {
    //     //   boomo.removeChild(jasik); 리무브안해도 새로만들어지넹
    //     signSinho.appendChild(jasik);
    //     jasik.style.color = "Black";
    //     jasik.innerText = "회원가입에 성공했습니다.";
    //   }
    // }
    // 그렇지않다면 비밀번호가 다르다는 메세지출력
  } else {
    jasik.innerText = "비밀번호가 다릅니다.";
    jasik.style.color = "red";
    boomo.appendChild(jasik);
    return;
  }
  console.log("아싸");
};
// const sinho2 = () => {
//   if (action === signup) {
//     window.location.pathname = "/signup.html";
//   } else if (action === login) return;
// };

signSinho.addEventListener("submit", sinho);
