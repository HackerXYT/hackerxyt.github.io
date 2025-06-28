let aitLines = 'rgba(43, 205, 255, 0.1)'
function attachAIT(bgg) {
    if(bgg) {
        aitLines = bgg
    } else {
        aitLines = 'rgba(43, 205, 255, 0.1)'
    }
    var canvas = document.getElementById('ait');
    var ctx = canvas.getContext('2d');

    var SIZE = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
    canvas.setAttribute("width", SIZE);
    canvas.setAttribute("height", SIZE);

    var WIDTH = SIZE;
    var HEIGHT = SIZE;

    var lines = [];
    var totalTentacles = 200;

    function Line(x, y) {
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;

        this.endAngle = Math.floor(Math.random() * 360);
        this.endSpeed = (Math.floor(Math.random() * 10) + 1) / 50;
        this.endDir = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        this.endChangeFreq = Math.floor(Math.random() * 200) + 1;

        this.c1Angle = Math.floor(Math.random() * 360);
        this.c1Speed = (Math.floor(Math.random() * 10) + 1) / 20;
        this.c1Dir = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        this.c1ChangeFreq = Math.floor(Math.random() * 200) + 1;

        this.c2Angle = Math.floor(Math.random() * 360);
        this.c2Speed = (Math.floor(Math.random() * 10) + 1) / 20;
        this.c2Dir = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        this.c2ChangeFreq = Math.floor(Math.random() * 200) + 1;

        this.c1;
        this.end;
        this.c2;
        //this.color = "rgba(43, 205, 255, 0.1)";
        this.color = aitLines;
        this.width = 10;  // Initial width
        this.targetWidth = this.width;
        this.startWidth = this.width;
        this.widthAnimationStartTime = null;

        this.definePoints();
        this.draw();
    }

    Line.prototype.animateWidthTo = function (targetWidth, duration) {
        console.log("Attaching")
        this.startWidth = this.width;
        this.targetWidth = targetWidth;
        this.widthAnimationDuration = duration;
        this.widthAnimationStartTime = performance.now(); // Start time of animation
    };

    Line.prototype.move = function () {
        const currentTime = performance.now();
        if (this.widthAnimationStartTime !== null) {
            const elapsedTime = currentTime - this.widthAnimationStartTime;
            const progress = Math.min(elapsedTime / this.widthAnimationDuration, 1); // Cap progress at 1

            // Smoothly animate the width (ease-in-out cubic easing function)
            this.width = easeInOutCubic(progress, this.startWidth, this.targetWidth - this.startWidth, 1);

            if (progress >= 1) {
                this.widthAnimationStartTime = null; // Stop animation once done
            }
        }

        this.endChangeFreq--;
        if (this.endChangeFreq == 0) {
            this.endDir *= -1;
            this.endChangeFreq = Math.floor(Math.random() * 200) + 1;
        }

        this.c1ChangeFreq--;
        if (this.c1ChangeFreq == 0) {
            this.c1Dir *= -1;
            this.c1ChangeFreq = Math.floor(Math.random() * 200) + 1;
        }

        this.c2ChangeFreq--;
        if (this.c2ChangeFreq == 0) {
            this.c2Dir *= -1;
            this.c2ChangeFreq = Math.floor(Math.random() * 200) + 1;
        }

        this.c1Angle += this.c1Dir * this.c1Speed;
        this.c2Angle += this.c2Dir * this.c2Speed;
        this.endAngle += this.endDir * this.endSpeed;

        this.definePoints();
        this.draw();
    };

    Line.prototype.definePoints = function () {
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {
            this.c1 = aroundPoint(this.x, this.y, 100, this.c1Angle);  // Increase to 200 (from 100)
            this.end = aroundPoint(this.x, this.y, 150, this.endAngle); // Increase to 300 (from 150)
            this.c2 = aroundPoint(this.end.x, this.end.y, 100, this.c2Angle); // Increase to 200 (from 100)
        } else {
            this.c1 = aroundPoint(this.x, this.y, 200, this.c1Angle);  // Increase to 200 (from 100)
            this.end = aroundPoint(this.x, this.y, 300, this.endAngle); // Increase to 300 (from 150)
            this.c2 = aroundPoint(this.end.x, this.end.y, 200, this.c2Angle); // Increase to 200 (from 100)
        }
    };

    Line.prototype.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.end.x, this.end.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.closePath();
    };

    function aroundPoint(x, y, dist, ang) {
        var point = [];
        var angle = degToRad(ang);
        point.x = x + Math.cos(angle) * dist;
        point.y = y + Math.sin(angle) * dist;
        return point;
    }

    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    function init() {
        for (var i = 0; i < totalTentacles; i++) {
            lines.push(new Line());
        }
        animate();

    }

    function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in lines) {
            lines[i].move();
        }

        requestAnimationFrame(animate);
    }

    init();
}

