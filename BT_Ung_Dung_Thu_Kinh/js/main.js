import Glasses from "../model/Glasses.js";
import { getGlasses } from "../service/Service.js";

// Hàm mặc định
init();
function init() {
  // Call data from API
  getGlasses()
    .then((result) => {
      //   console.log(result.data);
      // Hiển thị danh sách các kính ra giao diện
      renderGlassesList(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderGlassesList(arr) {
  const html = arr.reduce((result, glass) => {
    return (
      result +
      `
        <div class="col-4" id="${glass.id}" onclick="wearGlasses('${glass.virtualImg}','${glass.name}','${glass.brand}','${glass.color}','${glass.price}','${glass.status}','${glass.description}','true')">
          <img src="${glass.src}" class="img-fluid"/>
          
        </div>
      `
    );
  }, "");
  document.getElementById("vglassesList").innerHTML = html;
}

// ES5: có cơ chế hoisting nên kg cần window
// ES6: chạy file html trước mà weareGlasses nằm ở html nên khi load sẽ bị dính undefined => lỗi. Vì vậy cần sử dụng window để file js chạy trc
window.wearGlasses = (vsrc, name, brand, color, price, status, description) => {
  const html = `<img src='${vsrc}'/>`;
  showInfor(name, brand, color, price, status, description);
  document.getElementById("glasses_avatar").innerHTML = html;
  document.getElementById("glasses_avatar").style.display = "block";
};

function showInfor(name, brand, color, price, status, description) {
  const glass_info = `
                <div class="name">
                <h1>${name} - ${brand} (${color}) </h1>
              </div>
              <div class="price_status">
                <div class="price">
                  <p>$${price}</p>
                </div>
                <div class="status">
                  <p>${status}</p>
                </div>
              </div>
              <div class="description">
                <p>
                  ${description}
                </p>
              </div>`;
  document.getElementById("glassesInfo").innerHTML = glass_info;

  document.getElementById("glassesInfo").style.display = "block";
}

window.removeGlasses = (status) => {
  if (status == true) {
    document.getElementById("glasses_avatar").style.display = "none";
    document.getElementById("glassesInfo").style.display = "none";
  } else {
    document.getElementById("glasses_avatar").style.display = "block";
    document.getElementById("glassesInfo").style.display = "block";
  }
};
