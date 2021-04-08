let i = 0;
async function validateFile(e) {
  return new Promise((res) => {
    setTimeout(() => {
      res(++i % 2);
    }, 1000);
  });
}

function newFileList(data) {
  var dt = new DataTransfer();
  for (let v of data) {
    dt.items.add(v);
  }
  return dt.files;
}
function toggleLoading() {
  document.documentElement.classList.toggle("validating");
}

console.log("init");
function toggleBlocked() {
  document.documentElement.classList.toggle("blocked");
}

function onChange(e) {
  console.log("enter", e.bypass);
  if (e.bypass || !e.target.files) {
    return;
  }

  const f = newFileList(e.target.files);
  e.target.value = null;
  console.log(e.target.files, f);
  toggleLoading();
  validateFile(e).then((el) => {
    if (!el) {
      toggleBlocked();
      return;
    } else {
      toggleLoading();
    }
    e.target.files = f;
    const event = new Event("change", {
      bubbles: true,
    });
    event.bypass = true;
    e.target.dispatchEvent(event);
  });
  e.stopPropagation();
  e.preventDefault();
}
document.addEventListener("change", onChange, { capture: true });