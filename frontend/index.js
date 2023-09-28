// {
//   /* <div class="item-list">
//         <div class="item-list__img">
//           <img src="당근assets/image.svg" alt="" />
//         </div>
//         <div class="item-list__info">
//           <div class="item-list__info-title">게이밍 PC 팝니다</div>
//           <div class="item-list__info-meta">역삼동 10초 전</div>
//           <div class="item-list__info-price">100만원</div>
//         </div>
//       </div> --> */
// }
const timeset = (gettime) => {
  const nowtime = new Date().getTime();
  const calc = new Date(nowtime - gettime - 9 * 60 * 60 * 1000);
  const hour = calc.getHours();
  const minute = calc.getMinutes();
  const seconds = calc.getSeconds();
  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else return `${seconds}초 전`;
};

const renderData = (databaddm) => {
  //   databaddm.forEach((sh) => console.log(sh.title));
  databaddm.reverse().forEach(async (sh) => {
    const main = document.querySelector("main");

    const Div = document.createElement("div");
    Div.className = "item-list";

    const ImgDiv = document.createElement("div");
    const ImgDivImg = document.createElement("img");
    // 이미지 16진법을 2진법으로바꿔주는 단락
    const chan = await fetch(`/image/${sh.id}`);
    const ge = await chan.blob();
    const url = URL.createObjectURL(ge);
    ImgDiv.className = "item-list__img";
    ImgDivImg.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "item-list__info-title";
    InfoTitleDiv.innerText = sh.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "item-list__info-meta";
    InfoMetaDiv.innerText = `${sh.place}    ${timeset(sh.insertAT)}`;

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "item-list__info-price";
    InfoPriceDiv.innerText = `${sh.price}원`;

    main.appendChild(Div);
    Div.appendChild(ImgDiv);
    ImgDiv.appendChild(ImgDivImg);
    Div.appendChild(InfoDiv);
    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);

    const div = document.createElement("div");
  });
};

const fetchData = async () => {
  // 로컬스토리지에서 토큰을  가져온다 토큰명은 내가 setItem에서 지정한 tokenn
  const accessToken = window.localStorage.getItem("tokenn");
  const gajyeowa = await fetch("/items", {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
  if (gajyeowa.status === 401) {
    alert("로그인이 필요합니다");
    window.location.pathname = "/login.html";
    return;
  }
  const gajyeoOm = await gajyeowa.json();

  //   console.log(data);
  renderData(gajyeoOm);
};

// const fetchData2 = async () => {
//   const gajyeowa = await fetch("/itemss");
//   const gajyeoOm = await gajyeowa.json();
//   //   console.log(data);
//   renderData(gajyeoOm);
// };

fetchData();
