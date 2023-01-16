import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

    const firebaseConfig = {
        apiKey: "AIzaSyD1_SK6Cp6ol0mlr0MPQrj5Lg6cy-cQVxg",
        authDomain: "productmanagementsystem-19f2c.firebaseapp.com",
        projectId: "productmanagementsystem-19f2c",
        storageBucket: "productmanagementsystem-19f2c.appspot.com",
        messagingSenderId: "998194633878",
        appId: "1:998194633878:web:d08816ec68321ab9edf6b7",
        measurementId: "G-P5D52T6H9E"
    };    

    const app = initializeApp(firebaseConfig);

    import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

    let FILE;
    let filename;

    const product_img = document.getElementById("product-img");

    product_img.onchange = e => {
        FILE = e.target.files[0];
        let image = URL.createObjectURL(FILE);
        let img_tag = document.getElementById('product-image-preview');
        img_tag.src = image;
        filename = FILE.name;
        alert(filename);
    }

    function uploadImage() {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${FILE.name}`);
        const uploadTask = uploadBytesResumable(storageRef, FILE);

        uploadTask.on('state_changed', (snapshot) => {}, (error) => alert("error: Image not uploaded"), () => {
            getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
                alert("download URL: " + downloadURL);
                let img_input = document.getElementById('img-url');
                img_input.setAttribute('value', downloadURL);
            })
        });

        addProductForm.submit();
    }

    const addBtn = document.getElementById("addBtn");
    addBtn.onclick = uploadImage;