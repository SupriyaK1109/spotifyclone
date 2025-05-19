console.log("welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { songName: "Shiddat", filePath: "./songs/1.mp3", coverPath: "./cover/1.jpg" },
    { songName: "Dimple", filePath: "./songs/2.mp3", coverPath: "./cover/2.jpg" },
    { songName: "Tu jo Hain", filePath: "./songs/3.mp3", coverPath: "./cover/3.jpg" },
    { songName: "Tu hi haqeeqat", filePath: "./songs/4.mp3", coverPath: "./cover/4.jpg" },
    { songName: "Tum Ho Mera Pyar", filePath: "./songs/5.mp3", coverPath: "./cover/5.jpg" },
    { songName: "Tum Mile", filePath: "./songs/6.mp3", coverPath: "./cover/6.jpg" },
];

songItem.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});



masterPlay.addEventListener("click", () => {
    let currentSongButton = document.getElementById(songIndex); // Get current song's button

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

        // Sync with song item play button
        makeAllPlay();
        currentSongButton.classList.remove("fa-circle-play");
        currentSongButton.classList.add("fa-circle-pause");
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;

        // Sync with song item play button
        currentSongButton.classList.remove("fa-circle-pause");
        currentSongButton.classList.add("fa-circle-play");
    }
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})



const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        const clickedId = parseInt(e.target.id);

        // If clicking the same song again and it's playing → pause it
        if (songIndex === clickedId && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        } else {
            // Play new song or resume previously paused
            makeAllPlay();
            songIndex = clickedId;
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            audioElement.currentTime = 0;
            myProgressBar.value = 0;
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    });
});



document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    // Update audio
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    myProgressBar.value = 0;
    audioElement.play();

    // Sync buttons
    makeAllPlay();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    // Update audio
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    myProgressBar.value = 0;
    audioElement.play();

    // Sync buttons
    makeAllPlay();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});
