// console.log("It's working");
document.addEventListener("DOMContentLoaded", function() {
  $('.sidebar-nav').on("click", (e) => {
      let loc = e.target.innerText.toLowerCase();
      window.location.hash = loc;
    });
});