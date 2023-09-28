const getWriteForm = document.getElementById("write-form");
const eng = document.getElementById("eng");

const handleSubmit = async (submitStop) => {
  submitStop.preventDefault();
  const bodyAddTime = new FormData(getWriteForm);
  bodyAddTime.append("insertAT", new Date().getTime());
  const accessToken = window.localStorage.getItem("tokenn");
  bonem = await fetch("/items", {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
    method: "POST",
    body: bodyAddTime,
  });
  console.log(bonem);
  const ch = await bonem.json();
  if (bonem.status === 200) {
    alert("작성성공입니다");
    window.location.pathname = "/";
    return;
  } else if (bonem.status === 401) {
    alert("로그인이 필요합니당");
    window.location.pathname = "/login.html";
    return;
    //   console.log("뿌앵");
  } else {
    alert = "알수없는오류";
    return;
  }
};
const engd = async (submitStop) => {
  submitStop.preventDefault();
  const bodyAddTime = new FormData(eng);
  bodyAddTime.append("insertAT", new Date().getTime());
  try {
    serverro = await fetch("/itemss", {
      method: "POST",
      body: bodyAddTime,
    });
    const info = await serverro.json();
    if (info === "시후") {
      window.location.pathname = "/";
    }
  } catch (e) {
    console.error(e);
  }
  //   console.log("앵");
};
// 들어가자마자 로그인이 필요할경우
const tokkenhakin = async () => {
  const accessToken = window.localStorage.getItem("tokenn");
  const gajyeowa = await fetch("/items", {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
  if (gajyeowa.status === 200) return;
  else if (gajyeowa.status === 401) {
    alert("로그인이 필요한가니다");
    window.location.pathname = "/login.html";
    return;
  }
};
getWriteForm.addEventListener("submit", handleSubmit);
eng.addEventListener("submit", engd);
tokkenhakin();
