const firebaseConfig = {
    apiKey: "AIzaSyDbZgUvCugFolhfw6ny77kQoL_D0_rJoQA",
    authDomain: "blog-post-5bc4e.firebaseapp.com",
    databaseURL: "https://blog-post-5bc4e-default-rtdb.firebaseio.com",
    projectId: "blog-post-5bc4e",
    storageBucket: "blog-post-5bc4e.appspot.com",
    messagingSenderId: "404222064466",
    appId: "1:404222064466:web:48a88b3b54fc2a2d88ac8b"
  };

  firebase.initializeApp(firebaseConfig);

//postBtn.addEventListener('click', (e) =>{
    function postBtn(){

   //function upload(){
    var image = document.getElementById('image').files[0];
    var title = document.getElementById('title').value;
    var page = document.getElementById('page').value;
    var date = document.getElementById('date').value;

    var imageName = image.name;

    var storageRef = firebase.storage().ref('images/' +imageName);
    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress+" done");
    }, function(error){
        console.log(error.message);
        
    }, function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){

            firebase.database().ref('BlogPost/' +date).set({
                ImgURL:downloadURL,
                Title:title,
                Page:page
                    
            });
                alert('Blog Successfully Posted')
                document.getElementById('postform').reset();
                getdata();
          });
       }); 
    }  
//});

    window.onload = function(){
        this.getdata();
    }
    
    function getdata(){
    firebase.database().ref('BlogPost/').once('value').then(function(snapshot){
        var post_div = document.getElementById('post');
        post_div.innerHTML = "";
        
        var data = snapshot.val();
        console.log(data);

        for(let[key,value] of Object.entries(data)){
            post_div.innerHTML ="<div>"+         
            "<img src="+value.ImgURL+">"+
            "<div><h3>"+value.Title+"</h3>"+
            "<div><p>"+value.Page+"</p>"+
            //"<button id='"+key+"' onclick='delete_post(this.id)'>Delete</button>"+
            "</div></div> <hr>"+post_div.innerHTML;
        }
    });
}  

removeBtn.addEventListener('click', () =>{

    var date = document.getElementById('date').value;
    firebase.database().ref('BlogPost/' + date).remove();

    alert('Blog Successfully Deleted')

});

 



     





















//postBtn.addEventListener('click', (e) =>{
    //e.preventDefault();

    //const image = document.getElementById('image').files[0];

    //const title =  document.getElementById('title').value;
    //const page = document.getElementById('page').value;
    
                                    
    //firebase.database().ref('BlogPost/').push().set({
    //Title: title,
    //Page: page

    //});

    //alert('Blog Posted Successfully!')                 
//});


    //removeBtn.addEventListener('click', (e) =>{

    //var id = document.getElementById('title').value;
    //firebase.database().ref('BlogPost/').remove()( { 

    //});

    //alert('Post Remove Successfully!')                 
    //});
