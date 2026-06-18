let postContainer = document.querySelector(".postContainer");

let description = document.getElementById("description");
let postImage = document.getElementById("file");
// console.log(postImage);

// localStorage se purani posts nikalo
let allPosts = JSON.parse(localStorage.getItem("posts")) || [];


let chatsObj = [
  {
    title: "Mubashir Khan",
    img: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t39.30808-1/616152640_122118181173060005_5976952451968252195_n.jpg?stp=c331.39.682.682a_cp0_dst-jpg_s40x40_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=5eyOYAoTiNoQ7kNvwHW3-OM&_nc_oc=Adp2_iMqx5f2OEUWlQdbSBEz3WY79WniA_k7cpdlqXstYpjCUv3cWiSyH5fSiaAxJXM&_nc_zt=24&_nc_ht=scontent.fkhi2-2.fna&_nc_gid=lXTSmG6Cj_f6wqZX6cf9hA&_nc_ss=7b2a8&oh=00_Af6y0aVE4mbTAAUCpH57rY0GeUfdC0QilIxZ4AkFcECaeQ&oe=6A20F41C",
  },
  {
    title: "Meta AI",
    img: "https://downloadr2.apkmirror.com/wp-content/uploads/2026/03/29/69d65519bc338_com.facebook.stella.png",
  },
  {
    title: "Friends",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91zLrxeVetcQjZJnCgJc3VeUOyvUGNOJYxA&s",
  },
  {
    title: "Saved",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo4APa7AR_Kp66o03ANueqh9fl8JlhxX_b3w&s",
  },
  {
    title: "Events",
    img: "https://images.freeimages.com/image/thumbs/eca/flat-star-icon-png-style-5707936.png",
  },
  {
    title: "Ads Manager",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZdO935i7RKu-e-BQQDKzauNLz28emm4eaHw&s",
  },
  {
    title: "Games",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavS21MpD3qj3IIDijdmN1MeWgOGrYOOsMvg&s",
  },
  {
    title: "Messenger",
    img: "https://cdn.iconscout.com/icon/free/png-256/free-facebook-messenger-icon-svg-download-png-3357700.png",
  },
  {
    title: "Feed",
    img: "https://khankhaznavik-spec.github.io/Face-Book-Authentucate-Project/dashboard/images/feed.png",
  },
];

let groupChatsSec = [
  {
    title: "Adnan Khan",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIEPAnn2ZgyEbnturIYDy5ga7_PI0HabV6Q&s",
    ononline: true,
  },

  {
    title: "Affan Khan",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
    ononline: false,
  },
];

// let zindaUser = {
//   zindaUserName: "Mubashir",
//   zindaUserEmail: "mubashirkhan@gmail.com",
//   zindaUserPass: "12345678",
// };

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

            // post ka data object banao
let postObj = {
  description: description.value,
  image: imageUrl,
};

// array mein add karo
allPosts.push(postObj);

// localStorage mein save karo
localStorage.setItem("posts", JSON.stringify(allPosts));

  // delete post
  let postCrossBtn = document.getElementsByClassName("fa-x");

  for (let i = 0; i < postCrossBtn.length; i++) {
    postCrossBtn[i].onclick = function () {
      postCrossBtn[i].parentNode.parentNode.parentNode.remove();
      // =====>
      allPosts.splice(i, 1);
// console.log(allPosts);

  localStorage.setItem("posts", JSON.stringify(allPosts));
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
    likeBtns[i].onclick = function () {
      let count = parseInt(likeCounts[i].innerText);
      count++;
      likeCounts[i].innerText = count;
    };
  }

  //  heart
  for (let i = 0; i < heartBtns.length; i++) {
    heartBtns[i].onclick = function () {
      let count = parseInt(likeCounts[i].innerText);
      count++;
      likeCounts[i].innerText = count;
    };
  }
}

function goToProfile() {
  setTimeout(() => {
    window.location.href = "../porfilepage/index.html";
  }, 1200);
}

function logoutHandler() {
  console.log("logout chlaa");

  zindaUser = null;
  console.log("mera current user hai zinda ===>", zindaUser);
  if (!zindaUser) {
    Swal.fire({
      icon: "success",
      title: "Logout Successfully",
    });
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1200);
  }
}

let leftsidebar = document.querySelector(".content");
let groupChatsSection = document.querySelector(".Groupchats");
function groupChats() {
  for (let i = 0; i < chatsObj.length; i++) {
    // console.log(chatsObj[i]);/
    leftsidebar.innerHTML += `
            <div class="iner-content">
              <img src=${chatsObj[i].img} alt="">
              <p>${chatsObj[i].title}</p>

            </div>`;
  }

  for (let i = 0; i < groupChatsSec.length; i++) {
    if (i === 0) {
      groupChatsSection.innerHTML += `<span>Group Chat</span> `;
      console.log(i);
    }

    groupChatsSection.innerHTML += `<div class="plusbtn">
 <div class="Chatimg">
      <img src="${groupChatsSec[i].img}" alt="">

      <span class="${
        groupChatsSec[i].ononline ? "online-dot" : "offline-dot"
      }"></span>

    </div>

    <p>${groupChatsSec[i].title}</p>
  </div>
`;
  }
  groupChatsSection.innerHTML += `<hr>`;
}
groupChats();



function getPosts() {

  let allPosts = JSON.parse(localStorage.getItem("posts")) || [];

  for (let i = 0; i < allPosts.length; i++) {

    postContainer.innerHTML += `
      <div class="post mb-4">

        <div class="postHeader d-flex justify-content-between align-items-center px-4">
          <div class="d-flex align-items-center gap-3 margin">
            <img src="/HML classes/MUBASHIR KHAN PORTFOLIO/my image.png"
            width="50" height="50">

            <div class="d-flex flex-column align-items-center">
              <h5>Mubashir</h5>
              <span>14 May 2026</span>
            </div>
          </div>

          <div>
            <i class="fa-solid fa-x"></i>
          </div>
        </div>

        <div class="postDescription text-start px-4">
          <p class="mb-2 mt-4">${allPosts[i].description}</p>
        </div>

        <div class="postImage">
          <img src="${allPosts[i].image}" alt="">
        </div>

      </div>
    `;
  }
}
getPosts()