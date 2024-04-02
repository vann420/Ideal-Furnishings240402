  // 按鈕顯示/隱藏的門檻值
  var scrollThreshold = 300;

  // 當頁面滾動時檢查是否顯示回到上方按鈕
  window.onscroll = function () {
      scrollFunction();
  };

  function scrollFunction() {
      var scrollToTopBtn = document.getElementById("scrollToTopBtn");
      var scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

      if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
          scrollToTopBtn.style.display = "block";
      } else {
          scrollToTopBtn.style.display = "none";
      }

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        scrollToBottomBtn.style.display = "none";
    } else {
        scrollToBottomBtn.style.display = "block";
    }
  }

  // 按下按鈕時滾動回頁面頂部
  function scrollToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}