attachAIT()

// Example: Change the width of a random line after 2 seconds
//setTimeout(function () {
//  lines[0].animateWidthTo(10, 1000);  // Example: Animate width to 10 over 2 seconds
//}, 2000);

var aitSounds = {
    AIT_chat: new Howl({
        src: ['./ait_assets/AIT chat.mp3'],
        loop: false,
        volume: 0.5
    }),
    ait_deactivated: new Howl({
        src: ['./ait_assets/ait deactivated.mp3'],
        loop: false,
        volume: 0.5
    }),
    already_back: new Howl({
        src: ['./ait_assets/already back.mp3'],
        loop: false,
        volume: 0.5
    }),
    good_day_AIT_intro: new Howl({
        src: ['./ait_assets/good day AIT intro.mp3'],
        loop: false,
        volume: 0.5
    }),
    good_evening: new Howl({
        src: ['./ait_assets/good evening.mp3'],
        loop: false,
        volume: 0.5
    }),
    good_morning: new Howl({
        src: ['./ait_assets/good morning.mp3'],
        loop: false,
        volume: 0.5
    }),
    how_to_deactivate_AIT: new Howl({
        src: ['./ait_assets/how to deactivate AIT.mp3'],
        loop: false,
        volume: 0.5
    }),
    its_been_a_while: new Howl({
        src: ['./ait_assets/its been a while.mp3'],
        loop: false,
        volume: 0.5
    }),
    launching_deluxe: new Howl({
        src: ['./ait_assets/launching deluxe.mp3'],
        loop: false,
        volume: 0.5
    }),
    launching_oasa: new Howl({
        src: ['./ait_assets/launching oasa.mp3'],
        loop: false,
        volume: 0.5
    }),
    launching_tasco: new Howl({
        src: ['./ait_assets/launching tasco.mp3'],
        loop: false,
        volume: 0.5
    }),
    lets_add_some_friends: new Howl({
        src: ['./ait_assets/lets add some friends.mp3'],
        loop: false,
        volume: 0.5
    }),
    login_taker_longer: new Howl({
        src: ['./ait_assets/login taker longer.mp3'],
        loop: false,
        volume: 0.5
    }),
    max_tags: new Howl({
        src: ['./ait_assets/max tags.mp3'],
        loop: false,
        volume: 0.5
    }),
    new_canvas: new Howl({
        src: ['./ait_assets/new canvas.mp3'],
        loop: false,
        volume: 0.5
    }),
    new_messages: new Howl({
        src: ['./ait_assets/new messages.mp3'],
        loop: false,
        volume: 0.5
    }),
    nice_exp_yesterday: new Howl({
        src: ['./ait_assets/nice exp yesterday.mp3'],
        loop: false,
        volume: 0.5
    }),
    no_friends: new Howl({
        src: ['./ait_assets/no friends.mp3'],
        loop: false,
        volume: 0.5
    }),
    no_messages_with_user: new Howl({
        src: ['./ait_assets/no messages with user.mp3'],
        loop: false,
        volume: 0.5
    }),
    oh_no_cryptox_disabled: new Howl({
        src: ['./ait_assets/oh no cryptox disabled.mp3'],
        loop: false,
        volume: 0.5
    }),
    params_saved: new Howl({
        src: ['./ait_assets/params saved.mp3'],
        loop: false,
        volume: 0.5
    }),
    personal_info_section_w_desc: new Howl({
        src: ['./ait_assets/personal info section w desc.mp3'],
        loop: false,
        volume: 0.5
    }),
    personal_info_section: new Howl({
        src: ['./ait_assets/personal info section.mp3'],
        loop: false,
        volume: 0.5
    }),
    pfp_updated: new Howl({
        src: ['./ait_assets/pfp updated.mp3'],
        loop: false,
        volume: 0.5
    }),
    profile_section_w_desc: new Howl({
        src: ['./ait_assets/profile section w desc.mp3'],
        loop: false,
        volume: 0.5
    }),
    push_notifications_enabled: new Howl({
        src: ['./ait_assets/push notifications enabled.mp3'],
        loop: false,
        volume: 0.5
    }),
    registered: new Howl({
        src: ['./ait_assets/registered.mp3'],
        loop: false,
        volume: 0.5
    }),
    reloading: new Howl({
        src: ['./ait_assets/reloading.mp3'],
        loop: false,
        volume: 0.5
    }),
    request_sent: new Howl({
        src: ['./ait_assets/request sent.mp3'],
        loop: false,
        volume: 0.5
    }),
    saved: new Howl({
        src: ['./ait_assets/saved.mp3'],
        loop: false,
        volume: 0.5
    }),
    secureline_desc: new Howl({
        src: ['./ait_assets/secureline desc.mp3'],
        loop: false,
        volume: 0.5
    }),
    server_failed_activating_offline: new Howl({
        src: ['./ait_assets/server failed, activating offline.mp3'],
        loop: false,
        volume: 0.5
    }),
    servers_are_now_online: new Howl({
        src: ['./ait_assets/servers are now online.mp3'],
        loop: false,
        volume: 0.5
    }),
    servers_offline_no_login: new Howl({
        src: ['./ait_assets/servers offline no login.mp3'],
        loop: false,
        volume: 0.5
    }),
    settings_section_w_desc: new Howl({
        src: ['./ait_assets/settings section w desc.mp3'],
        loop: false,
        volume: 0.5
    }),
    signing_out: new Howl({
        src: ['./ait_assets/signing out.mp3'],
        loop: false,
        volume: 0.5
    }),
    something_wen_wrong_w_program: new Howl({
        src: ['./ait_assets/something wen wrong w program.mp3'],
        loop: false,
        volume: 0.5
    }),
    something_went_wrong_w_program_reload: new Howl({
        src: ['./ait_assets/something went wrong w program, reload.mp3'],
        loop: false,
        volume: 0.5
    }),
    something_went_wrong_reload: new Howl({
        src: ['./ait_assets/something went wrong, reload.mp3'],
        loop: false,
        volume: 0.5
    }),
    switch_to_offline: new Howl({
        src: ['./ait_assets/switch to offline.mp3'],
        loop: false,
        volume: 0.5
    }),
    tag_removed: new Howl({
        src: ['./ait_assets/tag removed.mp3'],
        loop: false,
        volume: 0.5
    }),
    update_available: new Howl({
        src: ['./ait_assets/update available.mp3'],
        loop: false,
        volume: 0.5
    }),
    updating_evox: new Howl({
        src: ['./ait_assets/updating evox.mp3'],
        loop: false,
        volume: 0.5
    }),
    user_has_canvas_uploaded_client_doesnt: new Howl({
        src: ['./ait_assets/user has canvas uploaded, client doenst.mp3'],
        loop: false,
        volume: 0.5
    }),
    user_has_cryptox_disabled: new Howl({
        src: ['./ait_assets/user has cryptox disabled.mp3'],
        loop: false,
        volume: 0.5
    }),
    welcome_back_loginByIp: new Howl({
        src: ['./ait_assets/welcome back, loginByIp.mp3'],
        loop: false,
        volume: 0.5
    }),
    welcome_back_to_do_today: new Howl({
        src: ['./ait_assets/welcome back, to do today.mp3'],
        loop: false,
        volume: 0.5
    }),
    you_have_new_friend_requests: new Howl({
        src: ['./ait_assets/you have new friend requests.mp3'],
        loop: false,
        volume: 0.5
    }),
    unexpected: new Howl({
        src: ['./ait_assets/unexpected.mp3'],
        loop: false,
        volume: 0.5
    }),
    mind_changed: new Howl({
        src: ['./ait_assets/mind_changed.mp3'],
        loop: false,
        volume: 0.5
    }),
    uh: new Howl({
        src: ['./ait_assets/uh.mp3'],
        loop: false,
        volume: 0.5
    }),
    beta_intro: new Howl({
        src: ['./ait_assets/beta_intro.mp3'],
        loop: false,
        volume: 0.5
    }),
    okay_sorry: new Howl({
        src: ['./ait_assets/okay_sorry.mp3'],
        loop: false,
        volume: 0.5
    }),
    got_it: new Howl({
        src: ['./ait_assets/got_it.mp3'],
        loop: false,
        volume: 0.5
    }),
    performance: new Howl({
        src: ['./ait_assets/performance.mp3'],
        loop: false,
        volume: 0.5
    }),
    performance_off: new Howl({
        src: ['./ait_assets/performance_off.mp3'],
        loop: false,
        volume: 0.5
    }),
    register_off: new Howl({
        src: ['./ait_assets/account_reg_off.mp3'],
        loop: false,
        volume: 0.5
    })
};

