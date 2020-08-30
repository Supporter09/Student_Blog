var app_firebase = {};


  var firebaseConfig = {
    apiKey: "AIzaSyBjLGDmmbj2OkAPia04qBoD0TYgO1a4lLg",
    authDomain: "studenblog-85411.firebaseapp.com",
    databaseURL: "https://studenblog-85411.firebaseio.com",
    projectId: "studenblog-85411",
    storageBucket: "studenblog-85411.appspot.com",
    messagingSenderId: "680972776038",
    appId: "1:680972776038:web:ff4e98f7da2f46993673a7",
    measurementId: "G-Y38DG1N8MX",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true});
  var storageRef = firebase.storage().ref();

  
  app_firebase = firebase;

  function writeUserData(userId, name, email, imageUrl) {
    firebase.firestore().ref("users/" + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
      });
  }

  
//check login 
var user = firebase.auth().currentUser;
console.log(user)
  

  var blog_post_list = document.querySelector('#blog-posts')
  // create element & render cafe
  function renderBlog(doc) {
    
    let single_post_class = document.createElement("div");
    single_post_class.setAttribute("data-id", doc.id)

    let specific_id = doc.data().id
    console.log(typeof(specific_id))
    db.collection("images").where("id","==",specific_id).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              let image_src = doc.data().img;
              image_tag.setAttribute("src",image_src)
              
            });
        })
        .catch(function (error) {
          console.log(error)
        })


    

    //Create Element
    let image_div = document.createElement("div")
    let image_tag = document.createElement("img")

    let icons_div = document.createElement("div");
    let left_area_div = document.createElement("div");
    let left_area_btn = document.createElement("a");
    let social_icon_list = document.createElement("ul");
    let share_icon_li = document.createElement("li");
    let love_icon_li = document.createElement("li");
    let comment_icon_li = document.createElement("li");

    let share_icon_li_a = document.createElement("a");
    let love_icon_li_a = document.createElement("a");
    let comment_icon_li_a = document.createElement("a");

    let share_icon_li_a_i = document.createElement("i")
    let love_icon_li_a_i = document.createElement("i")
    let comment_icon_li_a_i = document.createElement("i")

    let blog_content = document.createElement("p")

    let btn_content = document.createElement("b");
    let single_blog_date = document.createElement("p");
    let single_blog_author = document.createElement("p");
    let single_blog_title = document.createElement("h3");
    let single_blog_title_a = document.createElement("a");
    let single_blog_title_b = document.createElement("b");
    let read_more_btn = document.createElement("a");
    let read_more_btn_b = document.createElement("b");
    //Set Attribute
    image_div.setAttribute("class","image-wrapper")
    image_tag.setAttribute("alt","Blog Image")
    


    single_post_class.setAttribute("class","single-post");
    icons_div.setAttribute("class","icons");

    left_area_div.setAttribute("class","left-area");
    left_area_btn.setAttribute("class","btn caegory-btn");
    social_icon_list.setAttribute("class","right-area social-icons");
    share_icon_li_a_i.setAttribute("class","ion-android-share-alt");
    love_icon_li_a_i.setAttribute("class","ion-android-favorite-outline");
    comment_icon_li_a_i.setAttribute("class","ion-android-textsms");

    single_blog_date.setAttribute("class","date");
    single_blog_author.setAttribute("class",'author');
    single_blog_title.setAttribute("class","title");
    single_blog_title_b.setAttribute("class","light-color");
    read_more_btn.setAttribute("class","btn read-more-btn");
    read_more_btn.setAttribute("href","blog_post.html");
    //Text Content
    btn_content.textContent = "TRAVEL";
    single_blog_date.textContent = doc.data().Date;
    single_blog_author.textContent = doc.data().author;
    single_blog_title_b.textContent = doc.data().title;
    blog_content.textContent = doc.data().content;
    read_more_btn_b.textContent = "READ MORE";
    share_icon_li_a.textContent = "Share";
    love_icon_li_a.textContent = "08";
    comment_icon_li_a.textContent = "10";

    //appendChild
    image_div.appendChild(image_tag)

    left_area_btn.appendChild(btn_content)
    left_area_div.appendChild(left_area_btn)
    icons_div.appendChild(left_area_div)
    icons_div.appendChild(social_icon_list)
    single_blog_title_a.appendChild(single_blog_title_b)
    single_blog_title.appendChild(single_blog_title_a)
    read_more_btn.appendChild(read_more_btn_b)

    share_icon_li_a.appendChild(share_icon_li_a_i)
    love_icon_li_a.appendChild(love_icon_li_a_i)
    comment_icon_li_a.appendChild(comment_icon_li_a_i)
    share_icon_li.appendChild(share_icon_li_a)
    love_icon_li.appendChild(love_icon_li_a)
    comment_icon_li.appendChild(comment_icon_li_a)
    social_icon_list.appendChild(share_icon_li)
    social_icon_list.appendChild(love_icon_li)
    social_icon_list.appendChild(comment_icon_li)

    single_post_class.appendChild(image_div)
    single_post_class.appendChild(icons_div)
    single_post_class.appendChild(single_blog_date)
    single_post_class.appendChild(single_blog_author)
    single_post_class.appendChild(single_blog_title)
    single_post_class.appendChild(blog_content)
    single_post_class.appendChild(read_more_btn)

    blog_post_list.appendChild(single_post_class)


    


    

    // deleting data
    // cross.addEventListener("click", (e) => {e.stopPropagation();
    //   let id = e.target.parentElement.getAttribute("data-id");
    //   db.collection("cafes").doc(id).delete();
    // });
  }

  //   db.collection("blogs").get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // });
  // real-time listener
  db.collection("blogs").orderBy('Date').onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          renderBlog(change.doc);
        } else if (change.type == "removed") {
          let li = blog_post_list.querySelector("[data-id=" + change.doc.id + "]");
          blog_post_list.removeChild(li);
        }
      });
    });


