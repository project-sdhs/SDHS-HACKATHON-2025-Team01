function collapse(element) {
  var content = element.nextElementSibling;
  if (content.style.maxHeight != "0px") {
    content.style.maxHeight = "0px"; // 접기
    console.log("yaho");
  } else {
    content.style.maxHeight = content.scrollHeight + "px"; // 접혀있는 경우 펼치기
  }
  console.log(content.style.maxHeight);
}