const aitReplay = {
    AIT_chat: 2, //times that can be replayed
    ait_deactivated: true, //can be replayed infinitely
    already_back: 5,
    good_day_AIT_intro: false, // can be played once
    good_evening: 2,
    good_morning: 2,
    how_to_deactivate_AIT: false,
    its_been_a_while: true,
    launching_deluxe: true,
    launching_oasa: true,
    launching_tasco: true,
    lets_add_some_friends: 2,
    login_taker_longer: true,
    max_tags: true,
    new_canvas: true,
    new_messages: true,
    nice_exp_yesterday: true,
    no_friends: true,
    no_messages_with_user: 3,
    oh_no_cryptox_disabled: true,
    params_saved: true,
    personal_info_section_w_desc: 3,
    personal_info_section: 3,
    pfp_updated: true,
    profile_section_w_desc: 2,
    push_notifications_enabled: true,
    registered: true,
    reloading: true,
    request_sent: true,
    saved: true,
    secureline_desc: false,
    server_failed_activating_offline: true,
    servers_are_now_online: true,
    servers_offline_no_login: true,
    settings_section_w_desc: 3,
    signing_out: true,
    something_wen_wrong_w_program: true,
    something_went_wrong_w_program_reload: true,
    something_went_wrong_reload: true,
    switch_to_offline: true,
    tag_removed: true,
    update_available: true,
    updating_evox: true,
    user_has_canvas_uploaded_client_doesnt: true,
    user_has_cryptox_disabled: true,
    welcome_back_loginByIp: true,
    welcome_back_to_do_today: 4,
    you_have_new_friend_requests: true,
    unexpected: true,
    mind_changed: true,
    uh: true,
    beta_intro: true,
    okay_sorry: true,
    got_it: true,
    performance: true,
    performance_off: true,
    register_off: true
};


