(function ($) {
    'use strict';

    /*[ File Input Config ]
        ===========================================================*/
    
    try {
    
        var file_input_container = $('.js-input-file');
    
        if (file_input_container[0]) {
    
            file_input_container.each(function () {
    
                var that = $(this);
    
                var fileInput = that.find(".input-file");
                var info = that.find(".input-file__info");
    
                fileInput.on("change", function () {
    
                    var fileName;
                    fileName = $(this).val();
    
                    if (fileName.substring(3,11) == 'fakepath') {
                        fileName = fileName.substring(12);
                        // fileInput.reset()
                    }
    
                    if(fileName == "") {
                        info.text("No file chosen");
                    } else {
                        info.text(fileName);
                    }
    
                })
    
            });
    
        }
    
    
    
    }
    catch (e) {
        console.log(e);
    }

})(jQuery);


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
  let db = firebase.firestore();
  var storage = firebase.storage();

  // Create a storage reference from our storage service
  var storageRef = storage.ref();

  let author = document.getElementById("full_name");
  let title = document.getElementById("title");
  let content = document.getElementById("content")
  
  let btn = document.getElementById("btn")
  // Saving data
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;



let specific_id = Date.now()


btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let file_input = document.querySelector(".input-file")
    const file = document.querySelector('input[type=file]').files[0];
    const metadata = { contentType: 'image/jpeg' }; // or whatever you want
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`images/${file.name}`).put(file, metadata);
    
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      // If you want to show upload progress, do whatever you want with progress...
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, error => {
      console.log(error);
    }, () => {
      // upload finished with success, you can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(downloadURL);
        db.collection('images').add({
            img:downloadURL,
            id:specific_id
          });
    
      });
    });
    
    if(author.value == '' && title.value =='' && content.value == '') {
      alert("You must insert data in our field")
    }else{
      db.collection('blogs').add({
        author: author.value,
        title: title.value,
        content : content.value,
        Date : today,
        id:specific_id
      });
      alert('Posted!')
    }
    
    
    author.value ='';
    title.value ='';
    content.value ='';
    // file_input.reset();
    
    // window.location.href('index.html')
  })

// Không thể chạy window.location.href('index.html') ở trong hàm click vì nó sẽ chạy trc khi dữ liệu được up lên firebase