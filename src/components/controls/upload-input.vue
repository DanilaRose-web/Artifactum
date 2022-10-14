<template>    
    <div id="file-upload-form" class="uploader">
        <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

        <label for="file-upload" id="file-drag">
            <div class="img">
                <img id="file-image" src="#" alt="Preview" class="hidden">
            </div>
            <div id="start">
                <!-- <div id="notimage" class="hidden">Please select an image</div> -->
                <span class="icon"></span>
                <span class="upload-btn">Добавить фото</span>
            </div>
            <div id="response" class="hidden">
            <div id="messages"></div>
            </div>
        </label>
        <div class="delete-img hidden" id="delete-img"><img src="assets/img/del-img.svg" alt=""></div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class UploadInputComponent extends Vue {
        mounted() {
            function ekUpload(){

            var fileSelect    = document.getElementById('file-upload'),
                fileDrag      = document.getElementById('file-drag'),
                submitButton  = document.getElementById('submit-button'),
                deleteImg     = document.getElementById('delete-img'),
                start         = document.getElementById('start'),
                response      = document.getElementById('response'),
                fileImage     = document.getElementById('file-image')

            function Init() {

                console.log("Upload Initialised");

                fileSelect.addEventListener('change', fileSelectHandler, false);

                // Is XHR2 available?
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {
                // File Drop
                fileDrag.addEventListener('dragover', fileDragHover, false);
                fileDrag.addEventListener('dragleave', fileDragHover, false);
                fileDrag.addEventListener('drop', fileSelectHandler, false);
                }
            }

            function fileDragHover(e) {
                var fileDrag = document.getElementById('file-drag');

                e.stopPropagation();
                e.preventDefault();

                fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
            }

            function fileSelectHandler(e) {
                // Fetch FileList object
                var files = e.target.files || e.dataTransfer.files;

                // Cancel event and hover styling
                fileDragHover(e);

                // Process all File objects
                for (var i = 0, f; f = files[i]; i++) {
                parseFile(f);
                uploadFile(f);
                }
            }

            // Output
            function output(msg) {
                // Response
                var m = document.getElementById('messages');
                m.innerHTML = msg;
            }

            function parseFile(file) {

                console.log(file.name);
                
                // var fileType = file.type;
                // console.log(fileType);
                var imageName = file.name;

                var isGood = (/\.(?=gif|jpg|png|jpeg|svg|webp)/gi).test(imageName);
                if (isGood) {
                    start.classList.add("hidden");
                    response.classList.remove("hidden");
                    deleteImg.classList.remove('hidden')
                    fileDrag.classList.add('active')
                    // document.getElementById('notimage').classList.add("hidden");
                    // Thumbnail Preview
                    fileImage.classList.remove("hidden");
                    fileImage.src = URL.createObjectURL(file);
                }
                else {
                    fileImage.classList.add("hidden");
                    document.getElementById('start').classList.remove("hidden");
                    fileImage.src = '#';
                    fileDrag.classList.remove('active')
                    response.classList.add("hidden");
                    document.getElementById("file-upload-form").reset();
                }
            }

            function setProgressMaxValue(e) {
                var pBar = document.getElementById('file-progress');

                if (e.lengthComputable) {
                // pBar.max = e.total;
                }
            }

            deleteImg.addEventListener('click', function() {
                start.classList.remove('hidden')
                document.getElementById('start').classList.remove("hidden");
                fileDrag.classList.remove('active')
                response.classList.add("hidden");
                deleteImg.classList.add('hidden')
                document.getElementById('file-image').classList.add("hidden");
                fileImage.src = '#';
            })

            function uploadFile(file: any) {

                var xhr = new XMLHttpRequest(),
                fileInput = document.getElementById('class-roster-file'),
                fileSizeLimit = 1024; // In MB
                if (xhr.upload) {
                // Check if file is less than x MB
                if (file.size <= fileSizeLimit * 1024 * 1024) {
                    // Progress bar
                    xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);

                    // File received / failed
                    xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4) {
                        // Everything is good!

                        // progress.className = (xhr.status == 200 ? "success" : "failure");
                        // document.location.reload(true);
                    }
                    };

                    // Start upload
                    xhr.open('POST', document.getElementById('file-upload-form').action, true);
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.setRequestHeader('X-File-Size', file.size);
                    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                    xhr.send(file);
                } else {
                    output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
                }
                }
            }

            // Check for the various File API support.
            if (window.File && window.FileList && window.FileReader) {
                Init();
            } else {
                document.getElementById('file-drag').style.display = 'none';
            }
            }
            ekUpload();
        }
    }
    
</script>

<style lang="css" scoped>

.uploader {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    position: relative;
}

label {
    display: flex;
    align-items: center;
    max-width: 120px;
    width: 100%;
    /* padding: 2rem 1.5rem; */
    text-align: center;
    background: #fff;
    transition: all .2s ease;
    user-select: none;
}

label.active {
    border: none;
}

#start {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border: 2px dashed #CED4DE;
    cursor: pointer;
}

#start.hidden {
    display: none;
}

#response {
    float: left;
    clear: both;
    width: 100%;
}

#response.hidden {
    display: none;
}

#file-image {
    /* margin: 0 auto .5rem auto; */
    width: auto;
    height: auto;
    max-width: 120px;
}

#file-image img {
    max-width: 100%;
    height: auto;
}

#file-image.hidden {
    display: none;
}

#notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;
}

#notimage.hidden {
    display: none;
}

progress, .progress {
    appearance: none;
    display: inline;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    height: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
}

.progress[value]::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #eee;
}

input[type="file"] {
    display: none;
  }

progress  div {
    margin: 0 0 .5rem 0;
    color: black;
}

.upload-btn {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #5D58B7;
    text-transform: uppercase;
    text-align: center;
    max-width: 80px;
}

.icon {
    margin-top: 20px;
    margin-bottom: 15px;
    position: relative;
    width: 20px;
    height: 20px;
}

.icon::after, .icon::before {
    content: '';
    position: absolute;
    background: #5D58B7;
}

.icon::after {
    height: 100%;
    width: 4px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.icon::before {
    height: 4px;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.delete-img {
    background: white;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 5px;
    left: 95px;
    z-index: 5;
    cursor: pointer;
}

.delete-img.hidden {
    display: none;
}

.img {
    margin-bottom: 25px;
    max-width: 120px;
}

</style>