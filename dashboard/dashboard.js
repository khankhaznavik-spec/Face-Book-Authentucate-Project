let postContainer = document.querySelector(".postContainer");

let description = document.getElementById("description");
let postImage = document.getElementById("file");
console.log(postImage);
function postHandler() {
  let file = postImage.files[0];
  let imageUrl = URL.createObjectURL(file);

  postContainer.innerHTML += `<div class="post mb-4">

              <!-- post header -->
              <div class="postHeader  d-flex justify-content-between align-items-center px-4">
                <div class="d-flex align-items-center gap-3 margin">
                  <img src="/HML classes/MUBASHIR KHAN PORTFOLIO/my image.png" alt=""
                    width="50" height="50" id="postLogo">
                  <div class="d-flex flex-column align-items-center">
                    <h5>Mubashir</h5>
                    <span>14 May 2026</span>
                  </div>
                </div>

                <div>
                  <i class="fa-solid fa-x"></i>
                </div>
              </div>

              <!-- post Description -->
              <div class="postDescription text-start  px-4">
                <p class="mb-2 mt-4">${description.value}</p>

              </div>

              <!-- postImage -->
              <div class="postImage bg-warning">
                <img src="${imageUrl}" alt="">
              </div>


              <!-- post like area -->
              <div class="postLike d-flex  justify-content-between px-4 mt-3">
                <div>
                  <i class="fa-solid fa-thumbs-up text-primary"></i>
                  <i class="fa-solid fa-heart text-danger"></i>
                  <span class="likeCount">1</span>
                </div>
                <div>
                  <span>25 comments</span> · <span>563 shares</span>
                </div>
              </div>


              <hr>

              <div class="postBtnLikeShareComment d-flex justify-content-around">
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
              </div>

            </div>`;

  // delete post
  let postCrossBtn = document.getElementsByClassName("fa-x");

  for (let i = 0; i < postCrossBtn.length; i++) {
    postCrossBtn[i].onclick = function () {
      postCrossBtn[i].parentNode.parentNode.parentNode.remove();
    };
  }

  /// close modal
  let modal = document.getElementById("staticBackdrop");
  let modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();

  // clear Input
  description.value = "";
  postImage.value = "";


  let likeBtns = document.getElementsByClassName("fa-thumbs-up");
let heartBtns = document.getElementsByClassName("fa-heart");
let likeCounts = document.getElementsByClassName("likeCount");

//  thumbs up
for (let i = 0; i < likeBtns.length; i++) {
  likeBtns[i].onclick = function() {
    let count = parseInt(likeCounts[i].innerText);
    count++;
    likeCounts[i].innerText = count;
  };
}

//  heart
for (let i = 0; i < heartBtns.length; i++) {
  heartBtns[i].onclick = function() {
    let count = parseInt(likeCounts[i].innerText);
    count++;
    likeCounts[i].innerText = count;
  };
}
}