let aitAnalytics = localStorage.getItem("aitAnalytics")
if (!aitAnalytics) {
    const startJson = {
        username: localStorage.getItem("t50-username"),
        countPlayed: 0,
        created: new Date(),

    }
    aitAnalytics = startJson
    //intro: {
    //    played: true,
    //    canReplay: true,
    //    count: 0
    //}
} else {
    aitAnalytics = JSON.parse(aitAnalytics)
}

function pickRandFromDict(sound) {
    const soundsDict = {
        'saved': ['params_saved', 'saved', 'registered'],
        'personal_info': ['personal_info_section_w_desc', 'personal_info_section'],
        'profile': ['profile_section_w_desc'],
        'settings': ['settings_section_w_desc'],
        'error': ['something_wen_wrong_w_program', 'something_went_wrong_w_program_reload', 'something_went_wrong_reload'],
        'offline': ['server_failed_activating_offline', 'switch_to_offline'],
        'welcomeBack': ['welcome_back_to_do_today']
    };

    const sounds = soundsDict[sound] || [];
    const picked = sounds[Math.floor(Math.random() * sounds.length)];
    aitPlay(picked)
}

function is200(sound) {
    if (aitAnalytics[sound]) {
        if (aitAnalytics[sound].canReplay === true) {
            console.warn("Sound can be replayed infinitely")
            aitAnalytics[sound].count = aitAnalytics[sound].count++
            return true;
        } else if (aitAnalytics[sound].canReplay === false) {
            console.warn("Sound cannot be replayed")
            return false;
        } else if (aitAnalytics[sound].canReplay > aitAnalytics[sound].count) {
            aitAnalytics[sound].count = aitAnalytics[sound].count + 1
            console.warn(`Sound can be replayed for ${aitAnalytics[sound].canReplay - aitAnalytics[sound].count} more times`)
            return true;
        } else {
            console.warn("Sound has reached maximum replay times")
            return false;
        }
    } else {
        aitAnalytics[sound] = {
            played: true,
            canReplay: aitReplay[sound],
            count: 1
        };
        return true;
    }
}

let aitAttached = false;
function loadAit() {
    if (localStorage.getItem("aitDev") === 'accepted') {
        console.warn("Attaching AIT Beta")
        aitAttached = true
    }
    const username = localStorage.getItem("t50-username")
    fetch('https://data.evoxs.xyz/ait')
        .then(response => response.json())
        .then(accepted => {
            if (accepted.evox_users.includes(username) || accepted.evox_users.includes("EVERYONE")) {
                localStorage.setItem("aitDev", "accepted")
                if (aitAttached !== true) {
                    console.warn("Attaching AIT Beta")
                    aitAttached = true
                }

            } else {
                aitAttached = false
            }
        })
        .catch(error => {
            console.warn("Ignoring ait fetch error")
        });

}
loadAit()



let pendingSound = null;
let cancelOutshow = false;
let soundPlaying = false;
const globalSounds = ['welcome_back_loginByIp', 'unexpected', 'mind_changed', 'uh', 'beta_intro', 'performance', 'performance_off']
function aitPlay(soundName) {
    console.log("aitPlay")
    if (aitSounds[soundName] && aitAttached || aitSounds[soundName] && globalSounds.includes(soundName)) {  // Check if the sound exists in the map
        try {
            if (is200(soundName) === true) {
                if (soundPlaying === true) {
                    cancelOutshow = true;
                    currentSoundPlaying.stop()
                    pendingSound = soundName
                    aitSounds['uh'].play();
                    animateAIT('uh');
                    return;
                }
                console.log(`Sound ${soundName} can be played`)
                soundPlaying = true;
                animateAIT(soundName);
                if (soundName.includes('profile')) {
                    document.getElementById("aitContainer").classList.add("right")
                } else {
                    document.getElementById("aitContainer").classList.add("active")
                }
                aitSounds[soundName].play();  // Play the sound
                aitAnalytics.countPlayed++
                localStorage.setItem("aitAnalytics", JSON.stringify(aitAnalytics))

                return true;
            } else {
                console.log(`Sound ${soundName} cannot be played`)
                return false;
            }

        } catch (error) {
            console.warn("Error playing sound.", error);
            return false;
        }
    } else {
        if (aitAttached !== false) {
            console.warn("Sound not found:", soundName);
            return false;
        } else {
            console.warn("AIT Developer Beta Is Disabled. File Requested:", soundName)
            return false;
        }

    }
}



let currentSoundPlaying = null;
function animateAIT(soundName) {
    var div = document.getElementById('ait');

    // Get the Howler sound object
    var sound = aitSounds[soundName];
    currentSoundPlaying = sound

    // Create an audio context and analyser
    var audioContext = Howler.ctx;
    var analyser = audioContext.createAnalyser();

    // Connect Howler's sound source to the analyser
    sound._sounds[0]._node.connect(analyser);

    analyser.fftSize = 256;  // Set FFT size for frequency analysis
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function step() {
        // Get frequency data from the analyser
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume from frequency data
        var sum = dataArray.reduce((a, b) => a + b, 0);
        var average = sum / bufferLength;

        // Scale the div based on the average volume (example: scaling between 1 and 1.5)
        var scale = 1 + (average / 255) * 0.5;
        div.style.transform = 'scale(' + scale + ')';

        // Continuously update the animation using requestAnimationFrame
        requestAnimationFrame(step);
    }

    // Start the animation loop
    step();

    // Attach an onend callback to know when the sound finishes
    sound.once('end', function () {
        soundPlaying = false;
        currentSoundPlaying = null;
        if (!cancelOutshow) {
            document.getElementById("aitContainer").classList.remove("active")
            document.getElementById("aitContainer").classList.remove("right")
            console.log("Sound has finished playing");
            // You can stop or reset the animation here if needed
            div.style.transform = 'scale(1)';
        } else {
            cancelOutshow = false
        }

        if (soundName === 'uh') {
            setTimeout(function () {
                aitPlay(pendingSound)
                pendingSound = null;
            }, 500)
        }

    });
}

function stopAit() {
    cancelOutshow = false;
    currentSoundPlaying.stop()
    //aitSounds['okay_sorry'].play();
    //animateAIT('okay_sorry');
    aitSounds['got_it'].play();
    animateAIT('got_it');
}